import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Header from './components/Header/Header'

const BASE_URL = "http://localhost:3005";

class App extends Component {

  constructor() {

    super();

    this.state = {
      inventory: [],
      selected: {}
    }

  }

  componentDidMount() {

    this.getData();

  }

  getData = () => {
    // Get inventory list
    axios.get(`${BASE_URL}/api/inventory`).then(response => {

      this.setState({ inventory: response.data })

    })
  }

  render() {
    return (
      <div>

        <Header />
        <Dashboard inventory_list={this.state.inventory} getData={this.getData} />
        <Form getData={this.getData} />

      </div>
    );
  }
}

export default App;
