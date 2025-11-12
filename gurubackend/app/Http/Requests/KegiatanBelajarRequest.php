<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KegiatanBelajarRequest extends FormRequest
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
            
            'fotokegiatan' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:1000|dimensions:max_width=1000,max_height=1000',
            'videokegiatan' => 'required|string|max:255',
           'linkmateri' => 'required|string|max:255',
        'namakegiatan' => 'required|string|max:255',
        'deskripsikegiatan' => 'required|string|max:255',
        'tglkegiatan' => 'required|date',
        ];
    }


     public function messages(): array
    {
        return [
        'fotokegiatan.image' => 'File harus berupa gambar.',
        'fotokegiatan.dimensions' => 'File harus panjang 1000 x lebar 1000',
        'fotokegiatan.mimes' => 'File harus berupa gambar dengan format jpg, jpeg, png, atau webp.',
        'fotokegiatan.max' => 'Ukuran file tidak boleh melebihi 1 MB.',
       'videokegiatan.required' => 'Video Kegiatan wajib diisi.',
        'videokegiatan.string' => 'Video Kegiatan harus berupa string.',
        'videokegiatan.max' => 'Video Kegiatan tidak boleh melebihi 255 karakter.',
        'linkmateri.required' => 'Link Materi wajib diisi.',
        'linkmateri.string' => 'Link Materi harus berupa string.',
        'linkmateri.max' => 'Link Materi tidak boleh melebihi 255 karakter.',
        'namakegiatan.required' => 'Nama Kegiatan wajib diisi.',
        'namakegiatan.string' => 'Nama Kegiatan harus berupa string.',
        'namakegiatan.max' => 'Nama Kegiatan tidak boleh melebihi 255 karakter.',
        'deskripsikegiatan.required' => 'Deskripsi Kegiatan wajib diisi.',
        'deskripsikegiatan.string' => 'Deskripsi Kegiatan harus berupa string.',
        'deskripsikegiatan.max' => 'Deskripsi Kegiatan tidak boleh melebihi 255 karakter.',
        'tglkegiatan.required' => 'Tanggal Kegiatan wajib diisi.',
        'tglkegiatan.date' => 'Tanggal Kegiatan harus berupa tanggal.',
        ];
    }
}
