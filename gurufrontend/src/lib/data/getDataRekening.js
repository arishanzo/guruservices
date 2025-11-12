
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getDataRekening = async (idguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/getdatarekening/${idguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}