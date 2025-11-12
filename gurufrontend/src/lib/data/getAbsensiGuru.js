
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getAbsensiGuru = async (idguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/absensi/${idguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}