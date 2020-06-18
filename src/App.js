import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import NavBar from "./components/NavBar";
import { ThemeProvider } from 'theme-ui';
import { tailwind, dark, deep, tosh } from '@theme-ui/presets'
import storage from 'local-storage-fallback';

const themeList = [ tailwind, dark, deep, tosh ];

function getInitialTheme() {
  const savedTheme = storage.getItem('theme');
  
  return savedTheme 
    ? JSON.parse(savedTheme) 
    : { themeIndex: 0 } ;
}

class App extends React.Component {

  constructor (props) {
    super(props);
    this.themeHandler = this.themeHandler.bind(this);
    this.state = { ...getInitialTheme() };
  }

  themeHandler() {
    this.setState({ themeIndex: (this.state.themeIndex+1 === themeList.length) ? 0 : this.state.themeIndex + 1 });
  }
  
  render() {

    storage.setItem('theme', JSON.stringify(this.state));

    return(
      <ThemeProvider theme={themeList[this.state.themeIndex]}>
        <NavBar themeHandler={this.themeHandler}/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CreateRoom} />
            <Route path="/room/:roomID" component={Room} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
    
  }
}

export default App;