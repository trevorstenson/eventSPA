import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Users({users}) {
  console.log(users)
  let rows = users.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>Edit</td>
    </tr>
  ))

  return (
    <div class="mt-4">
      <h2>All Users</h2>
      {/* <Link to="/users/new">
        <div className="pb-2">
          New User
        </div>
      </Link> */}
<table class="table table-light table-hover">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {rows}
{/* <%= for user <- @users do %>
    <tr>
      <td><%= user.name %></td>
      <td><%= user.email %></td>

      <td>
        <span><%= link "Show", to: Routes.user_path(@conn, :show, user) %></span>
        <span><%= link "Edit", to: Routes.user_path(@conn, :edit, user) %></span>
        <span><%= link "Delete", to: Routes.user_path(@conn, :delete, user), method: :delete, data: [confirm: "Are you sure?"] %></span>
      </td>
    </tr>
<% end %> */}
  </tbody>
</table>
</div>
  )
}

function state2props({users, user_form}) {
  return { users, user_form };
}

export default connect(state2props)(Users);