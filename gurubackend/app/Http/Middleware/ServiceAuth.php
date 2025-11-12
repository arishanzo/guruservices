<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ServiceAuth
{
    public function handle(Request $request, Closure $next)
    {
        $allowedIps = ['127.0.0.1', 'localhost'];
        $serviceKey = env('SERVICE_AUTH_KEY', 'your-secret-key');
        
        if (!in_array($request->ip(), $allowedIps)) {
            return response()->json(['error' => 'Unauthorized IP'], 403);
        }
        
        if ($request->header('X-Service-Key') !== $serviceKey) {
            return response()->json(['error' => 'Invalid service key'], 401);
        }
        
        return $next($request);
    }
}