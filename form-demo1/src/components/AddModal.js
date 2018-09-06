import React, { Component } from 'react';
import { Button, Form, Modal, Header } from 'semantic-ui-react';

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: '',
      pod: '',
      domain: '',
      ip: '',
      gateway: '',
      subnet: ''
    };
  }

  handleClick = () => {
    const { category, addAppData, type, setTableState } = this.props;
    const { server, pod, domain, ip, gateway, subnet } = this.state;
    let newData = {};
    if (type === 'dns') {
      newData = {
        server,
        pod,
        domain
      };
    } else {
      newData = {
        ip,
        gateway,
        subnet,
        actions: (
          <Button size="mini" basic color="grey">
            delete
          </Button>
        )
      };
    }
    addAppData(category, type, newData);
    setTableState({ open: false });
  };

  handleChange = newState => {
    console.log(newState);
    this.setState(newState);
  };

  close = () => {
    this.props.setTableState({ open: false });
  };
  render() {
    const { category, addAppData, type, open } = this.props;
    if (type === 'dns') {
      return (
        <Modal open={open === 'dns'} onClose={this.close} centered={false}>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Name Server"
                  placeholder="Name Server"
                  onChange={e => {
                    this.handleChange({ server: e.target.value });
                  }}
                />
                <Form.Input
                  onChange={e => {
                    this.handleChange({ pod: e.target.value });
                  }}
                  fluid
                  label="Pod Name"
                  placeholder="Pod Name"
                />
                <Form.Input
                  onChange={e => {
                    this.handleChange({ domain: e.target.value });
                  }}
                  fluid
                  label="Domain"
                  placeholder="Domain"
                />
              </Form.Group>
              <Form.Button onClick={this.handleClick}>Add</Form.Button>
            </Form>
          </Modal.Content>
          {/* <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content> */}
        </Modal>
      );
    } else {
      return (
        <Modal open={open === 'routes'} onClose={this.close} centered={false}>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Input
                    onChange={e => {
                      this.handleChange({ ip: e.target.value });
                    }}
                    fluid
                    label="Destination IP"
                    placeholder="Destination IP"
                  />
                  <Form.Input
                    onChange={e => {
                      this.handleChange({ gateway: e.target.value });
                    }}
                    fluid
                    label="Gateway"
                    placeholder="Gateway"
                  />
                  <Form.Input
                    onChange={e => {
                      this.handleChange({ subnet: e.target.value });
                    }}
                    fluid
                    label="Subnet Mask"
                    placeholder="Subnet Mask"
                  />
                </Form.Group>
                <Form.Button onClick={this.handleClick}>Add</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
    }
  }
}

export default AddModal;
