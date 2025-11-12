
import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getDataFileGuru = async (idguru) => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/getfileguru/${idguru}`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}