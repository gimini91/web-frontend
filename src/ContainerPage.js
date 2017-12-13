import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import ContainerOverview from './ContainerOverview.js';
import ContainerCreate from './ContainerCreate.js';
import ContainerShow from './ContainerShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

class ContainerPage extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'overview'
    };
  }

  componentDidMount() {
    this.props.httpGetContainers();
  }

  startContainer = () => {
    this.httpRequest('GET', 'containers', null, json => {
      this.setState({ containers: json})
    });
  }

  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="containers"
            refresh={this.props.httpGetContainers}
            overview
            create
            items={this.props.containers}
            icon={'fa fa-cube'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/containers"
            render={() => <ContainerOverview
                            httpPutContainerState={this.props.httpPutContainerState}
                            containers={this.props.containers}
                            containerStates={this.props.containerStates}
                          />}
          />
          <Route
            path="/containers/create"
            render={() => <ContainerCreate
                            hosts={this.props.hosts}
                            httpGetHosts={this.props.httpGetHosts}
                            httpGetContainers={this.props.httpGetContainers}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/containers/show"
            render={() => <ContainerShow
                            id={queryString.parse(window.location.search).id}
                            httpGetContainers={this.httpGetContainers}
                            httpPutContainerState={this.props.httpPutContainerState}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default ContainerPage;
