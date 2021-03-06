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
import OtherEquip from './equipments/OtherEquip'
import NotFound from './equipments/NotFound'

import api from './services/api'
import './App.css'

class App extends Component {
  state = {
    equipments: ['Ar condicionado', 'Geladeira', 'Televisão', 'Outro equipamento'],
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
  }

  createAccessWithoutCoords = async () => {
    await api.post('/access')
  }

  async onClickEquipment(equipment) {
    this.setState({ selectedEquip: equipment })

    await api.post('/equip_click', {
      equip: equipment
    })
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen })
  }

  toogleComecar() {
    this.setState({ comecar: !this.state.comecar })
  }

  renderEquipment(equip) {
    switch (equip) {
      case 'Ar condicionado':
        return <ArCondicionado comecar={this.toogleComecar.bind(this)} />
      case 'Geladeira':
        return <Geladeira comecar={this.toogleComecar.bind(this)} />
      case 'Televisão':
        return <Televisao comecar={this.toogleComecar.bind(this)} />
      case 'Outro equipamento':
        return <OtherEquip comecar={this.toogleComecar.bind(this)} />
      default:
        return <NotFound comecar={this.toogleComecar.bind(this)} />
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-header">
          <Card style={{
            width: window.innerHeight > window.innerWidth ? '90%' : '30%',
            color: '#333'
          }}>
            <CardBody>
              {!this.state.comecar ?
                <Form>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label style={{ marginBottom: 30, fontWeight: 'bold' }}>Escolha o equipamento: </Label>
                    <Col>
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown.bind(this)}>
                        <DropdownToggle caret color="info" style={{ inlineSize: 180 }}>
                          {this.state.selectedEquip}
                        </DropdownToggle>
                        <DropdownMenu>
                          {this.state.equipments.map(equipment =>
                            <DropdownItem
                              key={equipment}
                              onClick={() => this.onClickEquipment(equipment)}
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
                : this.renderEquipment(this.state.selectedEquip)
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default App
