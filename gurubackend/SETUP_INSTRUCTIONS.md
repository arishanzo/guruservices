# Setup Instructions - GoPintar App Backend

## Langkah-langkah untuk memperbaiki error 500:

### 1. Reset Database
Jalankan file `reset_db.bat` atau jalankan perintah berikut secara manual:

```bash
php artisan migrate:reset --force
php artisan migrate --force
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### 2. Pastikan Database Berjalan
- Pastikan MySQL/MariaDB sudah berjalan di Laragon
- Pastikan database `usrgopintar_db` sudah dibuat

### 3. Jalankan Server
```bash
php artisan serve
```

### 4. Test Endpoint
Test endpoint profile dengan:
```
GET http://localhost:8000/api/profile/1
```

## Masalah yang Sudah Diperbaiki:

1. ✅ Nama tabel tidak konsisten (`profiluser` vs `profileuser`)
2. ✅ Relasi model yang salah
3. ✅ Validasi PhotoProfilRequest yang memblokir request
4. ✅ Middleware duplikat di Kernel.php
5. ✅ Method getByID yang menggunakan `get()` instead of `first()`
6. ✅ Foreign key constraint untuk relasi tabel
7. ✅ Tipe data yang tidak sesuai di migration

## Struktur Database:

### Tabel `userlogin`:
- iduser (Primary Key)
- nama_user
- email (unique)
- password
- timestamps

### Tabel `profileuser`:
- idprofiluser (Primary Key)
- iduser (Foreign Key ke userlogin.iduser, unique)
- foto_profil
- alamatlengkap
- no_telp
- kelurahan, kecamatan, kabupaten, provinsi
- kode_pos
- nama_anak
- usia_anak
- timestamps