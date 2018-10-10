import React, { Component, Fragment } from 'react'
import {
  Button, Container, Col,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, FormGroup, Input, Label, Row
} from 'reactstrap'

class ArCondicionado extends Component {
  state = {
    tempo_uso: 6,
    potencia: 1000,
    procel: ['A', 'B', 'C', 'D', 'E'],
    selectedProcel: '',
    dropdownProcel: false,
    aparelhos: ['7500 Btu\'s', '9000 Btu\'s', '12000 Btu\'s'],
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
    this.state.selectedAparelho = this.state.aparelhos[0]
  }

  calcular() {
    const { potencia, tarifa, tempo_uso } = this.state
    let resultadoPorDia, resultadoPorSemana, resultadoPorMes

    resultadoPorDia = potencia / 1000 * tempo_uso * tarifa
    resultadoPorSemana = resultadoPorDia * 7
    resultadoPorMes = resultadoPorDia * 30

    this.setState({
      resultadoPorDia,
      resultadoPorSemana,
      resultadoPorMes,
      calcular: !this.state.calcular
    })
  }

  onBack() {
    window.location.reload()
  }

  onChangeAparelho(aparelho) {
    if (aparelho === '7500 Btu\'s')
      this.setState({ potencia: 650 })
    else if (aparelho === '9000 Btu\'s')
      this.setState({ potencia: 950 })
    else if (aparelho === '12000 Btu\'s')
      this.setState({ potencia: 1200 })

    this.setState({ selectedAparelho: aparelho })
  }

  render() {
    return (
      <Fragment>
        {!this.state.calcular ?
          <div style={{ fontWeight: 'bold' }}>Selecionado: Ar condicionado</div>
          : null
        }

        {!this.state.calcular ?
          <Form style={{ marginTop: 30, marginLeft: 10, marginRight: 10 }}>
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
                        onClick={() => this.onChangeAparelho(aparelho)}
                      >
                        {aparelho}
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
          <Container style={{ marginBottom: 30 }}>
            <Row>
              <Col style={{ fontWeight: 'bold', marginBottom: 30 }}>Seu ar condicionado consome:</Col>
            </Row>
            <Row>
              <Col>Por dia: </Col>
              <Col style={{ color: 'green' }}>{'R$ ' + this.state.resultadoPorDia.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Por semana: </Col>
              <Col style={{ color: 'green' }}>{'R$ ' + this.state.resultadoPorSemana.toFixed(2)}</Col>
            </Row>

            <Row>
              <Col>Por mês: </Col>
              <Col style={{ color: 'green' }}>{'R$ ' + this.state.resultadoPorMes.toFixed(2)}</Col>
            </Row>

            <Row style={{ marginTop: 30 }}>
              <Col>Tarifa: </Col>
              <Col style={{ color: 'red' }}>{this.state.tarifa + ' R$/kWh'}</Col>
            </Row>
          </Container>
        }
        <Button color="#FFF" onClick={this.onBack.bind(this)}>Voltar</Button>
      </Fragment>
    )
  }
}

export default ArCondicionado
