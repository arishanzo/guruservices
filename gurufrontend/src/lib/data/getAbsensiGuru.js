
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getAbsensiGuru = async (idprofilguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/absensi/${idprofilguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}