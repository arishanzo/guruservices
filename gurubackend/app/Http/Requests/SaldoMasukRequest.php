<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaldoMasukRequest extends FormRequest
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
         'idbookingprivate' => 'required|string|max:255',
         'jumlahsaldomasuk' => 'required|numeric|min:0',
         'tglsaldomasuk' => 'required|date',
        ];
    }


     public function messages(): array
    {
        return [
        'idbookingprivate.string' => 'ID User harus berupa string.',
        'idbookingprivate.max' => 'ID User tidak boleh melebihi 255 karakter.',
        'tglsaldomasuk.required' => 'Tanggal wajib diisi.',
        'tglsaldomasuk.date' => 'Tanggal harus berupa tanggal.',
        'jumlahsaldomasuk.max' => 'Nilai Maksimal Panjang 12 Angka',
        'jumlahsaldomasuk.required' => 'Nilai wajib diisi.',
        'jumlahsaldomasuk.numeric' => 'Nilai Harus Number',
        ];
    }
}
