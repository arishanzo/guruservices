import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getProfil = async (iduser) => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/profile/${iduser}`) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}