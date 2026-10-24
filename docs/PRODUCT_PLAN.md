# ChocoScan — product plan

## Arah produk
ChocoScan adalah produk utama yang terpisah dari ChocoScan-demo. Antarmuka produk mengikuti sistem visual Choco AI: latar #080b14, sidebar #0c101c, panel #111625, teks terang, muted blue-gray, aksen biru #638cff, ungu #a16bff, dan gradien biru-ungu. Layout menggunakan sidebar workspace, topbar, panel tengah, serta desain responsif untuk desktop dan perangkat seluler.

## Memory Bank (MB)
- Riwayat pemeriksaan disimpan di localStorage dengan kunci versi chocoscan.memory.v1.
- Setiap catatan menyimpan URL, waktu pemeriksaan, hasil ringkas, dan temuan yang ditampilkan.
- Riwayat dapat dibaca ulang setelah reload dengan memilih catatan dari sidebar atau halaman Riwayat.
- Pengguna bisa menghapus seluruh riwayat dan mengekspor/mengimpor berkas JSON.
- Data tetap lokal pada browser/perangkat yang sama, tidak tersinkron otomatis.
- Jangan menyimpan password, cookie, token, atau data login.
- Batas penyimpanan dibatasi hingga 100 catatan. URL yang sama diperbarui ke catatan terbaru.

## Pemeriksaan saat ini
Analisis berjalan di browser dan memeriksa pola URL: HTTPS, host IP, Punycode, struktur subdomain, pemendek URL, TLD tertentu, panjang URL, kata sensitif, encoding, dan pola nama merek. Hasilnya heuristik, bukan hasil threat intelligence live.

## Batas produk
- ChocoScan utama tidak memakai pop-up jebakan, forced redirect, pop-under, pointer lock, atau kontrol menyesatkan.
- SmartLink iklan harus terlihat sebagai sponsor dan terpisah dari indikator keamanan.
- Jangan menyatakan sebuah URL pasti aman hanya berdasarkan pemeriksaan heuristik.
- ChocoScan-demo tetap repo terpisah.
- Repo tetap publik selama pengembangan; jangan mengubah visibilitas tanpa instruksi langsung.

## Pengembangan berikutnya
Integrasi reputasi URL live memerlukan penyedia tepercaya atau backend, penjelasan pemrosesan data, batas permintaan, dan penanganan kegagalan. Fitur tersebut belum diterapkan.
