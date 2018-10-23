import React from 'react'
import {
  Container, Col, Row
} from 'reactstrap'

const Result = ({
  equipamento,
  resultadoPorDia, resultadoPorSemana, resultadoPorMes,
  tarifa }) => {
  return (
    <Container style={{ marginBottom: 30 }}>
      <Row>
        <Col style={{ fontWeight: 'bold', marginBottom: 30 }}>{equipamento} consome:</Col>
      </Row>
      <Row>
        <Col>Por dia: </Col>
        <Col style={{ color: 'green' }}>
          {'R$ ' + resultadoPorDia.toFixed(2).replace('.', ',')}
        </Col>
      </Row>

      <Row>
        <Col>Por semana: </Col>
        <Col style={{ color: 'green' }}>
          {'R$ ' + resultadoPorSemana.toFixed(2).replace('.', ',')}
        </Col>
      </Row>

      <Row>
        <Col>Por mês: </Col>
        <Col style={{ color: 'green' }}>
          {'R$ ' + resultadoPorMes.toFixed(2).replace('.', ',')}
        </Col>
      </Row>

      <Row style={{ marginTop: 30 }}>
        <Col>Tarifa base: </Col>
        <Col style={{ color: 'red' }}>
          {tarifa.toFixed(2).replace('.', ',') + ' reais/kWh'}
        </Col>
      </Row>
    </Container>
  )
}

export default Result
