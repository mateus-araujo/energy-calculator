import React, { Component, Fragment } from 'react'
import {
  Button, Col,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup, Input, Label,
} from 'reactstrap'

import Result from './Result'
import api from '../services/api'
import ModalSuggestion from '../components/ModalSuggestion'

const inlineSize = 120

class OtherEquip extends Component {
  state = {
    nome: '',
    modelo: '',
    tempo_uso: 6,
    potencia: 100,
    procel: ['A', 'B', 'C', 'D', 'E', 'Não sei'],
    selectedProcel: '',
    dropdownProcel: false,
    calcular: false,
    resultadoPorDia: '',
    resultadoPorSemana: '',
    resultadoPorMes: '',
    tarifa: 0.304445,
    modal: false
  }

  constructor(props) {
    super(props)

    this.state.selectedProcel = this.state.procel[0]
  }

  async calcular() {
    const { potencia, tarifa, tempo_uso } = this.state
    let resultadoPorDia, resultadoPorSemana, resultadoPorMes

    resultadoPorDia = potencia / 1000 * tempo_uso * tarifa
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
    const { nome, modelo, selectedProcel, tempo_uso, potencia, tarifa, resultadoPorMes } = this.state

    await api.post('/search', {
      equip: nome,
      equipModel: modelo === '' ? 'not_provided': modelo,
      procelSeal: selectedProcel,
      useTime: tempo_uso,
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
          <div style={{ fontWeight: 'bold' }}>Selecionado: Outro equipamento</div>
          : null
        }

        {!this.state.calcular ?
          <Form style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
            <FormGroup row>
              <Label size="sm" sm="7" xs="7">Nome: </Label>
              <Col sm="5" xs="5">
                <Input
                  bsSize="sm"
                  style={{ inlineSize }}
                  onChange={e => this.setState({ nome: e.target.value })}
                  value={this.state.nome}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="7" xs="7">Modelo: </Label>
              <Col sm="5" xs="5">
                <Input
                  bsSize="sm"
                  style={{ inlineSize }}
                  placeholder="Opcional"
                  onChange={e => this.setState({ modelo: e.target.value })}
                  value={this.state.modelo}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label size="sm" sm="7" xs="7">Tempo de uso (h): </Label>
              <Col sm="5" xs="5">
                <Input
                  bsSize="sm"
                  style={{ inlineSize }}
                  type="number"
                  onChange={e => this.setState({ tempo_uso: e.target.value })}
                  value={this.state.tempo_uso}
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
                        onClick={() => this.setState({ selectedProcel: selo })}
                      >
                        {selo}
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
            equipamento="Sua televisão"
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

export default OtherEquip
