import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WelcomeRoom from "./routes/WelcomeRoom";
import Room from "./routes/Room";
import NavBar from "./components/NavBar";
import { ThemeProvider } from 'theme-ui';
import { tosh } from '@theme-ui/presets';
import storage from 'local-storage-fallback';

const homeLink = process.env.REACT_APP_URL;

const theme = {...tosh, breakpoints: ['40em', '52em', '64em', '76em']};

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
      <ThemeProvider theme={theme}>
        {this.props.children}
        <NavBar homeLink={homeLink}/>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={(props) => ( <WelcomeRoom {...props} name={this.state.name} /> )}/>
            <Route path="/room/:roomID" component={Room} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    );
    
  }
}

export default App;