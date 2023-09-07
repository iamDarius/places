import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import Users from './users/pages/User';
import NewPlace from './places/pages/NewPlace';

const App = () => {
    return <Router>
        <Switch>
            <Route path="/" exact>
                <Users />
            </Route>
            <Route path="/places/new" exact>
                <NewPlace />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Router>;
}

export default App;
