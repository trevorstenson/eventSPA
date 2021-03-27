import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'
import './App.scss';
import Navbar from './Navbar'
import Home from './Home'
import Users from './Users'
import NewUser from './NewUser'
import Events from './Events'
import NewEvent from './NewEvent'
import ShowEvent from './ShowEvent'
import EditEvent from './EditEvent'
import NewInvite from './NewInvite'

function App() {
  return (
    <div className="App">
      <div role="main" class="container">
        <Navbar/>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/users" exact>
            <Users/>
          </Route>
          <Route path="/users/new" exact>
            <NewUser/>
          </Route>
          <Route path="/events" exact>
            <Events/>
          </Route>
          <Route path="/events/new" exact>
            <NewEvent/>
          </Route>
          <Route path="/events/:id" exact>
            <ShowEvent/>
          </Route>
          <Route path="/events/:id/edit" exact>
            <EditEvent/>
          </Route>
          <Route path="/invites/new/:eventId" exact>
            <NewInvite/>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
