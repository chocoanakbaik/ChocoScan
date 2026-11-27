(() => {
  'use strict';
  const storageKey = 'chocoscan.language.v1';
  const strings = {
    'Pemeriksaan baru': {en:'New scan',zh:'新建检查'},
    'WORKSPACE': {en:'WORKSPACE',zh:'工作区'},
    'Pemeriksa URL': {en:'URL checker',zh:'网址检查器'},
    'Riwayat pemeriksaan': {en:'Scan history',zh:'检查记录'},
    'TERAKHIR DIPERIKSA': {en:'LAST CHECKED',zh:'最近检查'},
    'Belum ada pemeriksaan tersimpan.': {en:'No saved scans yet.',zh:'暂无已保存的检查记录。'},
    'Memori lokal aktif': {en:'Local memory is active',zh:'本地记录已启用'},
    'Riwayat tersimpan di perangkat ini': {en:'History is stored on this device',zh:'记录保存在此设备上'},
    'CHOCO SECURITY TOOLS': {en:'CHOCO SECURITY TOOLS',zh:'CHOCO 安全工具'},
    'LOCAL MODE': {en:'LOCAL MODE',zh:'本地模式'},
    'Analisis lokal': {en:'Local analysis',zh:'本地分析'},
    'LINK SAFETY CHECK': {en:'LINK SAFETY CHECK',zh:'链接安全检查'},
    'Periksa tautan sebelum': {en:'Check a link before',zh:'打开链接前请先'},
    'lu membukanya.': {en:'you open it.',zh:'检查它。'},
    'Masukkan URL untuk memeriksa pola yang mencurigakan. Hasil dan riwayat disimpan secara lokal di browser ini.': {en:'Enter a URL to check for suspicious patterns. Results and history stay in this browser.',zh:'输入网址以检查可疑模式。结果和记录仅保存在此浏览器中。'},
    'Periksa sebuah tautan': {en:'Check a link',zh:'检查链接'},
    'Tempel alamat lengkap, termasuk domainnya.': {en:'Paste the full address, including its domain.',zh:'粘贴完整地址，包括域名。'},
    'PRIVATE BY DEFAULT': {en:'PRIVATE BY DEFAULT',zh:'默认保护隐私'},
    'Alamat URL yang ingin diperiksa': {en:'URL to check',zh:'要检查的网址'},
    'Pemeriksaan ini menilai struktur URL, bukan isi situs atau reputasi domain secara langsung.': {en:'This check evaluates URL structure, not page content or the domain’s live reputation.',zh:'此检查评估网址结构，不直接分析网页内容或域名实时信誉。'},
    'Periksa tautan': {en:'Check link',zh:'检查链接'},
    'Privasi terjaga.': {en:'Your privacy stays protected.',zh:'隐私受到保护。'},
    'URL dan hasil pemeriksaan tidak dikirim ke server. Riwayat hanya disimpan di penyimpanan lokal browser ini.': {en:'URLs and scan results are not sent to a server. History is stored only in this browser.',zh:'网址和检查结果不会发送到服务器。记录仅存储在此浏览器的本地空间。'},
    'HASIL PEMERIKSAAN': {en:'SCAN RESULTS',zh:'检查结果'},
    'Ringkasan hasil': {en:'Result summary',zh:'结果摘要'},
    'TERSIMPAN DI MEMORI': {en:'SAVED LOCALLY',zh:'已保存在本地'},
    'URL YANG DIPERIKSA': {en:'CHECKED URL',zh:'已检查的网址'},
    'Temuan pemeriksaan': {en:'Findings',zh:'检查发现'},
    'Catatan:': {en:'Note:',zh:'说明：'},
    'hasil berdasarkan pola URL saja. Risiko rendah bukan jaminan aman dan bukan pengganti layanan reputasi keamanan.': {en:'results are based on URL patterns only. Low risk is not a safety guarantee and does not replace a security reputation service.',zh:'结果仅基于网址模式。低风险并不保证安全，也不能替代安全信誉服务。'},
    'Periksa tautan lain': {en:'Check another link',zh:'检查其他链接'},
    'MEMORY BANK / LOCAL HISTORY': {en:'MEMORY BANK / LOCAL HISTORY',zh:'本地记录'},
    'Pemeriksaan yang pernah dilakukan bisa dibuka lagi setelah halaman dimuat ulang.': {en:'Previous scans can be reopened after the page is reloaded.',zh:'页面重新加载后，仍可重新打开以前的检查记录。'},
    'Impor JSON ↑': {en:'Import JSON ↑',zh:'导入 JSON ↑'},
    'Ekspor JSON ↓': {en:'Export JSON ↓',zh:'导出 JSON ↓'},
    'Riwayat ini berada di localStorage browser pada perangkat ini. Menghapus data situs/browser dapat menghapus riwayat. Riwayat tidak otomatis tersinkron ke perangkat lain.': {en:'This history is stored in this browser’s localStorage. Clearing browser or site data may erase it. History is not synced to other devices.',zh:'记录存储在此设备浏览器的 localStorage 中。清除浏览器或网站数据可能会删除记录，记录不会自动同步到其他设备。'},
    'IKLAN': {en:'SPONSOR',zh:'赞助内容'},
    'Lihat penawaran': {en:'View offers',zh:'查看优惠'},
    'Jelajahi pilihan': {en:'Explore options',zh:'浏览选项'},
    'Buka penawaran': {en:'Open offer',zh:'打开优惠'},
    'Lihat opsi lain': {en:'See other options',zh:'查看其他选项'},
    'ChocoScan by The Choco Studios': {en:'ChocoScan by The Choco Studios',zh:'ChocoScan · The Choco Studios'},
    'Analisis heuristik · tanpa backend': {en:'Heuristic analysis · no backend',zh:'启发式分析 · 无后端'},
    'Waktu tidak diketahui': {en:'Unknown time',zh:'时间未知'},
    'Masukkan URL yang ingin diperiksa.': {en:'Enter a URL to check.',zh:'请输入要检查的网址。'},
    'Skema URL ini tidak didukung. Masukkan alamat web HTTP atau HTTPS.': {en:'This URL scheme is not supported. Enter an HTTP or HTTPS web address.',zh:'不支持此网址协议。请输入 HTTP 或 HTTPS 网址。'},
    'Format URL tidak valid. Periksa kembali alamat yang dimasukkan.': {en:'The URL format is invalid. Check the address and try again.',zh:'网址格式无效。请检查输入的地址后重试。'},
    'Hanya alamat HTTP dan HTTPS yang dapat diperiksa.': {en:'Only HTTP and HTTPS addresses can be checked.',zh:'只能检查 HTTP 和 HTTPS 地址。'},
    'Menggunakan HTTPS': {en:'Uses HTTPS',zh:'使用 HTTPS'},
    'Koneksi HTTPS mengenkripsi lalu lintas, tetapi tidak menjamin situs tersebut tepercaya.': {en:'HTTPS encrypts traffic, but does not guarantee that a site is trustworthy.',zh:'HTTPS 会加密流量，但不能保证网站可信。'},
    'Tidak menggunakan HTTPS': {en:'Does not use HTTPS',zh:'未使用 HTTPS'},
    'Alamat menggunakan HTTP biasa. Hindari mengirimkan informasi sensitif melalui koneksi ini.': {en:'The address uses plain HTTP. Avoid sending sensitive information over this connection.',zh:'该地址使用普通 HTTP。请避免通过此连接发送敏感信息。'},
    'Domain berupa alamat IP': {en:'Domain is an IP address',zh:'域名为 IP 地址'},
    'Alamat IP langsung dapat digunakan secara sah, tetapi juga sering dipakai untuk menyamarkan tujuan situs.': {en:'Direct IP addresses can be legitimate, but are also sometimes used to disguise a site’s destination.',zh:'直接使用 IP 地址可能是正常的，但也可能被用于隐藏网站真实目的地。'},
    'Menggunakan nama host': {en:'Uses a hostname',zh:'使用主机名'},
    'Alamat menggunakan nama host, bukan alamat IP langsung.': {en:'The address uses a hostname rather than a direct IP address.',zh:'该地址使用主机名，而不是直接使用 IP 地址。'},
    'Ada label domain Punycode': {en:'Punycode domain label detected',zh:'检测到 Punycode 域名标签'},
    'Nama domain internasional dapat memakai karakter yang mirip dengan huruf lain. Periksa ejaan domain dengan teliti.': {en:'International domain names can use characters that resemble other letters. Check the domain spelling carefully.',zh:'国际域名可能使用与其他字母相似的字符。请仔细核对域名拼写。'},
    'Tidak ada label Punycode yang terlihat': {en:'No visible Punycode label',zh:'未发现明显的 Punycode 标签'},
    'Tidak ditemukan label host berawalan xn-- pada pemeriksaan sederhana ini.': {en:'This basic check found no hostname label beginning with xn--.',zh:'此基础检查未发现以 xn-- 开头的主机名标签。'},
    'Ada pola informasi sebelum tanda @': {en:'Information appears before the @ sign',zh:'@ 符号前存在信息段'},
    'ChocoScan beranda': {en:'ChocoScan home',zh:'ChocoScan 首页'},
    'Buka menu': {en:'Open menu',zh:'打开菜单'},
    'Hapus seluruh riwayat': {en:'Delete all history',zh:'删除全部记录'},
    'Kosongkan URL': {en:'Clear URL',zh:'清空网址'},
    'https://contoh-situs.com/halaman': {en:'https://example-site.com/page',zh:'https://example-site.com/page'},
    'Iklan': {en:'Sponsor',zh:'赞助内容'}
  };
  const attrOriginal = new WeakMap();
  const textOriginal = new WeakMap();
  const textApplied = new WeakMap();
  const attrApplied = new WeakMap();
  let lang = 'id';
  const normalize = value => String(value || '').replace(/\s+/g, ' ').trim();
  const htmlLang = code => code === 'zh' ? 'zh-CN' : code === 'en' ? 'en' : 'id';
  function translateText(node) {
    const current = node.nodeValue || '';
    if (textApplied.has(node) && current !== textApplied.get(node)) textOriginal.set(node, current);
    if (!textOriginal.has(node)) textOriginal.set(node, current);
    const original = textOriginal.get(node);
    const value = normalize(original);
    const translated = lang === 'id' ? value : strings[value]?.[lang] || value;
    const leading = (original.match(/^\s*/) || [''])[0];
    const trailing = (original.match(/\s*$/) || [''])[0];
    node.nodeValue = leading + translated + trailing;
    textApplied.set(node, node.nodeValue);
  }
  function translateAttribute(element, name) {
    const current = element.getAttribute(name);
    if (current === null) return;
    let originals = attrOriginal.get(element);
    let applied = attrApplied.get(element);
    if (!originals) { originals = {}; attrOriginal.set(element, originals); }
    if (!applied) { applied = {}; attrApplied.set(element, applied); }
    if (Object.prototype.hasOwnProperty.call(applied, name) && current !== applied[name]) originals[name] = current;
    if (!Object.prototype.hasOwnProperty.call(originals, name)) originals[name] = current;
    const source = normalize(originals[name]);
    const target = lang === 'id' ? source : strings[source]?.[lang] || source;
    element.setAttribute(name, target);
    applied[name] = target;
  }
  function scan(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const parent = node.parentElement;
      if (!parent || parent.closest('script,style,noscript,pre,code,[data-no-translate],#tcs-language-control')) continue;
      translateText(node);
    }
    const selector = root.querySelectorAll ? root.querySelectorAll('[placeholder],[aria-label],[title],[alt]') : [];
    selector.forEach(el => ['placeholder','aria-label','title','alt'].forEach(name => translateAttribute(el,name)));
    if (root.matches && root.matches('[placeholder],[aria-label],[title],[alt]')) ['placeholder','aria-label','title','alt'].forEach(name => translateAttribute(root,name));
  }
  function mountSelector() {
    if (document.getElementById('tcs-language-control')) return;
    const box = document.createElement('div');
    box.id = 'tcs-language-control';
    box.innerHTML = '<label class="tcs-language-label" for="tcs-language-select">Language</label><select id="tcs-language-select" aria-label="Choose language"><option value="id">ID · Indonesia</option><option value="en">EN · English</option><option value="zh">中文 · Mandarin</option></select>';
    const style = document.createElement('style');
    style.textContent = '#tcs-language-control{position:fixed;top:14px;right:14px;z-index:10000;display:flex;align-items:center;gap:7px;padding:7px 9px;border:1px solid rgba(155,174,205,.42);border-radius:12px;background:rgba(9,15,27,.94);color:#f4f7ff;box-shadow:0 8px 28px rgba(0,0,0,.22);font:500 12px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;backdrop-filter:blur(12px)}#tcs-language-control .tcs-language-label{color:inherit;font-size:11px;opacity:.78}#tcs-language-control select{max-width:145px;border:0;outline:0;background:transparent;color:inherit;font:inherit;cursor:pointer}#tcs-language-control option{background:#101827;color:#f4f7ff}@media(max-width:640px){#tcs-language-control{top:9px;right:9px;padding:6px 7px;gap:4px}#tcs-language-control .tcs-language-label{display:none}}';
    document.head.append(style);
    document.body.append(box);
    const select = box.querySelector('select');
    select.value = lang;
    select.addEventListener('change', () => setLanguage(select.value));
  }
  function setLanguage(code) {
    lang = ['id','en','zh'].includes(code) ? code : 'id';
    try { localStorage.setItem(storageKey, lang); } catch {}
    document.documentElement.lang = htmlLang(lang);
    const selector = document.getElementById('tcs-language-select');
    if (selector && selector.value !== lang) selector.value = lang;
    scan();
  }
  function init() {
    mountSelector();
    let saved = 'id';
    try { const value = localStorage.getItem(storageKey); if (['id','en','zh'].includes(value)) saved = value; } catch {}
    setLanguage(saved);
    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'characterData') translateText(record.target);
        else record.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            if (!textOriginal.has(node)) textOriginal.set(node, node.nodeValue || '');
            translateText(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        });
        if (record.type === 'attributes' && record.target.nodeType === Node.ELEMENT_NODE) translateAttribute(record.target, record.attributeName);
      });
    });
    observer.observe(document.body, {subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title','alt']});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true}); else init();
})();