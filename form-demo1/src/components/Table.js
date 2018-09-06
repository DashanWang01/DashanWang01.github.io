import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Grid, Header, Button, Segment, Modal } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import AddModal from './AddModal';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      open: false,
      setTableState: this.setTableState,
      rowEvents: {},
    };
  }

  openModal = open => {
    this.setState({ open });
  };
  setTableState = newState => {
    const key = Object.keys(newState)[0];
    if (this.state[key] !== newState[key]) this.setState(newState);
  };

  componentDidMount() {
    this.setState({
      rowEvents: {
        onClick: (e, row, rowIndex) => {
          const { category, type, removeAppData, setAppState } = this.props;
          if (e.target.innerHTML === 'delete') {
            removeAppData(category, 'routes', rowIndex);
          }
        },
      },
    });
  }

  render() {
    const {
      category,
      digDnsProducts,
      magDnsProducts,
      digRoutesProducts,
      magRoutesProducts,
      dnsColumns,
      routesColumns,
    } = this.props;
    const { rowEvents } = this.state;
    const dnsProducts = category === 'Dig' ? digDnsProducts : magDnsProducts;
    const routesProducts =
      category === 'Mag' ? magRoutesProducts : digRoutesProducts;

    const mobile = (
      <Grid divided>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment className="Header">
              <Header size="medium">
                {category} DNS{' '}
                <Button
                  onClick={() => {
                    this.openModal('dns');
                  }}
                  inverted
                  color="green"
                  floated="right"
                  size="tiny"
                >
                  {' '}
                  Add
                </Button>
                <AddModal type="dns" {...this.props} {...this.state} />
              </Header>{' '}
            </Segment>
            <BootstrapTable
              bordered={false}
              keyField="id"
              data={dnsProducts}
              columns={dnsColumns}
              filter={filterFactory()}
              rowEvents={this.rowEvents}
              pagination={paginationFactory({ hideSizePerPage: true })}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment className="Header">
              <Header size="medium">
                {category} Routes{' '}
                <Button
                  onClick={() => {
                    this.openModal('routes');
                  }}
                  inverted
                  color="green"
                  floated="right"
                  size="tiny"
                >
                  Add
                </Button>
                <AddModal type="routes" {...this.props} {...this.state} />
              </Header>{' '}
            </Segment>
            <BootstrapTable
              bordered={false}
              keyField="id"
              data={routesProducts}
              columns={routesColumns}
              filter={filterFactory()}
              rowEvents={rowEvents}
              pagination={paginationFactory({ hideSizePerPage: true })}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    const Landscape = (
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment className="Header">
              <Header size="medium">
                {category} DNS{' '}
                <Button
                  onClick={() => {
                    this.openModal('dns');
                  }}
                  inverted
                  color="green"
                  floated="right"
                  size="tiny"
                >
                  {' '}
                  Add
                </Button>
                <AddModal type="dns" {...this.props} {...this.state} />
              </Header>{' '}
            </Segment>
            <BootstrapTable
              bordered={false}
              keyField="id"
              data={dnsProducts}
              columns={dnsColumns}
              filter={filterFactory()}
              rowEvents={this.rowEvents}
              pagination={paginationFactory({ hideSizePerPage: true })}
            />
          </Grid.Column>
          <Grid.Column>
            <Segment className="Header">
              <Header size="medium">
                {category} Routes{' '}
                <Button
                  onClick={() => {
                    this.openModal('routes');
                  }}
                  inverted
                  color="green"
                  floated="right"
                  size="tiny"
                >
                  Add
                </Button>
                <AddModal type="routes" {...this.props} {...this.state} />
              </Header>{' '}
            </Segment>
            <BootstrapTable
              bordered={false}
              keyField="id"
              data={routesProducts}
              columns={routesColumns}
              filter={filterFactory()}
              rowEvents={rowEvents}
              pagination={paginationFactory({ hideSizePerPage: true })}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    return (
      <div>
        <MediaQuery query="(orientation: landscape)">
          <MediaQuery minDeviceWidth={820}>{Landscape}</MediaQuery>
          <MediaQuery maxDeviceWidth={820}>{Landscape}</MediaQuery>
        </MediaQuery>

        <MediaQuery query="(orientation: portrait)">
          <MediaQuery minDeviceWidth={700}>{Landscape}</MediaQuery>
          <MediaQuery maxDeviceWidth={700}>{mobile}</MediaQuery>
        </MediaQuery>
      </div>
    );
  }
}
