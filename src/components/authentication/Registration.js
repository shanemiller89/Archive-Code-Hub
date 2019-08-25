import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/storage";
import {
  Modal,
  Button,
  Header,
  Icon,
  Container,
  Form,
  Segment,
  Grid
} from "semantic-ui-react";
import { register } from "./userManager";

// TODO:
// 1.Form Validation
//2. MAKE PROFILE  PIC OPTIONAL!

const archiveColor = {
  color: "#15CA00"
};

const textLarge = {
  fontSize: "1.25em"
};

export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    name: "",
    disabled: true,
    checked: false,
    profile: null
  };

  checkedToggle = () => {
    this.setState({
      checked: !this.state.checked,
      disabled: !this.state.disabled
    });
  };

  storageRef = firebase.storage().ref("profile_picture");

  submitWithImage = () => {
    const ref = this.storageRef.child(this.state.username);

    return ref
      .put(this.state.profile)
      .then(data => data.ref.getDownloadURL())
      .then(imageUrl => {
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
          profile: imageUrl
        };

        return register(user).then(user => {
          this.props.setAuthState();
          this.props.onRegister(user);
        });
      });
  };

  submit = () => {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      profile: this.state.profile
    };
    return register(user).then(user => {
      this.props.setAuthState();
      this.props.onRegister(user);
    });
  };

  render() {
    return (
      <Modal
        trigger={
          <Button style={{ background: "#15CA00", color: "white" }}>
            Sign Up
          </Button>
        }
        centered={false}
      >
        <Modal.Content>
          <Header size="huge" textAlign="center">
            <div>
              <Icon name="database" style={archiveColor} size="large" />
              code.<span style={archiveColor}>Archive</span>
            </div>
          </Header>
          <Container textAlign="center">
            <p style={textLarge}>All your resources</p>
            <p style={textLarge}>All in one place</p>
            <br />
          </Container>

          <Modal.Description>
            <Grid textAlign="center" verticalAlign="middle">
              <Grid.Column>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="address card"
                      iconPosition="left"
                      placeholder="Full Name"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                    <Form.Input
                      required
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Username"
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                    />
                    <Form.Input
                      required
                      fluid
                      icon="mail"
                      iconPosition="left"
                      placeholder="E-mail address"
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <Form.Input
                      required
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                    <Form.Checkbox
                      fluid
                      width={6}
                      label="Do you want to include a Profile Image?"
                      checked={this.state.checked}
                      onChange={this.checkedToggle}
                    />
                    <Form.Input
                      fluid
                      icon="image"
                      iconPosition="left"
                      placeholder="Upload Profile Pick"
                      type="file"
                      onChange={e =>
                        this.setState({ profile: e.target.files[0] })
                      }
                      id="imageURL"
                      disabled={this.state.disabled}
                    />
                    <Button
                      style={{ background: "#15CA00", color: "white" }}
                      fluid
                      size="large"
                      onClick={
                        this.state.username === "" | this.state.email === "" | this.state.password === "" ? null : this.state.disabled ? this.submit : this.submitWithImage
                      }
                    >
                      Register
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
