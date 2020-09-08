import React, { useState, useEffect } from "react";
import CargoDataService from "../services/CargoService";
import { Link } from "react-router-dom";

const CargoList = () => {
  const [cargo, setCargo] = useState([]);
  const [currentCargo, setCurrentCargo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchDesc, setSearchDesc] = useState("");

  useEffect(() => {
    retrieveCargo();
  }, []);

  const onChangeSearchDesc = e => {
    const searchDesc = e.target.value;
    setSearchDesc(searchDesc);
  };

  const retrieveCargo = () => {
    CargoDataService.getAll()
      .then(response => {
        setCargo(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCargo();
    setCurrentCargo(null);
    setCurrentIndex(-1);
  };

  const setActiveCargo = (cargo, index) => {
    setCurrentCargo(cargo);
    setCurrentIndex(index);
  };

  const removeAllCargo = () => {
    CargoDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByDescription = () => {
    CargoDataService.findByDescription(searchDesc)
      .then(response => {
        setCargo(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite um cargo..."
            value={searchDesc}
            onChange={onChangeSearchDesc}
          />
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDescription}
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h5>Lista de Cargos:</h5>

        <ul className="list-group">
          {cargo &&
            cargo.map((carg, index) => (
              <li
                className={"list-group-item"}
                onClick={() => setActiveCargo(carg, index)}
                key={index}
              >
                {carg.descricao}
              </li>
            ))}
        </ul>

        <button
          className="btn btn-danger mt-2"
          onClick={removeAllCargo}
        >
          Remover todos
        </button>
      </div>
      <div className="col-md-6">
        {currentCargo ? (
          <div>
            <h4>Cargo</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentCargo.id}
            </div>
            <div>
              <label>
                <strong>Descrição:</strong>
              </label>{" "}
              {currentCargo.descricao}
            </div>
           
            <Link
              to={"/cargo/" + currentCargo.id}
              className="btn btn-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor, clique em um Cargo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CargoList;
