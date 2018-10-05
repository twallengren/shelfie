import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import Header from './components/Header/Header'

class App extends Component {
  render() {
    return (
      <div>

        <Header />
        <Dashboard />
        <Form />

      </div>
    );
  }
}

export default App;
