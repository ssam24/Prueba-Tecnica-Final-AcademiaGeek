import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import PropTypes from 'prop-types'

class Browser extends Component {
  
  render () {
    return (
      <Container id='browser' className="browser-pt" >
        <Row>
          <Col xs={12} className='my-3'>
            <Form inline className='justify-content-center d-flex cont-search' >
              <i className="fas fa-search iconSearch"></i>
              <Form.Control type="text" placeholder='Burcar por nombre del repositorio' className="search" onChange={this.props.onSearch}/>
              <p></p>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

Browser.propTypes = {
  onSearch: PropTypes.func
}

export default Browser