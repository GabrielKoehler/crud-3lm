import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddCargo from "./components/AddCargo";
import Cargo from "./components/Cargo";
import CargoList from "./components/CargoList";
import AddFuncionario from "./components/AddFuncionario";
import Funcionario from "./components/Funcionario";
import FuncionarioList from "./components/FuncionarioList";

function App() {
  return (
    <Router>
      <div>

        <nav className="navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav collapse navbar-collapse">
            
            <li className="nav-item ">
              <Link to={"/cargo"} className="nav-link">
                Cargos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/cargo/new"} className="nav-link">
                Adicionar Cargo
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/funcionario"} className="nav-link">
                Funcionários
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/funcionario/new"} className="nav-link">
                Adicionar Funcionário
              </Link>
            </li>

          </div>
        </nav>

        <div className="container mt-3">

          <Switch>
            <Route exact path="/cargo" component={CargoList} />
            <Route exact path="/cargo/new" component={AddCargo} />
            <Route exact path="/cargo/:id" component={Cargo} />
            <Route exact path="/funcionario" component={FuncionarioList} />
            <Route exact path="/funcionario/new" component={AddFuncionario} />
            <Route exact path="/funcionario/:id" component={Funcionario} />
          </Switch>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
