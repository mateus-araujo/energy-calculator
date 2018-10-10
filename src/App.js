import React, { Component } from 'react'
import {
  Button, Col, Card, CardBody, CardText,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup, Label
} from 'reactstrap'

import Header from './components/Header'
import ArCondicionado from './equipments/ArCondicionado'
import Geladeira from './equipments/Geladeira'
import Televisao from './equipments/Televisao'
import NotFound from './equipments/NotFound'

// import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = {
    equipments: ['Ar condicionado', 'Geladeira', 'Televisão'],
    selectedEquip: '',
    dropdownOpen: false,
    comecar: false
  }

  constructor(props) {
    super(props)

    this.state.selectedEquip = this.state.equipments[0]
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
              <CardText>
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
              </CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default App
