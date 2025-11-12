
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getNilaiTugas = async (idguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/nilaitugas/${idguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}