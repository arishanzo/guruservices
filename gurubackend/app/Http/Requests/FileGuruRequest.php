<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileGuruRequest extends FormRequest
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
         'file_cv' => 'required|file|mimes:pdf|max:5120',
            'file_ijazah' => 'nullable|file|mimes:pdf|max:5120',
            'file_sertifikat' => 'nullable|file|mimes:pdf|max:5120',
            'file_portofolio' => 'nullable|file|mimes:pdf|max:5120',
        ];
    }


     public function messages(): array
    {
        return [
            'file_cv.required' => 'File CV harus diunggah.',
            'file_cv.file' => 'File CV harus berupa file yang valid.',
            'file_cv.mimes' => 'File CV harus berupa file dengan format PDF.',
            'file_cv.max' => 'Ukuran file CV tidak boleh melebihi 5 MB.',
            'file_ijazah.file' => 'File Ijazah harus berupa file yang valid.',
            'file_ijazah.mimes' => 'File Ijazah harus berupa file dengan format PDF.',
            'file_ijazah.max' => 'Ukuran file Ijazah tidak boleh melebihi 5 MB.',
            'file_sertifikat.file' => 'File Sertifikat harus berupa file yang valid.',
            'file_sertifikat.mimes' => 'File Sertifikat harus berupa file dengan format PDF.',
            'file_sertifikat.max' => 'Ukuran file Sertifikat tidak boleh melebihi 5 MB.',
            'file_portofolio.file' => 'File Portofolio harus berupa file yang valid.',
            'file_portofolio.mimes' => 'File Portofolio harus berupa file dengan format PDF.',
            'file_portofolio.max' => 'Ukuran file Portofolio tidak boleh melebihi 5 MB.',
        ];
    }
}
