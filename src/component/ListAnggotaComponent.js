import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnggotaServices from "../services/AnggotaServices";

const ListAnggotaComponent = () => {
  const [anggota, setAnggota] = useState([]);

  useEffect(() => {
    getAllAnggota();
  }, []);

  const getAllAnggota = () => {
    AnggotaServices.getAllAnggota()
      .then((response) => {
        setAnggota(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAnggota = (customer_id) => {
    AnggotaServices.deleteAnggota(customer_id)
      .then((response) => {
        getAllAnggota();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h2 className="text-center">List Anggota</h2>
      <Link to="/add-anggota" className="btn btn-primary mb-2">
        {" "}
        Tambah Anggota
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th>No Anggota</th>
          <th>Nama Angota</th>
          <th>Tanggal Lahir</th>
          <th>Alamat</th>
          <th>Balance</th>
        </thead>
        <tbody>
          {anggota.map((anggota) => (
            <tr key={anggota.customer_id}>
              <td>{anggota.customer_id}</td>
              <td>{anggota.customer_name}</td>
              <td>{anggota.customer_dob}</td>
              <td>{anggota.customer_address}</td>
              <td>{anggota.customer_balance}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/update-anggota/${anggota.customer_id}`}
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAnggota(anggota.customer_id)}
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

export default ListAnggotaComponent;
