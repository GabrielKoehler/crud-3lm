import React, { useState } from "react";
import CargoDataService from "../services/CargoService";


const AddCargo = () => {
    const initialCargoState = {
        descricao: ""
    };

    const [cargo, setCargo] = useState(initialCargoState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCargo({ ...cargo, [name]: value });
    };

    const saveCargo = () => {
        var data = {
            descricao: cargo.descricao
        };

        CargoDataService.create(data)
            .then(response => {
                setCargo({
                    descricao: response.data.descricao,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCargo = () => {
        setCargo(initialCargoState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Cargo criado com sucesso!</h4>
                    <button className="btn btn-success" onClick={newCargo}>
                        Novo cargo
          </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group mt-3">
                            <label htmlFor="descricao">Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={cargo.descricao}
                                onChange={handleInputChange}
                                name="descricao"
                            />
                        </div>

                        <button onClick={saveCargo} className="btn btn-success">
                            Criar
          </button>
                    </div>
                )}
        </div>
    );
};

export default AddCargo;
