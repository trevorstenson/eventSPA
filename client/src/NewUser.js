import { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { create_user, fetch_users } from './api'

function NewUser() {
  let history = useHistory();

  function onSubmit(ev) {
    console.log('submitting')
    ev.preventDefault();
    console.log(ev);
    console.log(user);

    create_user(user).then(() => {
      fetch_users();
      history.push("/");
    });
  }

  const [user, setUser] = useState({
    "name": "",
    "email": "",
    "password": ""
  })

  function update(field, ev) {
    let u1 = Object.assign({}, user);
    u1[field] = ev.target.value;
    u1.password = u1.pass1;
    setUser(u1);
  }

  return (
    <div>
      <h2>New User</h2>
      <Form onSubmit={onSubmit}>
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control type="text"
      onChange={(ev) => update("name", ev)}
      value={user.name}>
      </Form.Control>
    </Form.Group>

    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control type="text"
      onChange={(ev) => update("email", ev)}
      value={user.email}>
      </Form.Control>
    </Form.Group>

    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control type="password"
      onChange={(ev) => update("password", ev)}
      value={user.password}>
      </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit">Create</Button>
    </Form>
    </div>
  )
}

function state2props(_state) {
  return {};
}

export default connect(state2props)(NewUser);