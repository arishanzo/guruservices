import { useState, useEffect } from "react";
import { getProvinsi, getKabupaten, getKecamatan, getKelurahan } from "../lib/services/wilayahService";

export const useWilayah = () => {

  const [provinsi, setProvinsi] = useState("");
  const [listProvinsi, setListProvinsi] = useState([]);
  
  const [kabupaten, setKabupaten] = useState("");
  const [listKabupaten, setListKabupaten] = useState([]);
  
  const [kecamatan, setKecamatan] = useState("");
  const [listKecamatan, setListKecamatan] = useState([]);
  
  const [kelurahan, setKelurahan] = useState("");
  const [listKelurahan, setListKelurahan] = useState([]);

  // Ambil Provinsi
  useEffect(() => {
    getProvinsi()
      .then(setListProvinsi)
      .catch((error) => console.error("Error fetching provinsi:", error));
  }, []);

  // Ambil Kabupaten dengan debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (provinsi) {
        getKabupaten(provinsi)
          .then(setListKabupaten)
          .catch((error) => console.error("Error fetching kabupaten:", error));
      } else {
        setListKabupaten([]);
        setKabupaten("");
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [provinsi]);

  // Ambil Kecamatan dengan debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (kabupaten) {
        getKecamatan(kabupaten)
          .then(setListKecamatan)
          .catch((error) => console.error("Error fetching kecamatan:", error));
      } else {
        setListKecamatan([]);
        setKecamatan("");
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [kabupaten]);

  // Ambil Kelurahan dengan debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (kecamatan) {
        getKelurahan(kecamatan)
          .then(setListKelurahan)
          .catch((error) => console.error("Error fetching kelurahan:", error));
      } else {
        setListKelurahan([]);
        setKelurahan("");
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [kecamatan]);

  return {
    provinsi, setProvinsi, listProvinsi,
    kabupaten, setKabupaten, listKabupaten,
    kecamatan, setKecamatan, listKecamatan,
    kelurahan, setKelurahan, listKelurahan,
  };
}
