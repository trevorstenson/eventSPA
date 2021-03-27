import { connect } from "react-redux"
import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useHistory, useParams } from "react-router"
import { create_invite } from './api'


function NewInvite({session}) {
  let { eventId } = useParams();
  let history = useHistory();

  const [invite, setInvite] = useState({
    "email": "",
    "event_id": parseInt(eventId),
    "user_id": session.user_id,
    // "attending": 0
  })

  function update(field, ev) {
    let i1 = Object.assign({}, invite);
    i1[field] = ev.target.value;
    setInvite(i1);
  }

  function onSubmit(ev) {
    console.log('submitting', session)
    ev.preventDefault();

    create_invite(invite).then(res => {
      history.push("/events/" + eventId);
    }).catch(error => {
      console.log(error)
      history.push("/events");
    });
  }

  return (
    <div>
      <h1>New Invite</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="text"
          onChange={(ev) => update("email", ev)}
          value={invite.name}></Form.Control>
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">Send Invite</Button>
        </div>
      </Form>
    </div>
  )
}

function state2props({session}) {
  return { session }
}

export default connect(state2props)(NewInvite);