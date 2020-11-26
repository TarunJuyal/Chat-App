import React,{Suspense} from 'react';
import { Switch,Route } from "react-router-dom";
import LoginPage from './Components/views/Login/Login';
import "./App.css"
import Dashboard from './Components/views/Dashboard/Dashboard';
import Auth from "./hoc/auth";


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/dashboard" component={Auth(Dashboard)}></Route>
        <Route exact path="/" component={Auth(LoginPage)}></Route>
      </Switch>
    </Suspense>
  );
}

export default App;
