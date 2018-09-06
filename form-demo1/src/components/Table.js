import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Grid, Header, Button, Segment, Modal } from 'semantic-ui-react';
import AddModal from './AddModal';

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      setTableState: this.setTableState
    };
    this.rowEvents = {
      onClick: (e, row, rowIndex) => {
        console.log(e.target, row, rowIndex);
      }
    };
  }

  setTableState = newState => {
    this.setTableState(newState);
  };

  render() {
    const {
      category,
      digDnsProducts,
      magDnsProducts,
      digRoutesProducts,
      magRoutesProducts,
      dnsColumns,
      routesColumns
    } = this.props;

    const dnsProducts = category === 'Dig' ? digDnsProducts : magDnsProducts;
    const routesProducts =
      category === 'Mag' ? magRoutesProducts : digRoutesProducts;
    return (
      <Grid divided>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Header size="large">
                {category} DNS{' '}
                <AddModal type="dns" {...this.props} {...this.state} />
              </Header>{' '}
            </Segment>
            <BootstrapTable
              keyField="id"
              data={dnsProducts}
              columns={dnsColumns}
              filter={filterFactory()}
              rowEvents={this.rowEvents}
              pagination={paginationFactory()}
            />
          </Grid.Column>
          <Grid.Column>
            <Segment>
              {' '}
              <Header size="large">
                {category} Routes{' '}
                <AddModal type="routes" {...this.props} {...this.state} />
              </Header>{' '}
            </Segment>
            <BootstrapTable
              keyField="id"
              data={routesProducts}
              columns={routesColumns}
              filter={filterFactory()}
              rowEvents={this.rowEvents}
              pagination={paginationFactory()}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
