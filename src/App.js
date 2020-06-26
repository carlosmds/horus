import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import NavBar from "./components/NavBar";
import { ThemeProvider } from 'theme-ui';
import { tosh } from '@theme-ui/presets';
import storage from 'local-storage-fallback';

const homeLink = process.env.REACT_APP_URL;

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      name: storage.getItem('userName') || ''
    }
  }
  
  render() {

    return(
      <ThemeProvider theme={tosh}>
        {this.props.children}
        <NavBar homeLink={homeLink}/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={(props) => ( <CreateRoom {...props} name={this.state.name} /> )}/>
            <Route path="/room/:roomID" component={Room} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
    
  }
}

export default App;