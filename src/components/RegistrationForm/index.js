// Write your JS code here

import {Component} from 'react'

import './index.css'

class RegistrationForm extends Component {
  state = {
    displayForm: true,
    firstName: '',
    lastName: '',
    firstNameErrorMsg: '',
    lastNameErrorMsg: '',
    successfulSubmit: false,
  }

  onSubmit = event => {
    event.preventDefault()
    const {firstName, lastName} = this.state

    if (firstName === '' && lastName === '') {
      this.setState({
        firstNameErrorMsg: '*Required',
        lastNameErrorMsg: '*Required',
      })
      return
    }
    if (firstName !== '' && lastName === '') {
      this.setState({lastNameErrorMsg: '*Required'})
      return
    }

    // Case 2: When the submit button is clicked with empty fields
    if (firstName === '') {
      this.setState({firstNameErrorMsg: '*Required'})
    }
    if (lastName === '') {
      this.setState({lastNameErrorMsg: '*Required'})
    }

    // Case 3: When a non-empty last name is provided and the submit button is clicked with an empty first name
    if (firstName === '' && lastName !== '') {
      this.setState({firstNameErrorMsg: '*Required'})
      return
    }

    this.setState(prevState => ({
      displayForm: !prevState.displayForm,
      successfulSubmit: !prevState.successfulSubmit,
      firstNameErrorMsg: '',
      lastNameErrorMsg: '',
    }))
  }

  onBlurFirstName = event => {
    if (event.target.value === '') {
      this.setState({firstNameErrorMsg: '*Required'})
    } else {
      this.setState({firstNameErrorMsg: ''})
    }
  }

  onBlurLastName = event => {
    if (event.target.value === '') {
      this.setState({lastNameErrorMsg: '*Required'})
    } else {
      this.setState({lastNameErrorMsg: ''})
    }
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onClickNewResponse = () => {
    this.setState(prevState => {
      const {displayForm, successfulSubmit} = prevState
      return {
        displayForm: !displayForm,
        successfulSubmit: !successfulSubmit,
        firstName: '',
        lastName: '',
      }
    })
  }

  renderSuccessRegistrationView = () => (
    <>
      <img
        className="green-tick-icon"
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
      />
      <p className="successful-registration-text">Submitted Successfully</p>
      <button
        className="button"
        type="submit"
        onClick={this.onClickNewResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  renderFirstNameField = () => {
    const {firstName, firstNameErrorMsg} = this.state
    return (
      <>
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          id="firstName"
          className="first-name-input-filed"
          placeholder="First Name"
          value={firstName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
        />
        <p className="error-message">{firstNameErrorMsg}</p>
      </>
    )
  }

  renderLastNameField = () => {
    const {lastName, lastNameErrorMsg} = this.state
    return (
      <>
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          id="lastName"
          className="last-name-input-filed"
          placeholder="Last Name"
          value={lastName}
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
        />
        <p className="error-message">{lastNameErrorMsg}</p>
      </>
    )
  }

  render() {
    const {displayForm, successfulSubmit} = this.state
    return (
      <div className="registration-bg-container">
        {displayForm && (
          <>
            <h1 className="main-heading">Registration</h1>
            <form className="registration-form" onSubmit={this.onSubmit}>
              <div className="input-container">
                {this.renderFirstNameField()}
              </div>
              <div className="input-container">
                {this.renderLastNameField()}
              </div>
              <button className="button" type="submit">
                Submit
              </button>
            </form>
          </>
        )}

        {successfulSubmit && (
          <div className="successful-registration-container">
            {this.renderSuccessRegistrationView()}
          </div>
        )}
      </div>
    )
  }
}

export default RegistrationForm
