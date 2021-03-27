import { Route, Redirect } from 'react-router-dom'
import store from './store'

function PrivateRoute ({ children, ...rest }) {
  let state = store.getState();
  console.log(state)
  return (
    <Route {...rest} render={() => {
      return state.session
        ? children
        : <Redirect to='/' />
    }} />
  )
}

// function state2props({session}) {
//   return { session }
// }

// export default connect(state2props)(PrivateRoute);
export default PrivateRoute;