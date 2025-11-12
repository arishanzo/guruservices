<x-mail::message>
# 🔒 Reset Password Akun Anda

Halo,  

Kami menerima permintaan untuk mereset password akun Anda.  
Gunakan **kode verifikasi berikut** untuk melanjutkan proses reset password:


<x-mail::panel>
<h2 style="text-align:center; font-size:28px; letter-spacing:3px; margin:0; color:#2d3748;">
    {{ $code }}
</h2>
<p style="text-align:center; margin:5px 0 0 0; font-size:13px; color:#718096;">
    Berlaku hingga {{ now()->addMinutes(15)->format('H:i') }} (15 menit dari sekarang)
</p>
</x-mail::panel>

<p style="font-size:14px; color:#4a5568;">
Jika Anda <strong>tidak meminta</strong> reset password, abaikan email ini.
Kode ini bersifat rahasia — jangan dibagikan ke siapa pun.
</p>



Terima kasih,  
**{{ config('app.name') }}**<br>
<small style="color:#a0aec0;">Email ini dikirim otomatis. Mohon tidak membalas langsung.</small>
</x-mail::message>
