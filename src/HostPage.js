import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import HostOverview from './HostOverview.js';
import HostCreate from './HostCreate.js';
import HostShow from './HostShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

class HostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'overview',
      hosts: []
    };
  }

  componentDidMount() {
    this.httpGetHosts();
  }

  httpGetHosts = () => {
    this.props.httpRequest('GET', 'hosts', null, json => {
      this.setState({
        hosts: json
      })
    })
  }

  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="hosts"
            refresh={this.httpGetHosts}
            overview
            create
            items={this.state.hosts}
            icon={'fa fa-server'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            path="/hosts/overview"
            render={() => <HostOverview hosts={this.state.hosts} />}
          />
          <Route
            path="/hosts/create"
            render={() => <HostCreate
                            accessToken={this.props.accessToken}
                            httpGetHosts={this.httpGetHosts}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/hosts/show"
            render={() => <HostShow
                            id={queryString.parse(window.location.search).id}
                            httpGetHosts={this.httpGetHosts}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default HostPage;
