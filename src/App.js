
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//imported function
import { LoginForm } from "./LoginPage/LoginForm";
import { Datatabel } from "./Components/Datatabel";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/datatable" component={Datatabel} />
          <Route exact path="/adduser" />
          <Route exact path="/edituser" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
