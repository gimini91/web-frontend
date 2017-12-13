import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super();
  }

  mapItems = () =>
    this.props.items.sort((a, b) => a.name > b.name).map((item, index) =>
      <LinkContainer to={`/${this.props.parent}/show?id=${item.id}`} key={index}>
        <NavItem>
          <i className={this.props.icon}></i> {item.name}
        </NavItem>
      </LinkContainer>
    );

  render() {
    return (
      <div>
        <Button type="button" className="RefreshBtn" onClick={() => this.props.refresh()}>
          <i className="fa fa-refresh"></i> Refresh
        </Button>
        {this.props.create &&
          <LinkContainer to={`/${this.props.parent}/create`}>
            <Button type="button" className="CreateBtn" bsStyle="success">
              <i className="fa fa-plus"></i> <b>Create</b>
            </Button>
          </LinkContainer>
        }
        <Nav stacked activeKey={this.props.selected} onSelect={this.props.select}>
          {this.props.overview &&
            <LinkContainer to={`/${this.props.parent}`}>
              <NavItem>
                <i className="fa fa-desktop"></i> Overview
              </NavItem>
            </LinkContainer>
          }
          {this.props.items instanceof Array && this.mapItems()}
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
