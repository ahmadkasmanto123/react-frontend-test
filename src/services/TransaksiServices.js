import axios from "axios";

const TRANSAKSI_BASE_REST_API_URL = "http://localhost:8080/transaksi";

class TransaksiServices {
  getAllTransaksi() {
    return axios.get(TRANSAKSI_BASE_REST_API_URL);
  }

  getTransaksiById(transaksi_id) {
    return axios.get(TRANSAKSI_BASE_REST_API_URL + "/" + transaksi_id);
  }
  createTransaksiBaru(transaksi) {
    return axios.post(TRANSAKSI_BASE_REST_API_URL, transaksi);
  }

  getTransaksiAnggota(customer_id) {
    return axios.get(TRANSAKSI_BASE_REST_API_URL + "/" + customer_id);
  }

  deleteTransaksi(transaksi_id) {
    return axios.delete(TRANSAKSI_BASE_REST_API_URL + "/" + transaksi_id);
  }
}

export default new TransaksiServices();
