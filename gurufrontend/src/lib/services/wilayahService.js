const API_BASEURL = "https://www.emsifa.com/api-wilayah-indonesia/api";

export const getProvinsi = async () => {
  const response = await fetch(`${API_BASEURL}/provinces.json`);
  return response.json();
};



export const getKabupaten = async (id) => {
  const response = await fetch(`${API_BASEURL}/regencies/${id}.json`);
  return response.json();
};


export const getKecamatan = async (id) => {
  const response = await fetch(`${API_BASEURL}/districts/${id}.json`);
  return response.json();
};


export const getKelurahan = async (id) => {
  const response = await fetch(`${API_BASEURL}/villages/${id}.json`);
  return response.json();
};