import axios from "axios";

const ANGGOTA_BASE_REST_API_URL = "http://localhost:8080/anggota";

class AnggotaServices {
  getAllAnggota() {
    return axios.get(ANGGOTA_BASE_REST_API_URL);
  }

  createAnggotaBaru(anggota) {
    return axios.post(ANGGOTA_BASE_REST_API_URL, anggota);
  }

  getAnggotaById(customer_id) {
    return axios.get(ANGGOTA_BASE_REST_API_URL + "/" + customer_id);
  }

  updateAnggota(customer_id, anggota) {
    return axios.put(ANGGOTA_BASE_REST_API_URL + "/" + customer_id, anggota);
  }

  deleteAnggota(customer_id) {
    return axios.delete(ANGGOTA_BASE_REST_API_URL + "/" + customer_id);
  }
}

export default new AnggotaServices();
