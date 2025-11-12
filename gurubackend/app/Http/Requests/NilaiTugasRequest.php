<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NilaiTugasRequest extends FormRequest
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
            'idtugasbelajar' => 'required|string|max:255',
            'idbookingprivate' => 'required|string|max:255',
           'nilaitugas' => 'required|numeric|min:0|max:100',
        ];
    }


     public function messages(): array
    {
        return [
       'idbookingprivate.required' => 'ID User wajib diisi.',
        'idbookingprivate.string' => 'ID User harus berupa string.',
        'idbookingprivate.max' => 'ID User tidak boleh melebihi 255 karakter.',
        'idtugasbelajar.required' => 'ID Tugas Belajar wajib diisi.',
        'idtugasbelajar.string' => 'ID Tugas Belajar harus berupa string.',
        'idtugasbelajar.max' => 'ID User tidak boleh melebihi 255 karakter.',
        'nilaitugas.max' => 'Nilai Maksimal Panjang 12 Angka',
        'nilaitugas.required' => 'Nilai wajib diisi.',
        'nilaitugas.numeric' => 'Nilai Harus Number',
       

        ];
    }
}
