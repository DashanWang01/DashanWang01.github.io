import React, { Component } from 'react';
import { Button, Form, Modal, Header } from 'semantic-ui-react';

const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
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

  validate = () => {
    const { server, pod, domain, ip, gateway, subnet } = this.state;
    const { type } = this.props;
    if (type === 'dns') {
      return {
        server:
          server === ''
            ? ''
            : server.match(regex)
              ? server.match(regex)[0]
              : null,
        pod,
        domain
      };
    } else {
      return {
        ip: ip === '' ? '' : ip.match(regex) ? ip.match(regex)[0] : null,
        gateway:
          gateway === ''
            ? ''
            : gateway.match(regex)[0]
              ? gateway.match(regex)
              : null,
        subnet:
          subnet === ''
            ? ''
            : subnet.match(regex)
              ? subnet.match(regex)[0]
              : null
      };
    }
  };

  handleClick = () => {
    const { category, addAppData, type, setTableState } = this.props;
    const { server, pod, domain, ip, gateway, subnet } = this.validate();
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

    if (Object.values(newData).indexOf(null) !== -1) {
      const index = Object.values(newData)
        .map((element, index) => (element === null ? index : undefined))
        .filter(item => item !== undefined);

      const res = [];
      for (let i = 0; i < index.length; i++) {
        const keyName = Object.keys(newData)[index[i]];
        res.push(keyName);
      }
      this.setState({ invalid: res });
      return;
    }

    addAppData(category, type, newData);
    setTableState({ open: false });
  };

  handleChange = newState => {
    this.setState(newState);
  };

  close = () => {
    this.props.setTableState({ open: false });
  };
  render() {
    const { type, open } = this.props;
    const { invalid } = this.state;
    if (type === 'dns') {
      return (
        <Modal open={open === 'dns'} onClose={this.close} centered={false}>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  error={
                    invalid && invalid.indexOf('server') !== -1 ? true : false
                  }
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
                  error={
                    invalid && invalid.indexOf('pod') !== -1 ? true : false
                  }
                  fluid
                  label="Pod Name"
                  placeholder="Pod Name"
                />
                <Form.Input
                  onChange={e => {
                    this.handleChange({ domain: e.target.value });
                  }}
                  error={
                    invalid && invalid.indexOf('domain') !== -1 ? true : false
                  }
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
                    error={
                      invalid && invalid.indexOf('ip') !== -1 ? true : false
                    }
                    onChange={e => {
                      this.handleChange({ ip: e.target.value });
                    }}
                    fluid
                    label="Destination IP"
                    placeholder="Destination IP"
                  />
                  <Form.Input
                    error={
                      invalid && invalid.indexOf('gateway') !== -1
                        ? true
                        : false
                    }
                    onChange={e => {
                      this.handleChange({ gateway: e.target.value });
                    }}
                    fluid
                    label="Gateway"
                    placeholder="Gateway"
                  />
                  <Form.Input
                    error={
                      invalid && invalid.indexOf('subnet') !== -1 ? true : false
                    }
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
