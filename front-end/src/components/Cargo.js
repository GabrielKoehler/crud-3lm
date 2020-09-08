import React, { useState, useEffect } from "react";
import CargoDataService from "../services/CargoService";

const Cargo = props => {

    const initialCargoState = {
        id : "",
        descricao: "",
    };
    const [cargo, setCargo] = useState(initialCargoState);
    const [message, setMessage] = useState("");

    const getCargo = id => {
        CargoDataService.get(id)
            .then(response => {
                setCargo(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCargo(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCargo({ ...cargo, [name]: value });
    };

    const updateCargo = () => {
        CargoDataService.update(cargo.id, cargo)
            .then(response => {
                setMessage("Cargo atualizado com sucesso");
            })
            .catch(e => {
                console.log(cargo.descricao)
                console.log(e);
            });
    };

    const deleteCargo = () => {
        CargoDataService.remove(cargo.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/cargo");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            
                <div className="edit-form">
                    <h4>Cargo</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="descricao">Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descricao"
                                name="descricao"
                                value={cargo.descricao}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="btn btn-danger mr-2" onClick={deleteCargo}>
                        Remover
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateCargo}
                    >
                        Atualizar
          </button>
                    <p>{message}</p>
                </div>
         
        </div>
    );
};

export default Cargo;
