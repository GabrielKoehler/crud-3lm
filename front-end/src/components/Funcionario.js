import React, { useState, useEffect } from "react";
import FuncionarioDataService from "../services/FuncionarioService";
import CargoDataService from "../services/CargoService";
import Calendar from "react-calendar";

const Funcionario = props => {

    const initialFuncionarioState = {
        id: "",
        nome: "",
        sobrenome: "",
        dataNascimento: "",
        salario: "",
        cargoId: null,
    };

    const [funcionario, setFuncionario] = useState(initialFuncionarioState);
    const [message, setMessage] = useState("");
    const [date, setDate] = useState(new Date());
    const [cargo, setCargo] = useState([]);


    const getFuncionario = id => {
        FuncionarioDataService.get(id)
            .then(response => {
                setFuncionario(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getFuncionario(props.match.params.id);
        retrieveCargo();
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFuncionario({ ...funcionario, [name]: value });
    };

    const updateFuncionario = () => {
        FuncionarioDataService.update(funcionario.id, funcionario)
            .then(response => {
                setMessage("Dados do funcionário atualizados com sucesso");
            })
            .catch(e => {
                console.info(e);
            });
    };

    const deleteFuncionario = () => {
        FuncionarioDataService.remove(funcionario.id)
            .then(response => {
                props.history.push("/funcionario");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const onChangeDate = date => {
        setDate(date);
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

    return (
        <div>

            <div className="edit-form">
                <form>
                    <div className="form-group">
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
                        </div>

                        <div className="form-group">
                            <label htmlFor="sobrenome">Sobrenome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sobrenome"
                                name="sobrenome"
                                value={funcionario.sobrenome}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="nascimento">Data de Nascimento</label>
                            <Calendar onChange={onChangeDate} value={date} />
                        </div>

                        <div className="form-group">
                        <label htmlFor="salario">Salario</label>
                        <input
                            type="number"
                            className="form-control"
                            id="salario"
                            name="salario"
                            value={funcionario.salario}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="cargo">Cargo</label>
                        <select name="cargoId" onClick={handleInputChange} className="form-control">
                            {cargo &&
                                cargo.map((cargo, index) => (
                                    <option default={cargo.id} key={index} value={cargo.id}>{cargo.descricao} </option>
                                ))}
                        </select>
                        </div>


                    </div>
                </form>

                <button className="btn btn-danger mr-2" onClick={deleteFuncionario}>
                    Remover
                    </button>

                <button
                    type="submit"
                    className="btn btn-success"
                    onClick={updateFuncionario}
                >
                    Atualizar
          </button>
                <p>{message}</p>
            </div>

        </div>
    );
};

export default Funcionario;
