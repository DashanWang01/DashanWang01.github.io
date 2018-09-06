import React, { Component } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

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
    addAppData(newData);
  };

  handleChange = newState => {
    this.setState(newState);
  };

  render() {
    const { category, addAppData, type } = this.props;
    if (type === 'dns') {
      return (
        <Modal
          trigger={
            <Button inverted color="green" floated="right" size="tiny">
              Add
            </Button>
          }>
          <Modal.Content>
            <Modal.Description>
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
                <Form.Button onClick={this.handleClick()}>Add</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
    } else {
      return (
        <Modal
          trigger={
            <Button inverted color="green" floated="right" size="tiny">
              Add
            </Button>
          }>
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
                <Form.Button onClick={this.handleClick()}>Add</Form.Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      );
    }
  }
}

export default AddModal;
