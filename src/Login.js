import React, { Component } from "react";
import "./App.css";
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Grid,
  Row,
  Col
} from "react-bootstrap";

/**
 *  User login UI component
 */
class Navigation extends Component {
  constructor(props) {
    super();
    // NOTE: clientId: digit(s) before underscore have to match database value
    this.state = {
      clientId: "1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4",
      clientSecret: "4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k",
      username: "",
      password: "",
      errorDescription: null
    };
  }

  /** Calls the App compnent's login method */
  login = () => {
    this.props.login();
  };

  /** Calls the App compnent's logout method */
  logout = () => {
    this.props.logout();
  };

  /** Form change handler */
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  /** Form change handler */
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13) this.submit();
  };

  /**
   * Sends a POST request with OAuth2 client id and client secret.
   * Calls the App component's setAccessToken, setExpirationDate and
   * setRefreshToken methods with the POST request'S return values.
   */
  submit = () => {
    fetch(this.props.apiUrl + "oauth/v2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        grant_type: "password",
        client_id: this.state.clientId,
        client_secret: this.state.clientSecret,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log("Response body: ", json); // Remove in production
        this.setState({ errorDescription: json.error_description });
        this.props.setAccessToken(json.access_token);
        this.props.setExpirationDate(json.expires_in);
        this.props.setRefreshToken(json.refresh_token);
        if (json.access_token) this.login();
      })
      .catch(error => console.log("Request failed: ", error)); // Remove in production
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    if (this.props.loggedIn) {
      return (
        <Button
          type="button"
          className="Logout"
          bsSize="xsmall"
          onClick={this.logout}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Grid className="Login">
          <Row>
            <Col xs={6} xsOffset={3}>
              <form>
                <FormGroup
                  controlId="formLoginUsername"
                  validationState={this.state.errorDescription ? "error" : null}
                >
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.username.value}
                    placeholder="Enter username"
                    onChange={this.handleUsernameChange}
                    onKeyDown={this.handleKeyPress}
                    autoFocus
                  />
                </FormGroup>
                <FormGroup
                  controlId="formLoginPassword"
                  validationState={this.state.errorDescription ? "error" : null}
                >
                  <ControlLabel className="ControlLabel">Password</ControlLabel>
                  <FormControl
                    type="password"
                    value={this.state.password.value}
                    placeholder="Enter password"
                    onChange={this.handlePasswordChange}
                    onKeyDown={this.handleKeyPress}
                  />
                  <HelpBlock>{this.state.errorDescription}</HelpBlock>
                </FormGroup>
                <Button type="button" onClick={this.submit}>
                  Submit
                </Button>
              </form>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export default Navigation;
