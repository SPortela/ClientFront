import React, { useState, useEffect, Component } from "react";
import Select from "react-select";
import axios from "axios";

function FormClient(props) {
  const urlApi = "https://localhost:5001/api/clients";
  const dataGet = props;
  const [data, setData] = useState({ dataGet });
  const options = [
    { value: "C", label: "Cédula" },
    { value: "N", label: "Número Nit" },
    { value: "E", label: "Cédula de Extrangería" },
  ];
  const [putClient, setPutClient] = useState({
    identification: 0,
    identificationType: "",
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    email: "",
  });
  const putClientPetition = async () => {
    await axios
      .put(urlApi, putClient)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPutClient({ ...putClient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putClientPetition();
  };

  useEffect(() => {
    console.log(dataGet);
  }, []);

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label>Digite el Numero Nit a Consultar</label>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="identification"></label>
          <input
            className="form-control form-control-md"
            type="number"
            name="identification"
            id="identification"
            value={props.identification}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="identificationType"></label>
          <Select
            className="form-control form-control-md"
            options={options}
            name="identificationType"
          />
        </div>
        <br />
        {props.identificationType == "N" ? (
          <div className="form-group">
            <label htmlFor="companyName"></label>
            <input
              className="form-control form-control-md"
              type="text"
              name="companyName"
            id="companyName"
              value={props.companyName}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstName"></label>
              <input
                className="form-control form-control-md"
                type="text"
                name="firstName"
                id="firstName"
                value={props.firstName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="SecondName"></label>
              <input
                className="form-control form-control-md"
                type="text"
                name="SecondName"
                id="SecondName"
                value={props.SecondName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="firstLastName"></label>
              <input
                className="form-control form-control-md"
                type="number"
                name="firstLastName"
                id="firstLastName"
                value={props.firstLastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="secondLastName"></label>
              <input
                className="form-control form-control-md"
                type="number"
                name="secondLastName"
                id="secondLastName"
                value={props.secondLastName}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        )}
        <br />
        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            className="form-control form-control-md"
            type="text"
            name="email"
            id="email"
            value={props.email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />
        <button className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default FormClient;
