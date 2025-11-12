<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhotoProfilRequest extends FormRequest
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
            'foto_profil' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048|dimensions:max_width=1000,max_height=1000',
            'aboutguru' => 'nullable|string|max:1000',
           'alamatlengkap' => 'nullable|string|max:255',
        'no_telp' => 'nullable|string|max:15',
        'kelurahan' => 'nullable|string|max:255',
        'kecamatan' => 'nullable|string|max:255',
        'kabupaten' => 'nullable|string|max:255',
        'provinsi' => 'nullable|string|max:255',
        'kode_pos' => 'nullable|string|max:10',
         'lulusan' => 'nullable|string|max:255',
            'fakultas' => 'nullable|string|max:255',
            'universitas' => 'nullable|string|max:255',
             'bidangngajar' => 'nullable|string|max:255',
            'mapel' => 'nullable|string|max:255',
            'skillpertama' => 'nullable|string|max:255',
            'skillkedua' => 'nullable|string|max:255',
            'skillketiga' => 'nullable|string|max:255',
            'skillkeempat' => 'nullable|string|max:255',
        ];
    }


     public function messages(): array
    {
        return [
        'foto_profil.image' => 'File harus berupa gambar.',
        'foto_profil.dimensions' => 'File harus 1000 x 1000',
        'foto_profil.mimes' => 'File harus berupa gambar dengan format jpg, jpeg, png, atau webp.',
        'foto_profil.max' => 'Ukuran file tidak boleh melebihi 5 MB.',
        'no_telp.required' => 'Nomor telepon harus diisi.',
        'no_telp.digits_between' => 'Nomor telepon harus antara 8 sampai 12 digit.',
        'provinsi.required' => 'Provinsi harus diisi.',
        'provinsi.max' => 'Provinsi tidak boleh melebihi 255 karakter.',
        'kabupaten.required' => 'Kabupaten harus diisi.',
        'kabupaten.max' => 'Kabupaten tidak boleh melebihi 255 karakter.',
        'kecamatan.required' => 'Kecamatan harus diisi.',
        'kecamatan.max' => 'Kecamatan tidak boleh melebihi 255 karakter.',
        'kelurahan.required' => 'Kelurahan harus diisi.',
        'kelurahan.max' => 'Kelurahan tidak boleh melebihi 255 karakter.',
        'kode_pos.required' => 'Kode pos harus diisi.',
        'kode_pos.max' => 'Kode pos tidak boleh melebihi 10 karakter.',
        'alamatlengkap.required' => 'Alamat lengkap harus diisi.',
        'alamatlengkap.max' => 'Alamat lengkap tidak boleh melebihi 255 karakter.',
        'aboutguru.max' => 'Deskripsi singkat tidak boleh melebihi 1000 karakter.',
        'lulusan.max' => 'Lulusan tidak boleh melebihi 255 karakter.',
        'fakultas.max' => 'Fakultas tidak boleh melebihi 255 karakter.',
        'universitas.max' => 'Universitas tidak boleh melebihi 255 karakter.',
        'bidangngajar.max' => 'Mata pelajaran tidak boleh melebihi 255 karakter.',
        'mapel.max' => 'Mata pelajaran tidak boleh melebihi 255 karakter.',
        'skillpertama.max' => 'Skill pertama tidak boleh melebihi 255 karakter.',
        'skillkedua.max' => 'Skill kedua tidak boleh meleb  hi 255 karakter.',
        'skillketiga.max' => 'Skill ketiga tidak boleh melebihi 255 karakter.',
        'skillkeempat.max' => 'Skill keempat tidak boleh melebihi 255 karakter.',    
 
    
        ];
    }
}
