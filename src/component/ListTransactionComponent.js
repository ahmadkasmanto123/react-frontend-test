import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnggotaServices from "../services/AnggotaServices";
import TransaksiServices from "../services/TransaksiServices";

const ListTransactionComponent = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [optAngota, setOptAnggota] = useState([]);


  const getAllAnggota = async () => {
    AnggotaServices.getAllAnggota()
      .then((responseAngota) => {
        const newAnggota = [
          {
            customer_id: "0",
            customer_name: "Semua Anggota",
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

  const getAllTransaksi = async () => {
    TransaksiServices.getAllTransaksi()
      .then((response) => {
        setTransaksi(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllTransaksi();
    getAllAnggota();
  }, []);

  const getTransactionById = (customer_id) => {
    if (customer_id === "0") {
      getAllTransaksi();
    } else {
      TransaksiServices.getTransaksiAnggota(customer_id)
        .then((response) => {
          setTransaksi(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteTransaksi = (transaksi_id) => {
    TransaksiServices.deleteTransaksi(transaksi_id)
      .then((response) => {
        getAllTransaksi();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">List Transaksi</h2>
      <Link to="/add-transaksi" className="btn btn-primary mb-2">
        {" "}
        Tambah transaksi
      </Link>
      <label className="form-label"> Cari Transaksi Anggota</label>
      <select
        onChange={(e) => getTransactionById(e.target.value)}
      >
        {optAngota.map((optAngota) => (
          <option key={optAngota.customer_id} value={optAngota.customer_id}>
            {optAngota.customer_name}
          </option>
        ))}
      </select>
      <table className="table table-bordered table-striped">
        <thead>
          <th>No Transaksi</th>
          <th>Nama Anggota</th>
          <th>Tipe Transaksi</th>
          <th>Jumlah Dana</th>
          <th>Tanggal Transaksi</th>
        </thead>
        <tbody>
          {transaksi.map((transaksi) => (
            <tr key={transaksi.transaction_id}>
              <td>{transaksi.transaction_id}</td>
              <td>{transaksi.customer_name}</td>
              <td>{transaksi.transaction_type_name}</td>
              <td>{transaksi.transaction_amount}</td>
              <td>{transaksi.transaction_date}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTransaksi(transaksi.transaction_id)}
                  style={{ marginLeft: "10px" }}
                >
                  {" "}
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTransactionComponent;
