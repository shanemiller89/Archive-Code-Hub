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
import API from "../../../../modules/API"

export default class LanguageNoteEditForm extends Component {
  state = {
    title: "",
    text: "",
    image: null,
    archiveId: "",
    recordTypeId: "",
    disabled: true,
    checked: false
  };

  componentDidMount() {
    API.get("records", this.props.noteId)
    .then(note => {
      this.setState({
        title: note.title,
        text: note.text,
        image: note.image,
        archiveId: note.archiveId,
        recordTypeId: note.recordTypeId,
      });
    });
  }

  checkedToggle = () => {
    this.setState({ checked: !this.state.checked, disabled: !this.state.disabled });
  }

  storageRef = firebase.storage().ref("archive_images");

  submitWithImage = () => {
    //will determine name of storage reference
    const ref = this.storageRef.child(`${this.state.title}-${this.state.archiveId}`);

    return ref
      .put(this.state.image)
      .then(data => data.ref.getDownloadURL())
      .then(imageURL => {
        return this.props.updateLanguageNote({
          title: this.state.title,
          text: this.state.text,
          image: imageURL,
          archiveId:this.state.archiveId,
          recordTypeId: this.state.recordTypeId,
          id: this.props.noteId
        });
      });
    // .then(() => this.props.history.push('/'));
  };

  submit = () => {
    const editedNote = {
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
        archiveId:this.state.archiveId,
        recordTypeId: this.state.recordTypeId,
        id: this.props.noteId

    };
    this.props.updateLanguageNote(editedNote)

    // this.toggle();
    //--This toggle will close the Modal upon click --//
  };

  // TODO:
  // 1.Add toggle to close Modal

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
          style={{ width: "40em" }}
        >
          <Modal.Content>
            <Header size="huge" textAlign="center">
              <div>
                <Icon
                  name="sticky note"
                  size="large"
                  style={{ color: "#15CA00" }}
                />
              </div>
              Edit an Existing Archive Note
            </Header>

            <Modal.Description>
              <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                  <Form size="large">
                    <Segment>
                      <Form.Input
                        fluid
                        placeholder="Title of note (What is the note about?)"
                        onChange={e => this.setState({ title: e.target.value })}
                        id="title"
                        value={this.state.title}
                      />
                      <Form.TextArea
                        fluid
                        placeholder="Insert Text for Note"
                        onChange={e => this.setState({ text: e.target.value })}
                        id="text"
                        value={this.state.text}
                      />
                      <Form.Checkbox
                      fluid
                      width={10}
                      label="Do you want add or replace existing image?"
                      checked={this.state.checked}
                      onChange={this.checkedToggle}
                      />
                      <Form.Input
                        fluid
                        placeholder="Image"
                        onChange={e =>
                          this.setState({ image: e.target.files[0] })
                        }
                        type="file"
                        id="imageURL"
                        disabled={this.state.disabled}
                      />
                      <Button primary fluid size="large" onClick={this.state.disabled ? this.submit : this.submitWithImage}>
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
