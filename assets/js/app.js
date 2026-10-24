(() => {
  "use strict";

  const form = document.querySelector("#scan-form");
  const input = document.querySelector("#url-input");
  const clearButton = document.querySelector("#clear-input");
  const error = document.querySelector("#input-error");
  const results = document.querySelector("#results");
  const summary = document.querySelector("#result-summary");
  const resultUrl = document.querySelector("#result-url");
  const findingList = document.querySelector("#finding-list");
  const findingCount = document.querySelector("#finding-count");
  const scanAnother = document.querySelector("#scan-another");

  const SHORTENERS = new Set(["bit.ly", "t.co", "tinyurl.com", "is.gd", "cutt.ly", "rb.gy", "shorturl.at", "rebrand.ly", "ow.ly"]);
  const RISKY_TLDS = new Set(["zip", "mov", "country", "click", "work", "support", "top", "gq", "tk", "rest", "fit"]);
  const BRAND_WORDS = ["paypal", "google", "microsoft", "apple", "facebook", "instagram", "whatsapp", "bank", "bri", "bca", "mandiri", "tokopedia", "shopee", "dana"];

  function addFinding(list, level, title, description) {
    list.push({level, title, description});
  }

  function normalizeInput(raw) {
    const value = raw.trim();
    if (!value) throw new Error("Masukkan URL yang ingin diperiksa.");
    if (/^(javascript|data|vbscript|file):/i.test(value)) {
      throw new Error("Skema URL ini tidak didukung. Masukkan alamat web HTTP atau HTTPS.");
    }
    const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : "https://" + value;
    let parsed;
    try { parsed = new URL(candidate); } catch (_) {
      throw new Error("Format URL tidak valid. Periksa kembali alamat yang dimasukkan.");
    }
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Hanya alamat HTTP dan HTTPS yang dapat diperiksa.");
    }
    if (!parsed.hostname || !parsed.hostname.includes(".")) {
      throw new Error("Masukkan nama domain lengkap, misalnya contoh.com.");
    }
    if (parsed.username || parsed.password) {
      throw new Error("URL ini memuat informasi login di dalam alamat. Hapus bagian tersebut sebelum memeriksa.");
    }
    return {value: parsed.href, url: parsed};
  }

  function inspectUrl(url) {
    const findings = [];
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    const labels = host.split(".");
    const tld = labels[labels.length - 1] || "";
    const isIp = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(host) || /^\[[0-9a-f:]+\]$/i.test(host);
    const full = url.href;
    const decoded = (() => { try { return decodeURIComponent(full); } catch (_) { return full; } })();

    if (url.protocol === "https:") addFinding(findings, "pass", "Menggunakan HTTPS", "Koneksi HTTPS mengenkripsi lalu lintas, tetapi tidak menjamin situs tersebut tepercaya.");
    else addFinding(findings, "warn", "Tidak menggunakan HTTPS", "Alamat menggunakan HTTP biasa. Hindari mengirimkan informasi sensitif melalui koneksi ini.");

    if (isIp) addFinding(findings, "warn", "Domain berupa alamat IP", "Alamat IP langsung dapat digunakan secara sah, tetapi juga sering dipakai untuk menyamarkan tujuan situs.");
    else addFinding(findings, "pass", "Menggunakan nama host", "Alamat menggunakan nama host, bukan alamat IP langsung.");

    if (host.startsWith("xn--") || labels.some(part => part.startsWith("xn--"))) addFinding(findings, "warn", "Ada label domain Punycode", "Nama domain internasional dapat memakai karakter yang mirip dengan huruf lain. Periksa ejaan domain dengan teliti.");
    else addFinding(findings, "pass", "Tidak ada label Punycode yang terlihat", "Tidak ditemukan label host berawalan xn-- pada pemeriksaan sederhana ini.");

    if (url.username || url.password || /https?:\/\/[^/\s]+@/i.test(full)) addFinding(findings, "fail", "Ada pola informasi sebelum tanda @", "Format ini dapat membuat bagian domain terlihat menyesatkan. Jangan buka sebelum memastikan host sebenarnya.");
    else addFinding(findings, "pass", "Tidak ada pola user-info di URL", "Tidak ditemukan kredensial atau user-info sebelum tanda @.");

    if (labels.length >= 5) addFinding(findings, "warn", "Subdomain cukup panjang", "Banyak subdomain dapat membuat nama host sulit dibaca. Fokus pada domain terdaftar yang sebenarnya.");
    else addFinding(findings, "pass", "Struktur subdomain tidak berlebihan", "Jumlah label host tidak melewati ambang sederhana yang digunakan prototipe.");

    if (SHORTENERS.has(host)) addFinding(findings, "warn", "Layanan pemendek tautan", "Tujuan akhir disembunyikan oleh URL pendek. Periksa tujuan akhirnya melalui layanan ekspansi tepercaya sebelum membuka.");
    else addFinding(findings, "pass", "Bukan layanan pemendek yang dikenal", "Host tidak cocok dengan daftar kecil pemendek tautan yang ada di prototipe.");

    if (RISKY_TLDS.has(tld)) addFinding(findings, "warn", "Akhiran domain perlu diperiksa", "Akhiran ini ada dalam daftar pemeriksaan sederhana, tetapi akhiran domain saja tidak membuktikan situs berbahaya.");
    else addFinding(findings, "pass", "Akhiran domain tidak ada di daftar peringatan", "Akhiran domain tidak cocok dengan daftar kecil prototipe; hal ini bukan bukti bahwa situs aman.");

    if (full.length > 180) addFinding(findings, "warn", "URL sangat panjang", "URL panjang dengan banyak parameter dapat menyamarkan tujuan atau alur pengalihan.");
    else addFinding(findings, "pass", "Panjang URL masih wajar", "Panjang alamat berada di bawah ambang sederhana 180 karakter.");

    if (/(login|signin|verify|verification|secure|account|password|wallet|claim|gift|free|bonus|update|suspended|urgent)/i.test(url.pathname + url.search)) addFinding(findings, "warn", "Kata sensitif di jalur atau parameter", "Kata seperti login, verifikasi, bonus, atau urgent sering muncul pada situs sah maupun penipuan. Cocokkan dengan konteks dan pemilik domain.");
    else addFinding(findings, "pass", "Tidak ada kata pemancing umum", "Tidak ditemukan kata pemancing yang dipantau pada jalur atau parameter URL.");

    if (/%[0-9a-f]{2}/i.test(full) || /%25/i.test(full) || /\\u[0-9a-f]{4}/i.test(decoded)) addFinding(findings, "warn", "Ada karakter yang di-encode", "Encoding adalah hal normal pada URL, tetapi encoding berlapis atau sulit dibaca layak diperiksa lebih lanjut.");
    else addFinding(findings, "pass", "Tidak ada pola encoding mencolok", "Pemeriksaan sederhana tidak menemukan pola encoding yang ditandai.");

    const brandMatches = BRAND_WORDS.filter(word => host.includes(word) && !host.split(".").some(label => label === word));
    if (brandMatches.length) addFinding(findings, "warn", "Nama merek muncul di subdomain atau label gabungan", "Ditemukan kata yang menyerupai merek populer (" + brandMatches.slice(0, 3).join(", ") + "). Pastikan domain benar-benar milik organisasi tersebut.");
    else addFinding(findings, "pass", "Tidak ada pola penyamaran merek yang terdeteksi", "Daftar kecil merek dalam prototipe tidak menemukan pola yang ditandai. Daftar ini tidak lengkap.");

    return findings;
  }

  function riskFor(findings) {
    const weight = {pass: 0, warn: 1, fail: 3};
    const score = findings.reduce((total, item) => total + weight[item.level], 0);
    const warnings = findings.filter(item => item.level !== "pass").length;
    if (score >= 6 || findings.some(item => item.level === "fail")) {
      return {level: "high", title: "Ada beberapa sinyal risiko", description: "Tinjau temuan di bawah dan jangan membuka tautan jika sumbernya tidak jelas.", symbol: "!"};
    }
    if (score >= 2 || warnings > 0) {
      return {level: "medium", title: "Perlu diperiksa lebih lanjut", description: "Ada pola yang layak ditinjau. Ini bukan kepastian bahwa URL tersebut berbahaya.", symbol: "!"};
    }
    return {level: "low", title: "Sedikit sinyal risiko terdeteksi", description: "Pemeriksaan pola dasar tidak menemukan banyak tanda peringatan. Ini bukan jaminan aman.", symbol: "✓"};
  }

  function renderResult(normalized, findings) {
    const risk = riskFor(findings);
    summary.replaceChildren();
    const icon = document.createElement("div");
    icon.className = "risk-icon " + risk.level;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = risk.symbol;
    const copy = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = risk.title;
    const description = document.createElement("p");
    description.textContent = risk.description;
    copy.append(title, description);
    summary.append(icon, copy);

    resultUrl.textContent = normalized.value;
    findingCount.textContent = findings.filter(item => item.level !== "pass").length + " temuan untuk ditinjau";
    findingList.replaceChildren();
    findings.forEach(item => {
      const li = document.createElement("li");
      li.className = "finding-item";
      const symbol = document.createElement("span");
      symbol.className = "finding-icon " + item.level;
      symbol.setAttribute("aria-hidden", "true");
      symbol.textContent = item.level === "pass" ? "✓" : item.level === "fail" ? "×" : "!";
      const content = document.createElement("div");
      const heading = document.createElement("strong");
      heading.textContent = item.title;
      const detail = document.createElement("p");
      detail.textContent = item.description;
      content.append(heading, detail);
      li.append(symbol, content);
      findingList.append(li);
    });
    results.hidden = false;
    results.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    error.hidden = true;
    error.textContent = "";
    let normalized;
    try {
      normalized = normalizeInput(input.value);
    } catch (err) {
      error.textContent = err.message;
      error.hidden = false;
      input.focus();
      return;
    }
    renderResult(normalized, inspectUrl(normalized.url));
  });

  clearButton.addEventListener("click", () => {
    input.value = "";
    error.hidden = true;
    input.focus();
  });

  scanAnother.addEventListener("click", () => {
    results.hidden = true;
    input.value = "";
    input.focus();
    document.querySelector("#scanner").scrollIntoView({behavior: "smooth", block: "start"});
  });

  input.addEventListener("input", () => {
    if (!error.hidden) {
      error.hidden = true;
      error.textContent = "";
    }
  });
})();