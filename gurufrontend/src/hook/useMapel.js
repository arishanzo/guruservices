import { useEffect, useState } from "react"

export const useMapel = (bidang) => {

    const [datamapel, setDataMapel] = useState([]);


    useEffect(() => {

        if(!bidang) {
            setDataMapel([]);
            return;
        }
      
         if(bidang === 'Fokus Akademik Umum (SD, SMP, SMA)') {

            setDataMapel([
                { id: 1, mapel: 'Matematika SD/SMP/SMA/SMK', judul: 'Matematika SD/SMP/SMA/SMK' },
                { id: 2, mapel: 'Bahasa Indonesia', judul: 'Bahasa Indonesia' },
                { id: 3, mapel: 'Kimia', judul: 'Kimia' },
                { id: 4, mapel: 'Biologi', judul: 'Biologi' },
                { id: 5, mapel: 'Bahasa Inggris', judul: 'Bahasa Inggris' },
                { id: 6, mapel: 'Fisika', judul: 'Fisika' },
                { id: 7, mapel: 'Pendidikan Agama', judul: 'Pendidikan Agama' },
                { id: 8, mapel: 'Bahasa Daerah (Jawa, Sunda, dll)', judul: 'Bahasa Daerah (Jawa, Sunda, dll)' },
                { id: 9, mapel: 'Sejarah', judul: 'Sejarah' },
                { id: 10, mapel: 'Ekonomi', judul: 'Ekonomi' },
                { id: 11, mapel: 'Sosiologi', judul: 'Sosiologi' },
                { id: 12, mapel: 'Komputer / Coding', judul: 'Komputer / Coding' },
                { id: 13, mapel: 'Bahasa Asing (Mandarin, Jepang, Jerman, dll)', judul: 'Bahasa Asing (Mandarin, Jepang, Jerman, dll)' },
                { id: 14, mapel: 'Tematik (gabungan beberapa mapel)', judul: 'Tematik (gabungan beberapa mapel)' },
            ]);

         }else if (bidang === 'Persiapan Ujian & Tes Khusus'){

             setDataMapel([
                { id: 15, mapel: 'UTBK/SNBT (TPS, TKA Saintek/Soshum)', judul: 'UTBK/SNBT (TPS, TKA Saintek/Soshum)' },
                { id: 16, mapel: 'Ujian Sekolah & Ujian Nasional', judul: 'Ujian Sekolah & Ujian Nasional' },
                { id: 17, mapel: 'TOEFL / IELTS / TOEIC', judul: 'TOEFL / IELTS / TOEIC' },
                { id: 18, mapel: 'Tes Masuk Sekolah Favorit (SMP/SMA)', judul: 'Tes Masuk Sekolah Favorit (SMP/SMA)' },
                { id: 19, mapel: 'Olimpiade Sains (OSN)', judul: 'Olimpiade Sains (OSN)' },
                { id: 20, mapel: 'SBMPTN, SIMAK UI, UM UGM, dll', judul: 'SBMPTN, SIMAK UI, UM UGM, dll' },
                { id: 21, mapel: 'Tes CPNS/BUMN/Kedinasan', judul: 'Tes CPNS/BUMN/Kedinasan' },
                { id: 22, mapel: 'Tes TNI/Polri', judul: 'Tes TNI/Polri' },
            ]);

         }else if (bidang === 'Keterampilan & Mapel Non-Akademik') {

            setDataMapel([
                { id: 23, mapel: 'Seni Musik', judul: 'Seni Musik' },
                { id: 24, mapel: 'Seni Rupa', judul: 'Seni Rupa' },
                { id: 25, mapel: 'Olahraga', judul: 'Olahraga' },
                { id: 26, mapel: 'Keterampilan Komputer', judul: 'Keterampilan Komputer' },
                { id: 27, mapel: 'Bahasa Asing Praktis', judul: 'Bahasa Asing Praktis' },
            ]);

         }else if (bidang === 'Pendekatan Belajar Khusus') {

            setDataMapel([
                { id: 28, mapel: 'Review PR dan tugas sekolah', judul: 'Review PR dan tugas sekolah' },
                { id: 29, mapel: 'Penguatan konsep dasar', judul: 'Penguatan konsep dasar' },
                { id: 30, mapel: 'Latihan soal bertingkat (mudah → sulit)', judul: 'Latihan soal bertingkat (mudah → sulit)' },
                { id: 31, mapel: 'Strategi belajar & manajemen waktu', judul: 'Strategi belajar & manajemen waktu' },
                { id: 32, mapel: 'Pendampingan anak berkebutuhan khusus', judul: 'Pendampingan anak berkebutuhan khusus' },
            ]);
         } else if (bidang === 'Lainnya') {
            setDataMapel([
                { id: 33, mapel: 'Lainnya', judul: 'Lainnya' },
            ]);
         } else {
            setDataMapel([]);
         }


    }, [bidang]);


    return {datamapel};
}