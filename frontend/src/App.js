import React, {useState} from 'react';
import './App.css';
import EventList from './components/Events'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar} from "react-bootstrap";

const App = () => {

    return (
    <React.Fragment>
      <EventList/>
    </React.Fragment>
  );
}

export default App;
