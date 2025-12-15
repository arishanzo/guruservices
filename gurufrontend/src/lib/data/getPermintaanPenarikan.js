
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getPermintaanPenarikan = async (idprofilguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/permintaanpenarikan/${idprofilguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}