# Troubleshooting Error 401 (Unauthorized) pada Login

## Masalah yang Ditemukan dan Diperbaiki:

### 1. Konfigurasi CORS
**Masalah:** 
- Syntax error pada `cors.php` (titik koma hilang)
- Hanya mendukung `localhost:5174`, tidak termasuk `127.0.0.1:5174`

**Perbaikan:**
```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'foto-profil/*', 'broadcasting/auth', 'filesguru/*', 'getfileguru/*', 'profiles/completion'],
'allowed_origins' => ['http://localhost:5174', 'http://127.0.0.1:5174'],
```

### 2. Konfigurasi Sanctum
**Masalah:** Stateful domains tidak lengkap

**Perbaikan:**
```php
// config/sanctum.php
'stateful' => [
    'localhost:5174',
    '127.0.0.1:5174',
],
```

### 3. Konfigurasi Session
**Masalah:** Domain dan secure cookie tidak dikonfigurasi untuk development

**Perbaikan:**
```php
// config/session.php
'domain' => env('SESSION_DOMAIN', 'localhost'),
'secure' => env('SESSION_SECURE_COOKIE', false),
'same_site' => env('SESSION_SAME_SITE_COOKIE', 'lax'),
```

### 4. File .env Backend
**Masalah:** Duplikasi konfigurasi SESSION_DRIVER

**Perbaikan:**
```env
SESSION_DRIVER=cookie
SESSION_DOMAIN=localhost
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax
SESSION_LIFETIME=120
SANCTUM_STATEFUL_DOMAINS=localhost:5174,127.0.0.1:5174
```

### 5. Axios Client
**Masalah:** Token tidak disertakan dalam request header

**Perbaikan:**
```javascript
// Tambahkan token ke request interceptor
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
```

### 6. Login Component
**Masalah:** Token tidak disimpan setelah login berhasil

**Perbaikan:**
```javascript
// Simpan token setelah login berhasil
const loginResponse = await axiosClient.post("/api/login", formData);
if (loginResponse.data.access_token) {
  localStorage.setItem('auth_token', loginResponse.data.access_token);
}
```

## Langkah-langkah untuk Mengatasi Error 401:

### 1. Restart Server Backend
```bash
cd gurubackend
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan config:cache
php artisan serve --host=0.0.0.0 --port=8000
```

### 2. Restart Server Frontend
```bash
cd gurufrontend
npm run dev
```

### 3. Test Login
1. Buka browser dan akses `http://localhost:5174/login`
2. Masukkan kredensial yang valid
3. Periksa Network tab di Developer Tools
4. Pastikan request ke `/api/login` mengembalikan status 200

### 4. Debugging
Jika masih error 401, periksa:
1. Log Laravel di `storage/logs/laravel.log`
2. Network tab di browser untuk melihat request/response headers
3. Pastikan CSRF cookie berhasil diambil
4. Pastikan token disimpan di localStorage

## File yang Telah Diperbaiki:
- `gurubackend/config/cors.php`
- `gurubackend/config/sanctum.php`
- `gurubackend/config/session.php`
- `gurubackend/.env`
- `gurubackend/app/Http/Controllers/Auth/AuthProsesController.php`
- `gurufrontend/src/lib/axios.js`
- `gurufrontend/src/auth/Login.jsx`

## Middleware Debug
Ditambahkan middleware `DebugCors` untuk logging request details yang membantu debugging CORS issues.