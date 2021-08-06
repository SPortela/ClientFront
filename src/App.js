import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

function App() {
  const urlApi = "https://localhost:5001/api/clients";
  const [data, setData] = useState([]);
  const [modalMessage, setModalMessage] = useState(false);
  const [findClient, setFindClient] = useState({
    id:0
  });

  const peticionGet = async () => {
    await axios
      .get(urlApi)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClient = async () => {
    await axios
      .get(urlApi + "/" + findClient)
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const peticionPut = async () => {
    await axios
      .put(urlApi, findClient)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const manageModal = () => {
    setModalMessage(!modalMessage);
  };

  const handleChange = (e) => { 
    setFindClient([...findClient.id, e.target]);
  };

  useEffect(() => {
    peticionGet();
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
        <table className="table table-bordered">
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
        </table>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="identification"></label>
            <input
              type="text"
              name="identification"
              id="identification"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={() => getClient()}
            >
              Consultar
            </button>
          </div>
        </div>
      </section>

      <Modal isOpen={modalMessage}>
        <ModalHeader>
          <div className="container">
            <p>Información</p>
            <button
              className="btn btn-dark ml-auto"
              onClick={() => manageModal()}
            ></button>
          </div>
        </ModalHeader>
        <ModalBody>Mensaje al usuario</ModalBody>
      </Modal>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="text-muted">© 2021</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
