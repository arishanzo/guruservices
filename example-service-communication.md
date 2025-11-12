# Komunikasi Antar Services - API Gateway

## Struktur yang Dibuat

1. **ApiGatewayController** - Proxy untuk routing antar services
2. **ServiceClient** - Client untuk HTTP calls antar services  
3. **ServiceCommunicationController** - Controller khusus untuk komunikasi
4. **Routes** - Endpoint tanpa auth untuk komunikasi antar service

## Cara Penggunaan

### 1. Melalui API Gateway (Proxy)
```
GET /api/gateway/userservices/users/123
POST /api/gateway/userservices/users
GET /api/gateway/guruservices/profile/456
```

### 2. Melalui Service Communication
```
GET /api/services/user/123
GET /api/services/guru/456
POST /api/services/cross-data
```

### 3. Dalam Controller (menggunakan ServiceClient)
```php
use App\Services\ServiceClient;

class YourController extends Controller 
{
    public function someMethod(ServiceClient $client)
    {
        // Ambil data user dari userservices
        $userResult = $client->getUserData(123);
        
        // Ambil data guru dari guruservices  
        $guruResult = $client->getGuruData(456);
        
        // Custom call ke service lain
        $customResult = $client->call('userservices', 'custom-endpoint', 'POST', [
            'data' => 'value'
        ]);
    }
}
```

## Konfigurasi Service URLs

Edit file `.env` untuk mengatur URL services:
```
USERSERVICES_URL=http://localhost:8001/api
GURUSERVICES_URL=http://localhost:8000/api
```

## Keuntungan Implementasi Ini

- ✅ Tidak mengganggu auth:sanctum yang sudah ada
- ✅ Komunikasi langsung antar services tanpa Docker
- ✅ Flexible routing dengan proxy pattern
- ✅ Error handling yang baik
- ✅ Timeout configuration
- ✅ Header forwarding yang aman