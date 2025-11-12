<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TugasBelajarRequest extends FormRequest
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
            'namatugas' => 'required|string|max:255',
            'deskripsitugas' => 'required|string|max:255',
            'tanggaltugas' => 'required|date',
            'filetugas' => 'nullable|string|max:255',
            'statustugas' => 'nullable|in:selesai,belum selesai',
            'catatantugas' => 'nullable|string|max:255',
            'tgldeadlinetugas' => 'nullable|date',
        ];
    }


     public function messages(): array
    {
        return [
       'idbookingprivate.required' => 'ID User wajib diisi.',
        'idbookingprivate.string' => 'ID User harus berupa string.',
        'idbookingprivate.max' => 'ID User tidak boleh melebihi 255 karakter.',
        'namatugas.string' => 'Nama Tugas harus berupa string.',
        'namatugas.max' => 'Nama Tugas tidak boleh melebihi 255 karakter.',
        'deskripsitugas.required' => 'Deskripsi Tugas wajib diisi.',
        'deskripsitugas.string' => 'Deskripsi Tugas harus berupa string.',
        'deskripsitugas.max' => 'Deskripsi Tugas tidak boleh melebihi 255 karakter.',
        'tanggaltugas.required' => 'Tanggal Tugas wajib diisi.',    
        'tanggaltugas.date' => 'Tanggal Tugas harus berupa tanggal.',
        'filetugas.string' => 'File Tugas harus berupa string.',
        'filetugas.max' => 'File Tugas tidak boleh melebihi 255 karakter.',
        'statustugas.in' => 'Status Tugas harus berupa salah satu dari: selesai, belum selesai.',
        'catatantugas.string' => 'Catatan Tugas harus berupa string.',
        'catatantugas.max' => 'Catatan Tugas tidak boleh melebihi 255 karakter.',   
        'tgldeadlinetugas.date' => 'Tanggal Deadline Tugas harus berupa tanggal.',
        'tgldeadlinetugas.required' => 'Tanggal Deadline Tugas wajib diisi.',

        ];
    }
}
