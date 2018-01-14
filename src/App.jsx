import React, { Component } from "react";
import "./styles/styles.scss";
import "./styles/style-mobile.scss";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import MainContainer from "./components/MainContainer";
import NewMeet from "./components/NewMeet";
import ModalNewMeet from "./components/ModalNewMeet";

function App() {
  return (
    <div>
      <ModalNewMeet />
      <Header />
      <Switch>
        <Route exact path="/" component={MainContainer} />
        <Route path="/NewMeet" component={NewMeet} /> 
        <Route path="/EditMeet" component={NewMeet} />
      </Switch>
    </div>
  );
}
export default App;
