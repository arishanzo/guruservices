import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getPhotoProfilService = async (foto_profil) => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/photos/${encodeURIComponent(foto_profil)}`, { responseType: 'blob' }) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}