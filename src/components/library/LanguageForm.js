import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid,
  Label

} from "semantic-ui-react";
import * as firebase from 'firebase/app';
import 'firebase/storage';

export default class LanguageForm extends Component {
    state={
        title: "",
        link: "",
        imageURL: null,
        userId: this.props.currentUser
    }

    storageRef = firebase.storage().ref("library_profiles");
    
    submit = () => {
      //will determine name of storage reference
      const ref = this.storageRef.child(this.state.title);
  
      return ref
        .put(this.state.imageURL)
        .then(data => data.ref.getDownloadURL())
        .then(iURL => {
          return this.props.addLanguage({
            title: this.state.title,
            link: this.state.link,
            imageURL: iURL,
            userId: this.props.currentUser
          });
        })
        // .then(() => this.props.history.push('/'));
    }

    


  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Button primary as="div" labelPosition="right">
              <Button style={{ background: "#15CA00", color: "white" }} icon>
                <Icon name="plus" />
                Add
              </Button>
              <Label basic pointing="left">
                Language Library
              </Label>
            </Button>
          }
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon name="file code outline" size="large" style={{ color: "#15CA00" }}/>
              </div>
              Add A New Language
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Language"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                      />
                      <Form.Input
                        fluid
                        placeholder="Documentation URL"
                        onChange={e => this.setState({ link: e.target.value })}
                        id="link"
                      />
                      <Form.Input
                        fluid
                        placeholder="Image"
                        onChange={e => this.setState({ imageURL: e.target.files[0] })}
                        type="file"
                        id="imageURL"
                      />
                      <Button primary fluid size="large" onClick={this.submit}>
                        Submit
                      </Button>
                    </Segment>
                  </Form>
                </Grid.Column>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}
