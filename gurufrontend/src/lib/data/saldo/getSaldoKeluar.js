
import axiosClient from "../../axios";
import { getFetchCache } from "../../fetchCahce/getFetchCache";

export const getSaldoKeluar = async () => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/saldokeluar`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}