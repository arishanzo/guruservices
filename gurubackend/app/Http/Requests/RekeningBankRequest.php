<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RekeningBankRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_bank' => 'required|string|max:255',
            'norekening' => 'required|string|max:19',
            'pemilikrekening' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'nama_bank.required' => 'Nama Bank Harus Diisi',
            'norekening.required' => 'No Rekening Harus Diisi',
            'pemilikrekening.required' => 'Pemilik Rekening Harus Diisi',
            'norekening.max' => 'No Rekening Maximal 19 Karakter'
        ];
    }
}