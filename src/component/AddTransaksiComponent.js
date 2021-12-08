import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import AnggotaServices from "../services/AnggotaServices";
import TransaksiServices from "../services/TransaksiServices";

const AddTransaksiComponent = () => {
  const [transaction_type_id, setTypeId] = useState("");
  const [transaction_amount, setAmount] = useState("");
  const [customer_id, setCustomerId] = useState("");
  const [transaction_date, setTransaksiDate] = useState("0");
  const [optAngota, setOptAnggota] = useState([]);

  const history = useHistory();

  const getAllAnggota = () => {
    AnggotaServices.getAllAnggota()
      .then((responseAngota) => {
        const newAnggota = [
          {
            customer_id: "0",
            customer_name: "---",
          },
        ];
        newAnggota.push(...responseAngota.data);
        setOptAnggota(newAnggota);
        console.log(newAnggota);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveTransaksi = (e) => {
    e.preventDefault();

    const transaksi = {
      transaction_type_id,
      transaction_amount,
      customer_id,
      transaction_date,
    };
    console.log(transaksi);

    TransaksiServices.createTransaksiBaru(transaksi)
      .then((response) => {
        console.log(response.data);
        history.push("/list-transaksi");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllAnggota();
  }, []);

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Tambah Transaksi</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Tipe Transaksi</label>
                  <br />
                  <select
                    className="custom-select"
                    onChange={(e) => setTypeId(e.target.value)}
                  >
                    <option value="0">---</option>
                    <option value="1">Menyerahkan</option>
                    <option value="2">Mengambil</option>
                    <option value="3">Meminjam</option>
                    <option value="4">Mengembalikan</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Pilih Nama Anggota</label>
                  <br />
                  <select
                    onChange={(e) => setCustomerId(e.target.value) }
                  >
                    {optAngota.map((optAngota) => (
                      <option
                        key={optAngota.customer_id}
                        value={optAngota.customer_id}
                      >
                        {optAngota.customer_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Jumlah Dana</label>
                  <input
                    type="number"
                    placeholder="Masukkan Nominal Dana"
                    name="transaction_amount"
                    className="form-control"
                    value={transaction_amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Input Tanggal</label>
                  <input
                    type="date"
                    placeholder="Pilih Tanggal Transaksi"
                    name="transaction_date"
                    className="form-control"
                    value={transaction_date}
                    onChange={(e) => setTransaksiDate(e.target.value)}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveTransaksi(e)}
                >
                  {" "}
                  Tambah
                </button>
                <Link to="/list-transaksi" className="btn btn-danger">
                  Batal
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaksiComponent;
