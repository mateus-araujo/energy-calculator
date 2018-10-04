import React, { Component, Fragment } from 'react'
import { Alert, Button } from 'reactstrap'

class NotFound extends Component {
  onClick() {
    window.location.reload()
  }

  render() {
    return (
      <Fragment>
        <Alert color="info">
          Obrigado pelo interesse, mas ainda não dispomos desta função
        </Alert>
        <Button color="#FFF" onClick={this.onClick.bind(this)}>Voltar</Button>
      </Fragment>
    )
  }
}

export default NotFound