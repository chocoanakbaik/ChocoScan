(() => {
  "use strict";
  const STORAGE_KEY = "chocoscan.memory.v1";
  const MAX_HISTORY = 100;
  const form = document.querySelector("#scan-form");
  const input = document.querySelector("#url-input");
  const clearButton = document.querySelector("#clear-input");
  const error = document.querySelector("#input-error");
  const results = document.querySelector("#results");
  const summary = document.querySelector("#result-summary");
  const resultUrl = document.querySelector("#result-url");
  const resultDate = document.querySelector("#result-date");
  const findingList = document.querySelector("#finding-list");
  const findingCount = document.querySelector("#finding-count");
  const scanAnother = document.querySelector("#scan-another");
  const historySection = document.querySelector("#history-section");
  const historyList = document.querySelector("#history-list");
  const recentList = document.querySelector("#recent-list");
  const historyCount = document.querySelector("#history-count");
  const pageTitle = document.querySelector("#page-title");
  const welcomeBlock = document.querySelector("#welcome-block");
  const sidebar = document.querySelector("#sidebar");
  const toast = document.querySelector("#toast");
  const importFile = document.querySelector("#import-file");
  let toastTimer = null;
  let history = readHistory();

  const SHORTENERS = new Set(["bit.ly", "t.co", "tinyurl.com", "is.gd", "cutt.ly", "rb.gy", "shorturl.at", "rebrand.ly", "ow.ly"]);
  const RISKY_TLDS = new Set(["zip", "mov", "country", "click", "work", "support", "top", "gq", "tk", "rest", "fit"]);
  const BRAND_WORDS = ["paypal", "google", "microsoft", "apple", "facebook", "instagram", "whatsapp", "bank", "bri", "bca", "mandiri", "tokopedia", "shopee", "dana"];

  function readHistory() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(item => item && typeof item.url === "string" && Array.isArray(item.findings)).slice(0, MAX_HISTORY) : [];
    } catch (_) {
      return [];
    }
  }
  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
      return true;
    } catch (_) {
      showToast("Penyimpanan browser penuh atau dinonaktifkan. Hasil tampil, tetapi riwayat belum tentu tersimpan.");
      return false;
    }
  }
  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => { toast.hidden = true; }, 3500);
  }
  function safeDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Waktu tidak diketahui" : date.toLocaleString("id-ID", {dateStyle:"medium",timeStyle:"short"});
  }
  function normalizeInput(raw) {
    const value = raw.trim();
    if (!value) throw new Error("Masukkan URL yang ingin diperiksa.");
    if (/^(javascript|data|vbscript|file):/i.test(value)) throw new Error("Skema URL ini tidak didukung. Masukkan alamat web HTTP atau HTTPS.");
    const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : "https://" + value;
    let parsed;
    try { parsed = new URL(candidate); } catch (_) { throw new Error("Format URL tidak valid. Periksa kembali alamat yang dimasukkan."); }
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Hanya alamat HTTP dan HTTPS yang dapat diperiksa.");
    if (!parsed.hostname || !parsed.hostname.includes(".")) throw new Error("Masukkan nama domain lengkap, misalnya contoh.com.");
    if (parsed.username || parsed.password) throw new Error("URL ini memuat informasi login di dalam alamat. Hapus bagian tersebut sebelum memeriksa.");
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
    const add = (level,title,description) => findings.push({level,title,description});
    if (url.protocol === "https:") add("pass","Menggunakan HTTPS","Koneksi HTTPS mengenkripsi lalu lintas, tetapi tidak menjamin situs tersebut tepercaya.");
    else add("warn","Tidak menggunakan HTTPS","Alamat menggunakan HTTP biasa. Hindari mengirimkan informasi sensitif melalui koneksi ini.");
    if (isIp) add("warn","Domain berupa alamat IP","Alamat IP langsung dapat digunakan secara sah, tetapi juga sering dipakai untuk menyamarkan tujuan situs.");
    else add("pass","Menggunakan nama host","Alamat menggunakan nama host, bukan alamat IP langsung.");
    if (labels.some(part => part.startsWith("xn--"))) add("warn","Ada label domain Punycode","Nama domain internasional dapat memakai karakter yang mirip dengan huruf lain. Periksa ejaan domain dengan teliti.");
    else add("pass","Tidak ada label Punycode yang terlihat","Tidak ditemukan label host berawalan xn-- pada pemeriksaan sederhana ini.");
    if (url.username || url.password || /https?:\/\/[^/\s]+@/i.test(full)) add("fail","Ada pola informasi sebelum tanda @","Format ini dapat membuat bagian domain terlihat menyesatkan. Jangan buka sebelum memastikan host sebenarnya.");
    else add("pass","Tidak ada pola user-info di URL","Tidak ditemukan kredensial atau user-info sebelum tanda @.");
    if (labels.length >= 5) add("warn","Subdomain cukup panjang","Banyak subdomain dapat membuat nama host sulit dibaca. Fokus pada domain terdaftar yang sebenarnya.");
    else add("pass","Struktur subdomain tidak berlebihan","Jumlah label host tidak melewati ambang sederhana yang digunakan prototipe.");
    if (SHORTENERS.has(host)) add("warn","Layanan pemendek tautan","Tujuan akhir disembunyikan oleh URL pendek. Periksa tujuan akhirnya melalui layanan ekspansi tepercaya sebelum membuka.");
    else add("pass","Bukan layanan pemendek yang dikenal","Host tidak cocok dengan daftar kecil pemendek tautan yang ada di prototipe.");
    if (RISKY_TLDS.has(tld)) add("warn","Akhiran domain perlu diperiksa","Akhiran ini ada dalam daftar pemeriksaan sederhana, tetapi akhiran domain saja tidak membuktikan situs berbahaya.");
    else add("pass","Akhiran domain tidak ada di daftar peringatan","Akhiran domain tidak cocok dengan daftar kecil prototipe; hal ini bukan bukti bahwa situs aman.");
    if (full.length > 180) add("warn","URL sangat panjang","URL panjang dengan banyak parameter dapat menyamarkan tujuan atau alur pengalihan.");
    else add("pass","Panjang URL masih wajar","Panjang alamat berada di bawah ambang sederhana 180 karakter.");
    if (/(login|signin|verify|verification|secure|account|password|wallet|claim|gift|free|bonus|update|suspended|urgent)/i.test(url.pathname + url.search)) add("warn","Kata sensitif di jalur atau parameter","Kata seperti login, verifikasi, bonus, atau urgent sering muncul pada situs sah maupun penipuan. Cocokkan dengan konteks dan pemilik domain.");
    else add("pass","Tidak ada kata pemancing umum","Tidak ditemukan kata pemancing yang dipantau pada jalur atau parameter URL.");
    if (/%[0-9a-f]{2}/i.test(full) || /%25/i.test(full) || /\\u[0-9a-f]{4}/i.test(decoded)) add("warn","Ada karakter yang di-encode","Encoding adalah hal normal pada URL, tetapi encoding berlapis atau sulit dibaca layak diperiksa lebih lanjut.");
    else add("pass","Tidak ada pola encoding mencolok","Pemeriksaan sederhana tidak menemukan pola encoding yang ditandai.");
    const brandMatches = BRAND_WORDS.filter(word => host.includes(word) && !host.split(".").some(label => label === word));
    if (brandMatches.length) add("warn","Nama merek muncul di subdomain atau label gabungan","Ditemukan kata yang menyerupai merek populer (" + brandMatches.slice(0,3).join(", ") + "). Pastikan domain benar-benar milik organisasi tersebut.");
    else add("pass","Tidak ada pola penyamaran merek yang terdeteksi","Daftar kecil merek dalam prototipe tidak menemukan pola yang ditandai. Daftar ini tidak lengkap.");
    return findings;
  }
  function riskFor(findings) {
    const weight = {pass:0,warn:1,fail:3};
    const score = findings.reduce((total,item) => total + (weight[item.level] || 0),0);
    const warnings = findings.filter(item => item.level !== "pass").length;
    if (score >= 6 || findings.some(item => item.level === "fail")) return {level:"high",title:"Ada beberapa sinyal risiko",description:"Tinjau temuan di bawah dan jangan membuka tautan jika sumbernya tidak jelas.",symbol:"!"};
    if (score >= 2 || warnings > 0) return {level:"medium",title:"Perlu diperiksa lebih lanjut",description:"Ada pola yang layak ditinjau. Ini bukan kepastian bahwa URL tersebut berbahaya.",symbol:"!"};
    return {level:"low",title:"Sedikit sinyal risiko terdeteksi",description:"Pemeriksaan pola dasar tidak menemukan banyak tanda peringatan. Ini bukan jaminan aman.",symbol:"✓"};
  }
  function renderResult(item, scroll = true) {
    const risk = item.risk || riskFor(item.findings);
    summary.replaceChildren();
    const icon = document.createElement("div"); icon.className = "risk-icon " + risk.level; icon.setAttribute("aria-hidden","true"); icon.textContent = risk.symbol;
    const copy = document.createElement("div");
    const title = document.createElement("h2"); title.textContent = risk.title;
    const description = document.createElement("p"); description.textContent = risk.description;
    copy.append(title,description); summary.append(icon,copy);
    resultUrl.textContent = item.url;
    resultDate.textContent = "Diperiksa " + safeDate(item.createdAt);
    findingCount.textContent = item.findings.filter(f => f.level !== "pass").length + " temuan untuk ditinjau";
    findingList.replaceChildren();
    item.findings.forEach(finding => {
      const li = document.createElement("li"); li.className = "finding-item";
      const symbol = document.createElement("span"); symbol.className = "finding-icon " + finding.level; symbol.setAttribute("aria-hidden","true"); symbol.textContent = finding.level === "pass" ? "✓" : finding.level === "fail" ? "×" : "!";
      const content = document.createElement("div"); const heading = document.createElement("strong"); heading.textContent = finding.title;
      const detail = document.createElement("p"); detail.textContent = finding.description;
      content.append(heading,detail); li.append(symbol,content); findingList.append(li);
    });
    results.hidden = false; historySection.hidden = true; pageTitle.textContent = "Hasil pemeriksaan";
    if (scroll) results.scrollIntoView({behavior:motionBehavior(),block:"start"});
  }
  function motionBehavior() { return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"; }
  function saveScan(url, findings) {
    const risk = riskFor(findings);
    const item = {id:makeId(),url,findings,risk,createdAt:new Date().toISOString()};
    history = [item,...history.filter(old => old.url !== url)].slice(0,MAX_HISTORY);
    const saved = saveHistory();
    renderResult(item);
    renderHistory();
    if (!saved) document.querySelector("#saved-indicator").textContent = "MEMORI BELUM TERSIMPAN";
    else document.querySelector("#saved-indicator").textContent = "TERSIMPAN DI MEMORI";
    return item;
  }
  function makeId() { return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
  function renderHistory() {
    historyCount.textContent = String(history.length);
    recentList.replaceChildren();
    if (!history.length) {
      const empty = document.createElement("p"); empty.className = "empty-recent"; empty.textContent = "Belum ada pemeriksaan tersimpan."; recentList.append(empty);
    } else {
      history.slice(0,6).forEach(item => {
        const button = document.createElement("button"); button.type = "button"; button.className = "recent-item"; button.textContent = item.url; button.title = item.url;
        button.addEventListener("click",() => { closeSidebar(); renderResult(item); }); recentList.append(button);
      });
    }
    historyList.replaceChildren();
    if (!history.length) {
      const empty = document.createElement("div"); empty.className = "history-empty"; empty.textContent = "Belum ada riwayat. Periksa tautan pertama untuk mulai membangun memori lokal."; historyList.append(empty); return;
    }
    history.forEach(item => {
      const risk = item.risk || riskFor(item.findings);
      const button = document.createElement("button"); button.type = "button"; button.className = "history-card";
      const icon = document.createElement("span"); icon.className = "history-risk " + risk.level; icon.textContent = risk.symbol;
      const copy = document.createElement("span"); copy.className = "history-copy";
      const url = document.createElement("span"); url.className = "history-url"; url.textContent = item.url;
      const meta = document.createElement("span"); meta.className = "history-meta";
      const riskLabel = risk.level === "high" ? "Risiko tinggi" : risk.level === "medium" ? "Perlu ditinjau" : "Sinyal rendah";
      const date = document.createElement("span"); date.textContent = safeDate(item.createdAt);
      const status = document.createElement("span"); status.textContent = riskLabel;
      meta.append(date,status); copy.append(url,meta);
      const open = document.createElement("span"); open.className = "history-open"; open.textContent = "Buka hasil ↗";
      button.append(icon,copy,open); button.addEventListener("click",() => { closeSidebar(); renderResult(item); }); historyList.append(button);
    });
  }
  function showHistory() {
    results.hidden = true; historySection.hidden = false; welcomeBlock.hidden = true; pageTitle.textContent = "Riwayat pemeriksaan"; renderHistory(); closeSidebar();
  }
  function showScanner() {
    historySection.hidden = true; results.hidden = true; welcomeBlock.hidden = false; pageTitle.textContent = "Pemeriksa URL"; input.focus(); closeSidebar();
    document.querySelector("#main-scroll").scrollTo({top:0,behavior:motionBehavior()});
  }
  function closeSidebar() { sidebar.classList.remove("open"); }
  form.addEventListener("submit",event => {
    event.preventDefault(); error.hidden = true; error.textContent = "";
    let normalized;
    try { normalized = normalizeInput(input.value); }
    catch (err) { error.textContent = err.message; error.hidden = false; input.focus(); return; }
    saveScan(normalized.value,inspectUrl(normalized.url));
  });
  clearButton.addEventListener("click",() => { input.value = ""; error.hidden = true; input.focus(); });
  scanAnother.addEventListener("click",showScanner);
  input.addEventListener("input",() => { if (!error.hidden) { error.hidden = true; error.textContent = ""; } });
  document.querySelector("#new-scan").addEventListener("click",showScanner);
  document.querySelector("#nav-scanner").addEventListener("click",showScanner);
  document.querySelector("#nav-history").addEventListener("click",showHistory);
  document.querySelector("#mobile-menu").addEventListener("click",() => sidebar.classList.toggle("open"));
  document.querySelector("#clear-history").addEventListener("click",() => {
    if (!history.length) { showToast("Memori masih kosong."); return; }
    if (!window.confirm("Hapus seluruh riwayat pemeriksaan yang tersimpan di browser ini?")) return;
    history = []; saveHistory(); renderHistory(); showScanner(); showToast("Riwayat lokal sudah dihapus.");
  });
  document.querySelector("#export-history").addEventListener("click",() => {
    const blob = new Blob([JSON.stringify({app:"ChocoScan",version:1,exportedAt:new Date().toISOString(),history},null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "chocoscan-memory-export.json"; link.click(); URL.revokeObjectURL(url);
    showToast("Ekspor memori dibuat dalam format JSON.");
  });
  importFile.addEventListener("change",async () => {
    const file = importFile.files && importFile.files[0]; if (!file) return;
    try {
      const data = JSON.parse(await file.text()); const incoming = Array.isArray(data) ? data : data.history;
      if (!Array.isArray(incoming)) throw new Error("Format file tidak cocok.");
      const valid = incoming.filter(item => item && typeof item.url === "string" && Array.isArray(item.findings) && item.findings.every(f => f && ["pass","warn","fail"].includes(f.level) && typeof f.title === "string" && typeof f.description === "string"));
      history = [...valid,...history].filter((item,index,all) => all.findIndex(other => other.url === item.url) === index).slice(0,MAX_HISTORY);
      saveHistory(); renderHistory(); showHistory(); showToast("Memori berhasil diimpor: " + valid.length + " catatan.");
    } catch (_) { showToast("File JSON tidak valid atau bukan ekspor memori ChocoScan."); }
    importFile.value = "";
  });
  renderHistory();
})();