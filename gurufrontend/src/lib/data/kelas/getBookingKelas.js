import { serviceClient }  from "../../axios";
import { getFetchCache } from "../../fetchCahce/getFetchCache";

export const getBookingKelas = async (idprofilguru) => {

    try {
     const response = await  getFetchCache (() => serviceClient.getBookingKelasUser(idprofilguru));
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}