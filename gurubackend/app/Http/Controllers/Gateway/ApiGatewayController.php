<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ApiGatewayController extends Controller
{
    private $services = [
        'userservices' => 'http://localhost:8001/api',
        'guruservices' => 'http://localhost:8000/api'
    ];

    public function proxy(Request $request, $service, $endpoint = null)
    {
        // Validasi service name
        if (!isset($this->services[$service]) || !preg_match('/^[a-zA-Z0-9_]+$/', $service)) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        // Sanitasi endpoint
        if ($endpoint && !preg_match('/^[a-zA-Z0-9\/_-]+$/', $endpoint)) {
            return response()->json(['error' => 'Invalid endpoint'], 400);
        }

        $baseUrl = $this->services[$service];
        $url = $endpoint ? "{$baseUrl}/{$endpoint}" : $baseUrl;
        
        $headers = $this->getForwardHeaders($request);
        
        try {
            $response = Http::withHeaders($headers)
                ->timeout(30)
                ->{strtolower($request->method())}($url, $request->all());

            return response($response->body(), $response->status())
                ->withHeaders($response->headers());
                
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Service unavailable',
                'message' => $e->getMessage()
            ], 503);
        }
    }

    private function getForwardHeaders(Request $request)
    {
        $headers = [];
        $allowedHeaders = [
            'Content-Type',
            'Accept',
            'User-Agent',
            'X-Requested-With'
        ];

        foreach ($allowedHeaders as $header) {
            if ($request->hasHeader($header)) {
                $headers[$header] = $request->header($header);
            }
        }

        return $headers;
    }
}