<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ServiceClient
{
    private $baseUrls = [
        'userservices' => 'http://localhost:8001/api',
        'guruservices' => 'http://localhost:8000/api'
    ];

  public function call($service, $endpoint, $method = 'GET', $data = [], $headers = [])
{
    if (!isset($this->baseUrls[$service])) {
        throw new \Exception("Service {$service} not configured");
    }

    $url = rtrim($this->baseUrls[$service], '/') . '/' . ltrim($endpoint, '/');

    $defaultHeaders = [
        'Content-Type'  => 'application/json',
        'Accept'        => 'application/json',
        'X-Service-Key' => env('SERVICE_AUTH_KEY', 'your-secret-key'),
    ];

    $headers = array_merge($defaultHeaders, $headers);

    try {
        $client = Http::withHeaders($headers)->timeout(30);
        $method = strtoupper($method);

        switch ($method) {
            case 'GET':
                $response = $client->get($url, $data);
                break;

            case 'POST':
                $response = $client->post($url, $data);
                break;

            case 'PUT':
                $response = $client->put($url, $data);
                break;

            case 'PATCH':
                $response = $client->patch($url, $data);
                break;

            case 'DELETE':
                if (empty($data)) {
                    $response = $client->delete($url);
                } else {
                    $response = $client->withBody(json_encode($data), 'application/json')->delete($url);
                }
                break;

            default:
                throw new \InvalidArgumentException("Unsupported HTTP method: {$method}");
        }

        return [
            'success' => $response->successful(),
            'status'  => $response->status(),
            'data'    => $response->json(),
            'body'    => $response->body(),
        ];
    } catch (\Exception $e) {
        return [
            'success' => false,
            'status'  => 500,
            'error'   => $e->getMessage(),
            'data'    => null,
        ];
    }
}

    public function getUserData($userId)
    {
        return $this->call('userservices', "users/{$userId}", 'GET');
    }

       public function getBookingKelas($idProfilGuru)
    {
        return $this->call('userservices', "guru/bookingguru/{$idProfilGuru}", 'GET');
    }

      public function putBookingKelas($idBookingPrivate, array $data = [])
        {
            return $this->call('userservices',"guru/putbookingguru/{$idBookingPrivate}", 'PUT', $data );
        }

          public function putTglBooking($idtglbooking, array $data = [])
        {
            return $this->call('userservices',"guru/puttglbooking/{$idtglbooking}", 'PUT', $data );
        }



    public function getGuruData($guruId)
    {
        return $this->call('guruservices', "profile/{$guruId}", 'GET');
    }

  
}