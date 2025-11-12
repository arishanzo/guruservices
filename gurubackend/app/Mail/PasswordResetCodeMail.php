<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class PasswordResetCodeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $code; // tambahkan properti publik agar bisa dipakai di view

    /**
     * Buat instance baru dari mail ini.
     */
    public function __construct($code)
    {
        $this->code = $code;


          $this->onQueue(config('mail.queue', 'emails'));
    }

    /**
     * Tentukan subject email.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Kode Reset Password Anda',
        );
    }

    /**
     * Tentukan isi (content) email.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.password_reset_code', // view email
            with: [                                // data yang dikirim ke view
                'code' => $this->code,
            ],
        );
    }

    /**
     * Lampiran (tidak kita pakai di sini)
     */
    public function attachments(): array
    {
        return [];
    }
}
