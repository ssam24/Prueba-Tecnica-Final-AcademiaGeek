import React, { Component, Fragment } from "react";
import { Table } from "react-bootstrap";
//import axios from 'axios'

export default class TablaRepositorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://api.github.com/users/",
      lenguaje: "",
      branch: "",
      urlgit: "",
      nombre: "",
      descipcion: "",
    };
  }

  render() {
    console.log(this.props);
    const { respuesta } = this.props;
    return (
      <Fragment>
        <h3>Información de los repositorios del candidato</h3>

        <Table responsive="xl" className="tabla" striped>
          <thead>
            <tr className="titulos">
              <th>Nombre</th>
              <th>Descripción</th>
              <th>URL Git</th>
              <th>Lenguaje</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {respuesta.map((repo) => {
              
               if(repo.private === false) {
                 return (
                <tr style={{border: '1px solid black'}}>
                  <td>{repo.name}</td>
                  <td>{repo.description}</td>
                  <td>{repo.url}</td>
                  <td>{repo.language}</td>
                  <td>{repo.default_branch}</td>
                </tr>
            )} 
              return <></>
            })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
