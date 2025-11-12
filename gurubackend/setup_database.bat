@echo off
echo Menjalankan migration fresh...
php artisan migrate:fresh --force

echo.
echo Migration selesai!
echo.
echo Untuk menjalankan server, gunakan: php artisan serve
pause