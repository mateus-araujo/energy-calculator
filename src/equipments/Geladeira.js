import React, { Component, Fragment } from 'react'
import {
  Button, Col,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup, Input, Label
} from 'reactstrap'

import Result from './Result'
import api from '../services/api'
import ModalSuggestion from '../components/ModalSuggestion'

const inlineSize = 120

class Geladeira extends Component {
  state = {
    litros: '',
    potencia: 250,
    procel: ['A', 'B', 'C', 'D', 'E', 'Não sei'],
    selectedProcel: '',
    dropdownProcel: false,
    qtdAberturasPorDia: ['1 vez', '2 a 3 vezes', '5 a 8 vezes', '8 a 13 vezes', '13 a 20 vezes', '+ 20 vezes'],
    selectedQtdAberturas: '',
    dropdownQtdAberturas: false,
    calcular: false,
    resultadoPorDia: '',
    resultadoPorSemana: '',
    resultadoPorMes: '',
    tarifa: 0.304445
  }

  constructor(props) {
    super(props)

    this.state.selectedProcel = this.state.procel[0]
    this.state.selectedQtdAberturas = this.state.qtdAberturasPorDia[0]
  }

  async calcular() {
    const { potencia } = this.state
    let resultadoPorDia, resultadoPorSemana, resultadoPorMes

    resultadoPorDia = potencia / 1000 * 24 * this.state.tarifa
    resultadoPorSemana = resultadoPorDia * 7
    resultadoPorMes = resultadoPorDia * 30

    await this.setState({
      resultadoPorDia,
      resultadoPorSemana,
      resultadoPorMes,
      calcular: !this.state.calcular
    })

    this.createSearch()
  }

  createSearch = async () => {
    const { litros, selectedQtdAberturas, selectedProcel, potencia, tarifa, resultadoPorMes } = this.state

    await api.post('/search', {
      equip: 'Geladeira',
      equipModel: 'not_provided',
      capacityLiters: litros,
      refrigeratorOpenTimes: selectedQtdAberturas,
      procelSeal: selectedProcel,
      useTime: 24,
      wattsPower: potencia,
      tax: tarifa,
      costPerMonth: resultadoPorMes
    })
  }

  onBack() {
    this.props.comecar()
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    return (
      <Fragment>
        {!this.state.calcular ?
          <div style={{ fontWeight: 'bold' }}>Selecionado: Geladeira</div>
          : null
        }

        {!this.state.calcular ?
          <Form style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
            <FormGroup row>
              <Label size="sm" sm="7" xs="7">Capacidade em litros: </Label>
              <Col sm="5" xs="5">
                <Input
                  bsSize="sm"
                  style={{ inlineSize }}
                  placeholder="400"
                  type="number"
                  onChange={e => this.setState({ litros: e.target.value })}
                  value={this.state.litros}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="7" xs="7">Potência em W (watts): </Label>
              <Col sm="5" xs="5">
                <Input
                  bsSize="sm"
                  style={{ inlineSize }}
                  type="number"
                  onChange={e => this.setState({ potencia: e.target.value })}
                  value={this.state.potencia}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="7" xs="7">Selo Procel: </Label>
              <Col sm="5" xs="5">
                <Dropdown
                  size="sm"
                  isOpen={this.state.dropdownProcel}
                  toggle={() => this.setState({ dropdownProcel: !this.state.dropdownProcel })}
                >
                  <DropdownToggle color="info" caret style={{ inlineSize }}>
                    {this.state.selectedProcel}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.procel.map(selo =>
                      <DropdownItem
                        key={selo}
                        onClick={() => this.setState({ selectedProcel: selo })}
                      >
                        {selo}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </FormGroup>

            <FormGroup row style={{ alignItems: 'center' }}>
              <Label size="sm" sm="7" xs="7">Quantas vezes você abre e fecha a geladeira durante o dia?</Label>
              <Col sm="5" xs="5">
                <Dropdown
                  size="sm"
                  isOpen={this.state.dropdownQtdAberturas}
                  toggle={() => this.setState({ dropdownQtdAberturas: !this.state.dropdownQtdAberturas })}
                >
                  <DropdownToggle color="info" caret style={{ inlineSize }}>
                    {this.state.selectedQtdAberturas}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.qtdAberturasPorDia.map(qtd =>
                      <DropdownItem
                        key={qtd}
                        onClick={() => this.setState({ selectedQtdAberturas: qtd })}
                      >
                        {qtd}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </FormGroup>

            <FormGroup style={{ marginTop: 30 }}>
              <Button color="success" onClick={this.calcular.bind(this)}>Calcular</Button>
            </FormGroup>
          </Form>
          :
          <Result
            equipamento="Sua geladeira"
            resultadoPorDia={this.state.resultadoPorDia}
            resultadoPorSemana={this.state.resultadoPorSemana}
            resultadoPorMes={this.state.resultadoPorMes}
            tarifa={this.state.tarifa}
          />
        }
        <FormGroup row>
          {this.state.calcular ?
            <Col>
              <Button
                onClick={() => this.toggleModal()}
                color="danger">Enviar sugestão
              </Button>
            </Col>
            : null
          }
          <Col>
            <Button color="#FFF" onClick={this.onBack.bind(this)}>Voltar</Button>
          </Col>
        </FormGroup>

        <ModalSuggestion modal={this.state.modal} toggleModal={this.toggleModal.bind(this)} />
      </Fragment>
    )
  }
}

export default Geladeira
