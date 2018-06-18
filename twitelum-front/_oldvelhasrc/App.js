import React, { Component,Fragment  } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Cabecalho from './components/Cabecalho';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho usuario='vwvvvw' />
        {/* Comentario vai aqui */}
      </Fragment>
    );
  }
}

export default App;
