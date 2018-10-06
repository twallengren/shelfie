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
      selected: {
        product_id: -1
      }
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

  unselect = () => {
    this.setState({ selected: { product_id: -1 } })
  }

  setSelected = (product) => {
    this.setState({ selected: product })
  }

  render() {
    return (
      <div>

        <Header />
        <Dashboard inventory_list={this.state.inventory} getData={this.getData} setSelected={this.setSelected} />
        <Form getData={this.getData} selected={this.state.selected} unselect={this.unselect} />

      </div>
    );
  }
}

export default App;
