import axiosClient  from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";

export const getNotifications = async () => {

    try {
     const respone = await  getFetchCache (() => axiosClient.get(`/api/notifications`) );
     return respone.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}