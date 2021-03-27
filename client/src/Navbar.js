import { Button, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { api_login } from './api'
import store from './store'

// modified from photoblog SPA example

let SessionInfo = connect()(({session, dispatch}) => {
  const logout = () => {
    console.log('logging out')
    dispatch({type: 'session/clear'});
  }
  return (
    <span>
      Logged in as {session.name} &nbsp;
      <Button onClick={logout}>Logout</Button>
    </span>  
  );
})

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function on_submit(ev) {
    ev.preventDefault();
    api_login(email, password);
  }

  return (
    <Form onSubmit={on_submit} inline>
      <Form.Control name="email"
                    type="text"
                    onChange={(ev) => setEmail(ev.target.value)}
                    value={email} />
      <Form.Control name="password"
                    type="password"
                    onChange={(ev) => setPassword(ev.target.value)}
                    value={password} />
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

function LOI({session}) {
  if (session) {
    return <SessionInfo session={session}/>
  } else {
    return <LoginForm/>
  }
}

const LoginOrInfo = connect(({session}) => ({session}))(LOI)

function Navbar() {


  return (
    <div className="p-2 d-flex justify-content-between align-content-center bg-dark text-white rounded">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
        <h2>Events</h2>
      </Link>
        <div className="d-flex flex-row pt-2">
        <Col>
          <LoginOrInfo/>
        </Col>
        </div>
        {/* <div class="d-flex flex-row pt-2">
          <%= if @conn.assigns[:current_user] do %>
            <div class="mr-3"><%= @conn.assigns[:current_user].email %></div>
            <div class="h5">
              <%= link("Logout", to: Routes.session_path(@conn, :delete), method: :delete) %>
            </div>
          <% else %>
            <div class="col">
              <%= form_for @conn,
              Routes.session_path(@conn, :create),
              [class: "form-inline mb-2"],
              fn f -> %>
                <div class="form-group">
                <%= text_input f, :email, class: "form-control form-control-sm", placeholder: "Email" %>
                <%= submit "Login", class: "btn btn-light mx-2" %>
                </div>
              <% end %>
            </div>
            <%= link "Register", to: Routes.user_path(@conn, :new), class: "btn btn-light mb-2 align-items-center rounded" %>
          <% end %>
        </div> */}
      </div>
  )
}

export default Navbar;