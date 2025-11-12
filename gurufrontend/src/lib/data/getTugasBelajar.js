
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getTugasBelajar = async (idguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/tugasbelajar/${idguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}