import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AnggotaServices from "../services/AnggotaServices";

const AddAnggotaComponent = () => {
  const [customer_name, setName] = useState("");
  const [customer_address, setAddress] = useState("");
  const [customer_dob, setDob] = useState("");
  const [customer_balance, setBalance] = useState("0");
  const { customer_id } = useParams();

  const history = useHistory();

  const saveAnggota = (e) => {
    e.preventDefault();

    const anggota = {
      customer_name,
      customer_address,
      customer_dob,
      customer_balance,
    };

    console.log(anggota);

    if (customer_id) {
      AnggotaServices.updateAnggota(customer_id, anggota)
        .then((response) => {
          console.log(response.data);
          history.push("/list-anggota");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      AnggotaServices.createAnggotaBaru(anggota)
        .then((response) => {
          console.log(response.data);
          history.push("/list-anggota");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    AnggotaServices.getAnggotaById(customer_id)
      .then((response) => {
        setName(response.data.customer_name);
        setAddress(response.data.customer_address);
        setDob(response.data.customer_dob);
        setBalance(response.data.customer_balance);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customer_id]);

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Tambah Anggota</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Nama</label>
                  <input
                    type="text"
                    placeholder="masukkan nama lengkap anda"
                    name="customer_name"
                    className="form-control"
                    value={customer_name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Alamat</label>
                  <input
                    type="text"
                    placeholder="masukkan alamat lengkap anda"
                    name="customer_address"
                    className="form-control"
                    value={customer_address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Tanggal Lahir</label>
                  <input
                    type="date"
                    placeholder="Masukkan Tanggal Lahir Anda"
                    name="customer_dob"
                    className="form-control"
                    value={customer_dob}
                    onChange={(e) => setDob(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Saldo</label>
                  <input
                    type="text"
                    placeholder="Masukkan jumlah saldo"
                    name="customer_balance"
                    className="form-control"
                    value={customer_balance}
                    onChange={(e) => setBalance(e.target.value)}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveAnggota(e)}
                >
                  {" "}
                  Tambah
                </button>
                <Link to="/list-anggota" className="btn btn-danger">
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

export default AddAnggotaComponent;
