# ChocoScan

ChocoScan adalah pemeriksa pola URL berbasis browser dengan tema UI yang diselaraskan dengan Choco AI: latar gelap, sidebar, panel, aksen gradien biru-ungu, tipografi sans-serif, dan layout responsif.

## Fitur saat ini
- Pemeriksaan pola URL secara lokal di browser.
- Pemeriksaan HTTPS, host berbasis IP, label Punycode, subdomain, pemendek URL, TLD tertentu, URL panjang, kata sensitif, encoding, dan kemungkinan penyamaran merek.
- Hasil pemeriksaan dengan penjelasan per temuan.
- Memory Bank lokal: riwayat hasil disimpan di localStorage dan bisa dibuka lagi setelah halaman dimuat ulang.
- Riwayat bisa diekspor dan diimpor sebagai JSON, serta dihapus dari UI.
- Layout responsif untuk laptop, tablet, dan HP.
- Empat SmartLink sponsor yang diberi label iklan dan dipisahkan dari hasil keamanan.

## Privasi dan batasan
- URL tidak dikirim ke server dan tidak dibuka otomatis.
- Riwayat disimpan di localStorage browser pada perangkat yang sama. Riwayat tidak tersinkron ke perangkat lain dan dapat hilang jika data situs/browser dihapus.
- Pemeriksaan hanya menganalisis string URL. Ini bukan reputasi domain live, pemindaian isi halaman, atau vonis mutlak keamanan.
- Memory Bank hanya menyimpan riwayat pemeriksaan, bukan password atau kredensial.

## Struktur
- index.html — shell aplikasi, scanner, hasil, riwayat, sponsor
- assets/css/style.css — tema dan layout yang mengikuti sistem visual Choco AI
- assets/js/app.js — pemeriksaan URL dan Memory Bank lokal
- assets/images/favicon.svg — ikon aplikasi
- docs/PRODUCT_PLAN.md — arah produk dan batasan

## Menjalankan
Buka index.html di browser modern. Google Fonts bersifat opsional; fitur pemeriksaan dan riwayat berjalan tanpa backend.

## Proyek demo terpisah
ChocoScan-demo adalah proyek terpisah untuk simulasi edukasi. Efek pop-up agresif dan halaman tiruan tidak digunakan pada produk utama.
