import { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { useParams, Link } from "react-router-dom";
import { Button } from "react-bootstrap"
import { get_event } from './api'

const translateAttending = (invite) => {
  switch (invite.attending) {
    case 1:
      return "✔️"
    case -1:
      return "❌"
    case 0:
      return "❓"
    default:
      return "❓"
  }
}

const EventInfo = ({event}) => {
  return (
    <div class="w-50">
    <ul>
      <li>
        <strong>Name:</strong>
        {event.name}
      </li>
      <li>
        <strong>Date:</strong>
        {event.date}
      </li>
      <li>
        <strong>Description:</strong>
        {event.description}
      </li>
    </ul>
  </div>
  )
}

const InviteStatus = ({event}) => {

  const count_coming = (event) => {
    let count = 0;
    event.invites.forEach(i => {
      if (i.attending === 1) {
        count += 1;
      }
    })
    return count;
  }
  const count_not_coming = (event) => {
    let count = 0;
    event.invites.forEach(i => {
      if (i.attending === -1) {
        count += 1;
      }
    })
    return count;
  }
  const uncertain = (event) => {
    let count = 0;
    event.invites.forEach(i => {
      if (i.attending === 0) {
        count += 1;
      }
    })
    return count;
  }

  const handleInviteClick = (id) => {

  }
  
  return (
    <div class="w-50 h-100">
    <Link to={'/invites/new/' + event.id}>
      <span className="btn btn-primary">Invite Friend</span>
    </Link>
      <h5 class="mt-4">Overview</h5>
      <div>Attending: {count_coming(event)}</div>
      <div>Not Coming: {count_not_coming(event)}</div>
      <div>Undecided: {uncertain(event)}</div>
      <p class="h5 mt-3">Current invites:</p>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">User</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {event.invites.forEach(i => (
            <tr onClick={handleInviteClick(i.id)}>
              <td className="thin">{translateAttending(i)}</td>
              <td className="font-weight-bold">i.user.name</td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  )
}

const YourInvite = ({event, session}) => {

  const getInvite = (event) => {
    event.invites.forEach(i => {
      if (i.user_id === session.user_id) {
        return i;
      }
    })
  }

  let invite = getInvite(event)

  return (
    <div>
      <h3 class="mb-2">You're invited!</h3>
      <div class="h4">Would you like to attend?</div>
      <div>Current status: {translateAttending(invite)}</div>
      <div class="d-flex flex-row mt-3">
      <Button to={'/invites/not_going' + invite.id} type="submit" className="btn btn-dark border w-50 p-2 mr-2">❌</Button>
      <Button to={'/invites/going' + invite.id} type="submit" className="btn btn-dark border w-50 p-2">✔️</Button>
        </div>
    </div>
  )
}

function ShowEvent({session}) {
  let { id } = useParams();

  const [event, setEvent] = useState({
    name: "",
    date: null,
    description: "",
    comments: [],
    invites: []
  })

  useEffect(() => {
    console.log('session', session)
    // fetch data for event
    get_event(id).then(res => {
      console.log('data', res.data.data)
      setEvent(res.data.data)
    })
  }, [id])

  let showInviteStatus = session.name === event.owner_name;
  let isUserInvited = event.invites.some(i => i.user_id === session.user_id)

  return (
    <div>
      <h1 class="p-3">Event Details</h1>
      <div class="d-flex">
        <EventInfo event={event} />
        {showInviteStatus &&
        <InviteStatus event={event} />}
        {isUserInvited &&
        <YourInvite event={event} session={session} />}
      </div>
      <Link to="/events">Back to All Events</Link>
    </div>
  )
}

function state2props({session}) {
  return { session }
}

export default connect(state2props)(ShowEvent);