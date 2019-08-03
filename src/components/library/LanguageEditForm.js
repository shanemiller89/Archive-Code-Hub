import React, { Component } from "react";
import {
  Modal,
  Button,
  Header,
  Icon,
  Form,
  Segment,
  Grid,
  Dropdown
} from "semantic-ui-react";
import * as firebase from "firebase/app";
import "firebase/storage";
import API from '../../modules/API'

// TODO:
// 1.Handle image editing
// 2.Write close Modal function

export default class LanguageEditForm extends Component {
  state = {
    title: "",
    link: "",
    image: null,
    libraryTypeId: null,
    userId: JSON.parse(localStorage.getItem("user"))
  };

  componentDidMount() {
    API.get("libraries", this.props.language.id)
    .then(language => {
      this.setState({
        title: language.title,
        link: language.link,
        image: language.image,
        libraryTypeId: language.libraryTypeId,
        userId: this.state.userId,
      });
    });
  }
//   storageRef = firebase.storage().ref("library_profiles");

//   submit = () => {
//     //will determine name of storage reference
//     const ref = this.storageRef.child(`${this.state.title}-${this.state.userId}`);

//     return ref
//       .put(this.state.image)
//       .then(data => data.ref.getDownloadURL())
//       .then(iURL => {
//         return this.props.addLanguage({
//           title: this.state.title,
//           link: this.state.link,
//           image: iURL,
//           userId: this.props.currentUser
//         });
//       });
//   };

handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingLanguage = evt => {
    evt.preventDefault();
    const editedLanguage = {
      title: this.state.title,
      link: this.state.link,
      image: this.state.image,
      libraryTypeId: this.state.libraryTypeId,
      userId: this.state.userId,
      id: this.props.language.id
    };
    this.props.updateLanguageLibrary(editedLanguage);
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          trigger={
            <Dropdown.Item
            icon="pencil"
            description="Edit"
          />
          }
          style={{ width: "30em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="file code outline"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit Language
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Language"
                        onChange={this.handleFieldChange}
                        id="title"
                        value={this.state.title}
                      />
                      <Form.Input
                        fluid
                        placeholder="Documentation URL"
                        onChange={this.handleFieldChange}
                        id="link"
                        value={this.state.link}
                      />
                      {/* <Form.Input
                        fluid
                        placeholder="Image"
                        onChange={e =>
                          this.setState({ image: e.target.files[0] })
                        }
                        type="file"
                        id="image"
                        value={this.state.image}
                      /> */}
                      <Button primary fluid size="large" onClick={this.updateExistingLanguage}>
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
