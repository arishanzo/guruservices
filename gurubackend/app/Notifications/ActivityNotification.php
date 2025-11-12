<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ActivityNotification extends Notification
{
 use Queueable;

    private $message;

    /**
     * Create a new notification instance.
     */
    public function __construct($message)
    {
        $this->message = $message;
    }

    /**
     * Tentukan channel notifikasi
     */
    public function via(object $notifiable): array
    {
        return ['database']; 
        // kalau mau via email juga tinggal tambah 'mail'
    }

    /**
     * Data yang disimpan di database
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => $this->message,
            'time' => now()->toDateTimeString(),
        ];
    }
}
