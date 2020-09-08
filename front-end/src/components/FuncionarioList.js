import React, { useState, useEffect } from "react";
import FuncionarioDataService from "../services/FuncionarioService";
import { Link } from "react-router-dom";

const FuncionarioList = () => {
  const [funcionario, setFuncionario] = useState([]);
  const [currentFuncionario, setCurrentFuncionario] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchNome, setSearchNome] = useState("");


  useEffect(() => {
    retrieveFuncionario();
  }, []);

  
  const onChangeSearchNome = e => {
    const searchNome = e.target.value;
    setSearchNome(searchNome);
  };

  const retrieveFuncionario = () => {
    FuncionarioDataService.getAll()
      .then(response => {
        setFuncionario(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveFuncionario();
    setCurrentFuncionario(null);
    setCurrentIndex(-1);
  };

  const setActiveFuncionario = (funcionario, index) => {
    setCurrentFuncionario(funcionario);
    setCurrentIndex(index);
  };

  const removeAllFuncionario = () => {
    FuncionarioDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    FuncionarioDataService.findByName(searchNome)
      .then(response => {
        setFuncionario(response.data);
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
            placeholder="Digite o nome do funcionário..."
            value={searchNome}
            onChange={onChangeSearchNome}
          />
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h5>Lista de Funcionários:</h5>

        <ul className="list-group">
          {funcionario &&
            funcionario.map((funcionario, index) => (
              <li
                className={"list-group-item"}
                onClick={() => setActiveFuncionario(funcionario, index)}
                key={index}
              >
                {funcionario.nome + " " + funcionario.sobrenome}
              </li>
            ))}
        </ul>

        <button
          className="btn btn-danger mt-2"
          onClick={removeAllFuncionario}
        >
          Remover todos
        </button>
      </div>
      <div className="col-md-6">
        {currentFuncionario ? (
          <div>
            <h4>Funcionário:</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentFuncionario.id}
            </div>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentFuncionario.nome}
            </div>
            <div>
              <label>
                <strong>Sobrenome:</strong>
              </label>{" "}
              {currentFuncionario.sobrenome}
            </div>
            <div>
              <label>
                <strong>Salario:</strong>
              </label>{" "}
              R$: {currentFuncionario.salario}
            </div>
            <Link
              to={"/funcionario/" + currentFuncionario.id}
              className="btn btn-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
            <div>
              <br />
              <p>Por favor, clique em um Funcionário.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default FuncionarioList;
