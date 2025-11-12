<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AbsensiGuruRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
         'idtglbooking' => 'required|string|max:255',
         'tanggal' => 'required|date',
         'sesi' => 'required|string|max:255',
         'statusabsen' => 'required|string|max:255',
        ];
    }


     public function messages(): array
    {
        return [
        'idtglbooking.required' => 'ID User wajib diisi.',
        'idtglbooking.string' => 'ID User harus berupa string.',
        'idtglbooking.max' => 'ID User tidak boleh melebihi 255 karakter.',
        'tanggal.required' => 'Tanggal wajib diisi.',
        'tanggal.date' => 'Tanggal harus berupa tanggal.',
        'sesi.required' => 'Sesi wajib diisi.',
        'sesi.string' => 'Sesi harus berupa string.',
        'sesi.max' => 'Sesi tidak boleh melebihi 255 karakter.',
        'statusabsen.required' => 'Status Absen wajib diisi.',
        'statusabsen.string' => 'Status Absen harus berupa string.',
        'statusabsen.max' => 'Status Absen tidak boleh melebihi 255 karakter.',
        ];
    }
}
