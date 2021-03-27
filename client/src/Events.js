import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { delete_event, fetch_events } from './api'

function Events({events, session}) {
  let history = useHistory();

  const handleDelete = (id) => {
    delete_event(id).then(res => {
      fetch_events();
      history.push("/events");
    })
  }

  const owner = (event) => {
    return event.owner_name === session.name;
  }

  let rows = events.map((event, index) => (
    <tr key={index}>
      <td>{event.owner_name}</td>
      <td>{event.name}</td>
      <td>{event.date}</td>
      <td>{event.description}</td>
      <td>
      <Link to={"/events/" + event.id}><span>Show</span>&nbsp;</Link>
      {owner(event) &&
        <Link to={"/events/" + event.id + "/edit"}><span>Edit</span>&nbsp;</Link>
      }
      {owner(event) &&
        <Link onClick={e => handleDelete(event.id)}><span>Delete</span></Link>
      }
      </td>
    </tr>
  ))

  return (
    <div class="mt-4">
<h2>All Events</h2>
<Link to="/events/new">
  <div className="pb-2">
    New Event
  </div>
</Link>
<table class="table table-light table-hover">
  <thead class="thead-dark">
  <tr>
      <th scope="col">User</th>
      <th scope="col">Name</th>
      <th scope="col">Date</th>
      <th scope="col">Description</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {rows}
  </tbody>
</table>
</div>
  )
}

function state2props({session, events, event_form}) {
  return { session, events, event_form };
}

export default connect(state2props)(Events);