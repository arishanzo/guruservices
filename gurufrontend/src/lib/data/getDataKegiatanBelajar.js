
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getDataKegiatanBelajar = async (idguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/kegiatanbelajar/${idguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}