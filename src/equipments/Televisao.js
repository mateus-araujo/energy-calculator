import React, { Component, Fragment } from 'react'
import {
  Button, Col,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup, Input, Label,
} from 'reactstrap'

import Result from './Result'
import api from '../services/api'

class Televisao extends Component {
  state = {
    tempo_uso: 6,
    potencia: 1000,
    procel: ['A', 'B', 'C', 'D', 'E'],
    selectedProcel: '',
    dropdownProcel: false,
    aparelhos: [
      { descricao: 'TV LED 32', potencia: 95 },
      { descricao: 'TV LED 46', potencia: 165 },
      { descricao: 'TV LED 55', potencia: 225 },
      { descricao: 'TV LCD 22', potencia: 56 },
      { descricao: 'TV LCD 32', potencia: 122 },
      { descricao: 'TV LCD 37', potencia: 140 },
      { descricao: 'TV LCD 42', potencia: 210 },
      { descricao: 'TV PLASMA 42', potencia: 280 },
      { descricao: 'TV PLASMA 50', potencia: 457 },
      { descricao: 'TV TUBO 14', potencia: 55 },
      { descricao: 'TV TUBO 20', potencia: 71 },
      { descricao: 'TV TUBO 21', potencia: 73 },
      { descricao: 'TV TUBO 29', potencia: 95 },
    ],
    selectedAparelho: '',
    dropdownAparelhos: false,
    calcular: false,
    resultadoPorDia: '',
    resultadoPorSemana: '',
    resultadoPorMes: '',
    tarifa: 0.304445
  }

  constructor(props) {
    super(props)

    this.state.selectedProcel = this.state.procel[0]
    this.state.selectedAparelho = this.state.aparelhos[0].descricao
    this.state.potencia = this.state.aparelhos[0].potencia
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
    const { selectedAparelho, selectedProcel, tempo_uso, potencia, tarifa, resultadoPorMes } = this.state

    await api.post('/search', {
      equip: 'Televisão',
      equipModel: selectedAparelho,
      procelSeal: selectedProcel,
      useTime: tempo_uso,
      wattsPower: potencia,
      tax: tarifa,
      costPerMonth: resultadoPorMes
    })
      .then(response => console.log(response.data))
  }

  onBack() {
    window.location.reload()
  }

  render() {
    return (
      <Fragment>
        {!this.state.calcular ?
          <div style={{ fontWeight: 'bold' }}>Selecionado: Televisão</div>
          : null
        }

        {!this.state.calcular ?
          <Form style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
            <FormGroup row>
              <Label sm="7" xs="7">Aparelhos sugeridos:</Label>
              <Col sm="5" xs="5">
                <Dropdown
                  isOpen={this.state.dropdownAparelhos}
                  toggle={() => this.setState({ dropdownAparelhos: !this.state.dropdownAparelhos })}
                >
                  <DropdownToggle color="info" caret style={{ inlineSize: 150 }}>
                    {this.state.selectedAparelho}
                  </DropdownToggle>
                  <DropdownMenu>
                    {this.state.aparelhos.map(aparelho =>
                      <DropdownItem
                        key={aparelho.descricao}
                        onClick={() => this.setState({
                          selectedAparelho: aparelho.descricao,
                          potencia: aparelho.potencia
                        })}
                      >
                        {aparelho.descricao}
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm="7" xs="7">Tempo de uso (h): </Label>
              <Col sm="5" xs="5">
                <Input
                  type="number"
                  onChange={e => this.setState({ tempo_uso: e.target.value })}
                  value={this.state.tempo_uso}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm="7" xs="7">Potência em W (watts): </Label>
              <Col sm="5" xs="5">
                <Input
                  type="number"
                  onChange={e => this.setState({ potencia: e.target.value })}
                  value={this.state.potencia}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm="7" xs="7">Selo Procel: </Label>
              <Col sm="5" xs="5">
                <Dropdown
                  isOpen={this.state.dropdownProcel}
                  toggle={() => this.setState({ dropdownProcel: !this.state.dropdownProcel })}
                >
                  <DropdownToggle color="info" caret style={{ inlineSize: 150 }}>
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

            <FormGroup>
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
        <Button color="#FFF" onClick={this.onBack.bind(this)}>Voltar</Button>
      </Fragment>
    )
  }
}

export default Televisao
