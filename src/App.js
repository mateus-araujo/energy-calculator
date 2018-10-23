import React, { Component } from 'react'
import {
  Button, Col, Card, CardBody,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup, Label
} from 'reactstrap'

import Header from './components/Header'
import ArCondicionado from './equipments/ArCondicionado'
import Geladeira from './equipments/Geladeira'
import Televisao from './equipments/Televisao'
import NotFound from './equipments/NotFound'

import api from './services/api'
import './App.css'

class App extends Component {
  state = {
    equipments: ['Ar condicionado', 'Geladeira', 'Televisão'],
    selectedEquip: '',
    dropdownOpen: false,
    comecar: false,
    coords: {}
  }

  constructor(props) {
    super(props)

    this.state.selectedEquip = this.state.equipments[0]

    this.getPosition()
  }

  getPosition = () => {
    if ('geolocation' in navigator)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { coords } = position

          console.log(coords)
          this.createAccess(coords)
          // this.setState({ coords })
        }, (error) => {
          this.createAccessWithoutCoords()
          console.log(error)
        }, { enableHighAccuracy: true, maximumAge: 30000, timeout: 30000 }
      )
    else {
      this.createAccessWithoutCoords()
    }
  }

  createAccess = async (coords) => {
    const { accuracy, latitude, longitude } = coords

    await api.post('/access', {
      accuracy, latitude, longitude
    })
      .then(response => console.log(response.data))
  }

  createAccessWithoutCoords = async () => {
    await api.post('/access')
      .then(response => console.log(response.data))
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-header">
          <Card style={{ width: 400, color: '#333' }}>
            <CardBody>
              {!this.state.comecar ?
                <Form>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label style={{ marginBottom: 30, fontWeight: 'bold' }}>Escolha o equipamento: </Label>
                    <Col>
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown.bind(this)}>
                        <DropdownToggle caret color="info" style={{ inlineSize: 150 }}>
                          {this.state.selectedEquip}
                        </DropdownToggle>
                        <DropdownMenu>
                          {this.state.equipments.map(equipment =>
                            <DropdownItem
                              key={equipment}
                              onClick={() => this.setState({ selectedEquip: equipment })}
                            >
                              {equipment}
                            </DropdownItem>
                          )}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Button color="success" onClick={() => this.setState({ comecar: true })}>Começar</Button>
                  </FormGroup>
                </Form>
                : this.state.selectedEquip === 'Geladeira' ?
                  <Geladeira />
                  : this.state.selectedEquip === 'Ar condicionado' ?
                    <ArCondicionado />
                    : this.state.selectedEquip === 'Televisão' ?
                      <Televisao />
                      : <NotFound />
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default App
