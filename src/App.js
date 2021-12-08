import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HeaderComponent from "./component/HeaderComponent";
import ListAnggotaComponent from "./component/ListAnggotaComponent";
import AddAnggotaComponent from "./component/AddAnggotaComponent";
import ListTransactionComponent from "./component/ListTransactionComponent";
import AddTransaksiComponent from "./component/AddTransaksiComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <br />
        <div>
          <Link to="/list-anggota" className="btn btn-primary mb-2">
            {" "}
            List Anggota
          </Link>
          <br />
          <Link to="/list-transaksi" className="btn btn-primary mb-2">
            {" "}
            List Transaksi
          </Link>
        </div>
        <div className="container">
          <Switch>
            <Route
              exact
              path="/list-anggota"
              component={ListAnggotaComponent}
            ></Route>
            <Route
              path="/list-transaksi"
              component={ListTransactionComponent}
            ></Route>
            <Route path="/add-anggota" component={AddAnggotaComponent}></Route>
            <Route path="/update-anggota/:customer_id" component={AddAnggotaComponent}></Route>
            <Route
              path="/add-transaksi"
              component={AddTransaksiComponent}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
