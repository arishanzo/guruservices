
import { getFetchCache } from "../../fetchCahce/getFetchCache";
import axiosClient from "../../axios";

export const getSaldoMasuk = async () => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/saldomasuk`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}