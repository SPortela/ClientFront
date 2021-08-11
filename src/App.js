import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import FormClient from "./Pages/FormClient";

function App() {
  const urlApi = "https://localhost:5001/api/clients";
  const [data, setData] = useState({
    identification:0,
    identificationType: "",
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    email: ""
  });
  const [modalMessage, setModalMessage] = useState(false);
  const [findClient, setFindClient] = useState({
    identification: 0,
  });

  // const peticionGet = async () => {
  //   await axios
  //     .get(urlApi)
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const getClient = async () => {
    await axios
      .get(urlApi + "/" + findClient.identification)
      .then((response) => {
        setData(response.data);
        if(response.data.identification == undefined){
          manageModal();
        }
      })
      .catch((error) => {
        console.log(error);
        manageModal();
      });
  };

  const manageModal = () => {
    setModalMessage(!modalMessage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFindClient({ ...findClient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getClient();
  };

  useEffect(() => {
    // peticionGet();
  }, []);

  return (
    <div className="App">
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
          <span className="fs-4">Clients</span>
        </div>
      </header>
      <header></header>
      <section className="container container-md">
        {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th>Identificación</th>
              <th>CompanyName</th>
              <th>FirstName</th>
              <th>SecondName</th>
              <th>FirstLastName</th>
              <th>SecondLastName</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client) => (
              <tr key={client.identification}>
                <td>{client.identification}</td>
                <td>{client.companyName}</td>
                <td>{client.firstName}</td>
                <td>{client.secondName}</td>
                <td>{client.firstLastName}</td>
                <td>{client.secondLastName}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

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
              value={findClient.identification}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <br />
          <button className="btn btn-danger">Consultar</button>
        </form>
      </section>

      {data.identification > 0 && (
        <FormClient
          identification={data.identification}
          identificationType={data.identification}
          companyName={data.companyName}
          firstName={data.firstName}
          secondName={data.secondName}
          firstLastName={data.firstLastName}
          secondLastName={data.secondLastName}
          email={data.email}
        ></FormClient>
      )}

      <Modal isOpen={modalMessage}>
        <ModalHeader>
          <div className="container">
            <p>Información</p>
          </div>
        </ModalHeader>
        <ModalBody>
        <div className="container">
            <p>No se ha encontrado el cliente registrado</p>
          </div></ModalBody>
        <ModalFooter><button
              className="btn btn-dark ml-auto"
              onClick={() => manageModal()}
            >Cerrar</button></ModalFooter>
      </Modal>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-12 align-items-center">
          <span className="text-muted">© 2021</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
