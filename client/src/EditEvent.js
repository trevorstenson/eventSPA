import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router';
import { update_event, get_event, fetch_events } from './api'

function EditEvent({session}) {
  let history = useHistory();
  let { id } = useParams();

  const [event, setEvent] = useState({
    "name": "",
    "date": "",
    "description": "",
    "user_id": session ? session.user_id : -1
  })

  useEffect(() => {
    get_event(id).then(res => {
      let event = res.data.data;
      setEvent({
        "name": event.name,
        "date": event.date,
        "description": event.description,
        "user_id": session ? session.user_id : -1
      })
    })
  }, [id])

  function onSubmit(ev) {
    ev.preventDefault();

    update_event(id, event).then(() => {
      fetch_events();
      history.push("/events/" + id);
    }).catch(error => {
      console.log(error)
      fetch_events();
      history.push("/events");
    });
  }

  function update(field, ev) {
    let e1 = Object.assign({}, event);
    e1[field] = ev.target.value;
    setEvent(e1);
  }

  return (
    <div>
      <h2>Edit Event</h2>
      <Form onSubmit={onSubmit}>
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control type="text"
      onChange={(ev) => update("name", ev)}
      value={event.name}>
      </Form.Control>
    </Form.Group>

    <Form.Group>
      <Form.Label>Date</Form.Label>
      <Form.Control type="datetime-local"
      onChange={(ev) => update("date", ev)}
      value={event.date}>
      </Form.Control>
    </Form.Group>

    <Form.Group>
      <Form.Label>Description</Form.Label>
      <Form.Control type="text"
      onChange={(ev) => update("description", ev)}
      value={event.description}>
      </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit">Update</Button>
    </Form>
    <Link to="/events">Back to All Events</Link>
    </div>
  )
}

function state2props({session}) {
  return { session };
}

export default connect(state2props)(EditEvent);