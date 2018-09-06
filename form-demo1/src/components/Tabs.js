import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import Table from './Table';
class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const panes = [
      {
        menuItem: 'Dig',
        render: () => (
          <Tab.Pane attached={true}>
            <Table {...this.props} category="Dig" />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Mag',
        render: () => (
          <Tab.Pane attached={true}>
            <Table {...this.props} category="Mag" />
          </Tab.Pane>
        )
      }
    ];

    return <Tab menu={{ attached: true, tabular: true }} panes={panes} />;
  }
}

export default Tabs;
