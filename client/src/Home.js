import { connect } from "react-redux"
import { Link } from "react-router-dom"


function Home({session}) {
  return (
    <div>
      {session ?
        (<div class="col">
          <h3  class="mt-4">What would you like to do?</h3>
          <ul class="mt-4">
            <li><span class="h4"><a href="/events">Manage events</a></span></li>
            <li><span class="h4"><a href="/users">View users</a></span></li>
          </ul>
        </div>)
        :
        <div class="col">
          <h3>
            View <a href="/events">Events</a>.
          </h3>
          <div class="h5">To manage events and users, you need to login or <Link to="/users/new">register</Link>.</div>
        </div>
      }
    </div>
  )
}

function state2props({session}) {
  return { session }
}

export default connect(state2props)(Home);