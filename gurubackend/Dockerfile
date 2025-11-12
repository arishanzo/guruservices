# # backend/guru-backend/Dockerfile
# FROM php:8.2-fpm

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     libpng-dev libonig-dev libxml2-dev zip unzip git curl

# # Install PHP extensions yang dibutuhkan Laravel
# RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# # Install Composer
# COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# # Set working directory
# WORKDIR /var/www

# # ✅ Copy seluruh source Laravel terlebih dahulu
# COPY . .

# # ✅ Jalankan composer install setelah file artisan tersedia
# RUN composer install --no-interaction --prefer-dist --optimize-autoloader --ignore-platform-reqs

# # Buat symbolic link storage
# RUN php artisan storage:link || true

# EXPOSE 9001
# CMD ["php-fpm"]


# Multi-stage build untuk optimasi
FROM php:8.2-fpm as base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Install OPcache untuk performa
RUN docker-php-ext-install opcache

# Copy OPcache config
COPY <<EOF /usr/local/etc/php/conf.d/opcache.ini
opcache.enable=1
opcache.memory_consumption=128
opcache.interned_strings_buffer=8
opcache.max_accelerated_files=4000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
EOF

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/guru-backend

# Copy composer files first untuk layer caching
COPY composer.json composer.lock ./

# Install dependencies
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

# Copy application code
COPY . .

# Generate autoloader dan cache
RUN composer dump-autoload --optimize \
    && php artisan config:cache || true \
    && php artisan route:cache || true \
    && php artisan view:cache || true \
    && php artisan storage:link || true

# Set permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 9001

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=9001"]