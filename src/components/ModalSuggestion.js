import React, { Component } from 'react'
import { Form, FormGroup, Input, FormFeedback } from 'reactstrap'

import CommonModal from './CommonModal'
import Loader from './Loader'
import api from '../services/api'

class ModalSuggestion extends Component {
  state = {
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    text: '',
    textError: '',
    message: '',
    modalMessage: false,
    loadingModal: false,
  }

  async createSuggestion() {
    const { name, email, text } = this.state
    this.setState({ loadingModal: true })

    await api.post('/suggestion', {
      name, email, text
    })
      .then(() => this.setState({
        message: 'Sua sugestão foi enviada. A equipe da Energy agradece! ;)',
        modalMessage: true
      })
      )
      .catch(() => this.setState({
        message: 'Houve um erro no envio da sua sugestão, tente novamente mais tarde',
        modalMessage: true
      }))
      .finally(() => this.setState({ loadingModal: false }))
  }

  toggleModalMessage() {
    this.setState({ modalMessage: !this.state.modalMessage })
    this.props.toggleModal()
  }

  render() {
    return (
      <div>
        <CommonModal
          isOpen={this.props.modal}
          toggle={this.props.toggleModal}
          togglePrimary={this.createSuggestion.bind(this)}
          centered
          modalTitle="Sugestão"
          primaryTitle="Enviar"
        >
          <Form style={{ marginTop: 30 }}>
            <FormGroup>
              <Input
                invalid={this.state.nameError.length}
                placeholder="Seu nome"
                onChange={e => this.setState({ name: e.target.value, nameError: '' })}
                value={this.state.name}
              />
              <FormFeedback>{this.state.nameError}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input
                invalid={this.state.emailError.length}
                placeholder="Seu email"
                onChange={e => this.setState({ email: e.target.value, emailError: '' })}
                value={this.state.email}
              />
              <FormFeedback>{this.state.emailError}</FormFeedback>
            </FormGroup>

            <FormGroup>
              <Input
                style={{ minHeight: 100, maxHeight: 150 }}
                invalid={this.state.textError.length}
                type="textarea"
                placeholder="Dê sua sugestão de um outro equipamento, de funcionalidade... Do que você quiser!"
                onChange={e => this.setState({ text: e.target.value, textError: '' })}
                value={this.state.text}
              />
              <FormFeedback>{this.state.textError}</FormFeedback>
            </FormGroup>

            <FormGroup>
              {this.state.loadingModal ?
                <div style={{ textAlign: 'center' }}>
                  <Loader />
                </div>
                : null
              }
            </FormGroup>
          </Form>
        </CommonModal>

        <CommonModal
          isOpen={this.state.modalMessage}
          toggle={this.toggleModalMessage.bind(this)}
          togglePrimary={this.toggleModalMessage.bind(this)}
          message={this.state.message}
          centered
          modalTitle="Enviar sugestão"
          primaryTitle="Ok"
        />
      </div >
    )
  }
}

export default ModalSuggestion
