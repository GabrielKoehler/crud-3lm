import React, { useState, useEffect } from "react";
import FuncionarioDataService from "../services/FuncionarioService";
import CargoDataService from "../services/CargoService";
import Calendar from "react-calendar";

const AddFuncionario = () => {

    const initialFuncionarioState = {
        id: "",
        nome: "",
        sobrenome: "",
        dataNascimento: new Date(),
        salario: "",
        cargoId: null,
    };

    const [date, setDate] = useState(new Date());

    const onChange = date => {
        setDate(date);
    };

    const [funcionario, setFuncionario] = useState(initialFuncionarioState);
    const [submitted, setSubmitted] = useState(false);
    const [cargo, setCargo] = useState([]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFuncionario({ ...funcionario, [name]: value });
    };

    const saveFuncionario = () => {
        var data = {
            nome: funcionario.nome,
            sobrenome: funcionario.sobrenome,
            dataNascimento: date,
            salario: funcionario.salario,
            cargoId: funcionario.cargoId
        };

        FuncionarioDataService.create(data)
            .then(response => {
                setFuncionario({
                    nome: response.data.nome,
                    sobrenome: response.data.sobrenome,
                    dataNascimento: response.data.dataNascimento,
                    salario: response.data.salario,
                    cargoId: response.data.cargoId
                });
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newFuncionario = () => {
        setFuncionario(initialFuncionarioState);
        setSubmitted(false);
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

    useEffect(() => {
        retrieveCargo();
    }, []);

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Funcionario criado com sucesso!</h4>
                    <button className="btn btn-success" onClick={newFuncionario}>
                        Novo funcionário
          </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={funcionario.nome}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="sobrenome">Sobrenome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sobrenome"
                                name="sobrenome"
                                value={funcionario.sobrenome}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="nascimento">Data de Nascimento</label>

                            <Calendar onChange={onChange} value={date} />

                            <label htmlFor="salario">Salario</label>
                            <input
                                type="number"
                                className="form-control"
                                id="salario"
                                name="salario"
                                value={funcionario.salario}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="cargo">Cargo</label>
                            <select name="cargoId" onClick={handleInputChange} className="form-control">
                                {cargo &&
                                    cargo.map((cargo, index) => (
                                        <option key={index} value={cargo.id}>{cargo.descricao} </option>
                                    ))}
                            </select>


                        </div>

                        <button onClick={saveFuncionario} className="btn btn-success">
                            Criar
          </button>
                    </div>
                )}
        </div>
    );
};

export default AddFuncionario;
