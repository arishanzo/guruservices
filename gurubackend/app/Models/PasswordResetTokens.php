<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordResetTokens extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['email', 'token', 'ip_address', 'attempts', 'expires_at', 'created_at'];
    protected $casts = ['expires_at' => 'datetime', 'created_at' => 'datetime'];
}
