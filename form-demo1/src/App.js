import React, { Component } from 'react';
import Tabs from './components/Tabs';
import './App.css';
import { textFilter } from 'react-bootstrap-table2-filter';
import { Button } from 'semantic-ui-react';
const dnsColumns = [
  {
    dataField: 'server',
    text: 'Name Server',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'pod',
    text: 'Pod Name',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'domain',
    text: 'Domain',
    filter: textFilter()
  }
];

const digDnsProducts = [
  {
    server: '10.2.1.2',
    pod: 'Dig',
    domain: ''
  },
  {
    server: '14.32.45.2',
    pod: 'Dig',
    domain: ''
  }
];

const magDnsProducts = [
  {
    server: '66.6.6.6',
    pod: 'Dig',
    domain: ''
  },
  {
    server: '21.21.21.3',
    pod: 'Dig',
    domain: ''
  }
];

const digRoutesProducts = [
  {
    ip: '0.0.0.0',
    gateway: '10.23.43.5',
    subnet: '0.0.0.0',
    actions: (
      <Button size="mini" basic color="grey">
        delete
      </Button>
    )
  },
  {
    ip: '0.0.0.1',
    gateway: '11.22.33.4',
    subnet: '0.0.0.1',
    actions: (
      <Button size="mini" basic color="grey">
        delete
      </Button>
    )
  }
];

const magRoutesProducts = [
  {
    ip: '1.1.1.1',
    gateway: '20.35.25.89',
    subnet: '1.1.1.1',
    actions: (
      <Button size="mini" basic color="grey">
        delete
      </Button>
    )
  },
  {
    ip: '2.2.2.2',
    gateway: '32.104.53.255',
    subnet: '255.255.255.1',
    actions: (
      <Button size="mini" basic color="grey">
        delete
      </Button>
    )
  }
];

const routesColumns = [
  {
    dataField: 'ip',
    text: 'Destination IP',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'gateway',
    text: 'Gateway',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'subnet',
    text: 'Subnet Mask',
    sort: true,
    filter: textFilter()
  },
  {
    dataField: 'actions',
    text: 'Actions'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentType: 'dns',
      currentProduct: 'dig',
      digRoutes: [],
      digDns: [],
      magRoutes: [],
      magDns: [],
      dnsColumns,
      routesColumns,
      digDnsProducts,
      digRoutesProducts,
      magDnsProducts,
      magRoutesProducts,
      setAppState: this.setAppState,
      removeAppData: this.removeAppData,
      addAppData: this.addAppData
    };
  }

  setAppState = (newState, callback = () => {}) => {
    this.setState(newState, callback);
  };

  removeAppData = (category, type, index, callback = () => {}) => {
    if (type === 'dns') {
      if (category === 'Dig') {
        const temp = this.state.digDnsProducts;
        temp.splice(index, 1);
        this.setState({ digDnsProducts: temp }, callback);
      } else {
        const temp = this.state.digRoutesProducts;
        temp.splice(index, 1);
        this.setState({ digRoutesProducts: temp }, callback);
      }
    } else if (type === 'routes') {
      if (category === 'Dig') {
        const temp = this.state.magDnsProducts;
        temp.splice(index, 1);
        this.setState({ magDnsProducts: temp }, callback);
      } else {
        const temp = this.state.magRoutesProducts;
        temp.splice(index, 1);
        this.setState({ magRoutesProducts: temp }, callback);
      }
    }
  };

  addAppData = (category, type, newData) => {
    if (type === 'dns') {
      if (category === 'Dig') {
        const temp = this.state.digDnsProducts;
        temp.push(newData);
        this.setState({ digDnsProducts: temp });
      } else {
        const temp = this.state.magDnsProducts;
        temp.push(newData);
        this.setState({ magDnsProducts: temp });
      }
    } else if (type === 'routes') {
      newData['actions'] = (
        <Button size="mini" basic color="grey">
          delete
        </Button>
      );

      if (category === 'Dig') {
        const temp = this.state.digRoutesProducts;
        temp.push(newData);
        this.setState({ digRoutesProducts: temp });
      } else {
        const temp = this.state.magRoutesProducts;
        temp.push(newData);

        this.setState({ magRoutesProducts: temp });
      }
    }
  };
  render() {
    return (
      <div className="App">
        <Tabs {...this.state} />
      </div>
    );
  }
}

export default App;
