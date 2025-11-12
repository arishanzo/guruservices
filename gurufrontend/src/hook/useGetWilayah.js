import { useState, useEffect } from "react";


export const useGetWilayah = (idwilayah, idkabupaten, idkecamatan, idkelurahan) => {


    
  const [getprovinsi, setProvinsi] = useState("");
  const [getkabupaten, setKabupaten] = useState("");
   const [getkecamatan, setKecamatan] = useState("");
   const [getkelurahan, setKelurahan] = useState("");


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
        if (!response.ok) {
          throw new Error('Gagal memuat data');
        }
        const data = await response.json();
        const provinceData = data.find(item => item.id === idwilayah);
        setProvinsi(provinceData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
    if (idwilayah) {
      fetchProvinsi();
    }
    }, 300);

    return () => clearTimeout(timer);

  }, [idwilayah, setProvinsi]);



    useEffect(() => {
    const fetchKabupaten = async () => {
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${idwilayah}.json`);
        if (!response.ok) {
          throw new Error('Gagal memuat data');
        }
        const datakabupaten = await response.json();
        const kabupatenData = datakabupaten.find(item => item.id === idkabupaten);  
        setKabupaten(kabupatenData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
   
     if (idwilayah) {
      fetchKabupaten();
    }
    }, 300);

    return () => clearTimeout(timer);
    
  }, [idwilayah, idkabupaten, setKabupaten]);




    useEffect(() => {
    const fetchKecamatan = async () => {
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${idkabupaten}.json`);
        if (!response.ok) {
          throw new Error('Gagal memuat data');
        }
        const datakecamatan = await response.json();
        const kecamatanData = datakecamatan.find(item => item.id === idkecamatan);
        setKecamatan(kecamatanData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
    if (idkabupaten) {
      fetchKecamatan();
    }
    }, 300);

    return () => clearTimeout(timer);
    
  }, [idkecamatan, idkabupaten, setKecamatan]);



   useEffect(() => {
    const fetchKelurahan = async () => {
      try {
        const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${idkecamatan}.json`);
        if (!response.ok) {
          throw new Error('Gagal memuat data');
        }
        const datakelurahan = await response.json();
        const kelurahanData = datakelurahan.find(item => item.id === idkelurahan);
        setKelurahan(kelurahanData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
    if (idkecamatan) {
      fetchKelurahan();
    }
    }, 300);

    return () => clearTimeout(timer);
    
  }, [idkecamatan, idkelurahan, setKelurahan]);

  // return nilai dari hook agar komponen bisa pakai
  return { loading, error , getprovinsi, getkabupaten, getkecamatan, getkelurahan};

}