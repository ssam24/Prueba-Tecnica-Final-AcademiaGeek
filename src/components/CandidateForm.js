import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import TablaRepositorio from './TablaRepositorio'
import Browser from './Browser'
import axios from 'axios'

export default class CandidateForm extends Component {
  constructor (args) {
    super(args)
    this.state = {
      url: 'https://api.github.com/users/',
      nombre: "",
      apellido: "",
      cedula: "",
      fecha: "",
      email: "",
      usuario: "",
      mensaje: "",
     respuesta: [],
     repositoriosFilter: []
    }
    this.onUpdate = this.onUpdate.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
      
    })
  }

  save(e){
    e.preventDefault(); 
    
    
    this.setState({
      mensaje: "Guardado correctamente",
     
    })
    const {mensaje, url,repositoriosFilter, ...infocandidato} = this.state
    localStorage.setItem('formulario-candidato', JSON.stringify(infocandidato));
    this.onUpdate()
  }

  async onUpdate () {
    try {
      const res = await axios.get(`${this.state.url}${this.state.usuario}/repos`)
      console.log(res)
      if (Array.isArray(res.data)) {
        this.setState({ respuesta: res.data, 
          repositoriosFilter: res.data })
      } else {
        this.setState({ respuesta: [res.data], repositoriosFilter: [res.data]})
        console.log(res.data)}
    } catch (error) {
      console.log(error)
    }
    
  } 

  onSearch (e) {
    const searchRepositorio = e.target.value
    const repositoriosFilter = this.state.respuesta.filter((repo) => {
      return repo.name.toLowerCase().search(searchRepositorio.toLowerCase()) !== -1
    })
    this.setState({ repositoriosFilter: repositoriosFilter })
  }

    render() {
      const {mensaje, url, respuesta,repositoriosFilter, ...infocandidato} = this.state
        return (
          <div className="form">
              <h3>Ingrese la información del candidato a evaluar</h3>
        <p>{JSON.stringify(infocandidato)}</p>
            <Form className="formulario-candidato">
              <Form.Group
              name="nombre"
              value={this.state.nombre} onChange={this.onChange.bind(this)} id="nombre">
                <Form.Label htmlFor="nombre">Nombre del canditato</Form.Label>
                <Form.Control name="nombre" className="control" type="text" placeholder="Nombre del candidato" required/>
              </Form.Group>
              <Form.Group 
              name="apellido"
              value={this.state.apellido} onChange={this.onChange.bind(this)}  controlId="formBasicLastName">
                <Form.Label>Apellido del canditato</Form.Label>
                <Form.Control name="apellido" className="control" type="text" placeholder="Apellido del candidato" required/>
              </Form.Group>
              <Form.Group name="cedula"
              value={this.state.cedula} onChange={this.onChange.bind(this)}  
              controlId="formBasicLasID">
                <Form.Label>Cedula del candidato</Form.Label>
                <Form.Control name="cedula" className="control" type="id" placeholder="Cedula del candidato" required/>
              </Form.Group>
              <Form.Group name="fecha"
              value={this.state.fecha} onChange={this.onChange.bind(this)} controlId="formBasicDate">
                <Form.Label>Fecha de nacimiento del candidato</Form.Label>
                <Form.Control name="fecha" className="control" type="date" placeholder="Fecha de nacimiento del candidato" required/>
              </Form.Group>
              <Form.Group name="email"
              value={this.state.email} onChange={this.onChange.bind(this)}  controlId="formBasicEmail">
                <Form.Label>Email del candidato</Form.Label>
                <Form.Control name="email" className="control" type="email" placeholder="Email del candidato" required/>
              </Form.Group>
              <Form.Group name="usuario"
              value={this.state.usuario} onChange={this.onChange.bind(this)}  controlId="formBasicLastUsser">
                <Form.Label>Usuario GitHub del canditato</Form.Label>
                <Form.Control name="usuario" className="control" type="text" placeholder="Usuario Github del candidato" required/>
              </Form.Group>
              <Button onClick={this.save.bind(this)} variant="primary" type="submit" >
                Enviar
              </Button>
              <span style={{color: 'green'}}>{this.state.mensaje}</span>
            </Form>
          <Browser onSearch={this.onSearch}></Browser>
        <TablaRepositorio respuesta={this.state.repositoriosFilter}></TablaRepositorio>
          </div>
           
        );
    }
}
