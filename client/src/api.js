import store from './store'

const axios = require('axios')

const BASE_URL = "http://localhost:4795/api"

const api_login = (email, password) => {
  console.log('in api login js')
  axios.post(BASE_URL + "/sessions", {
    email: email,
    password: password
  }).then(res => {
    if (res.data.session) {
      let action = {
        type: 'session/set',
        data: res.data.session,
      }
      store.dispatch(action);
    } else if (res.data.error) {
      console.log(res.data.error)
    }
  })
}

const create_user = (data) => {
  return axios.post(BASE_URL + "/users", { user: data });
}

const create_event = (data) => {
  let state = store.getState();
  let token = state?.session?.token;
  console.log('token: ', token)
  let config = {
    // headers: {
    //   'x-auth': token
    // }
  }
  return axios.post(BASE_URL + "/events", { event: data }, config);
}

const update_event = (id, data) => {
  console.log('updating event', id, data)
  return axios.patch(BASE_URL + `/events/${id}`, { event: data });
}

const get_event = (id) => {
  console.log('trying to get', id)
  return axios.get(BASE_URL + `/events/${id}`);
}

const delete_event = (id) => {
  console.log('trying to delete event', id)
  return axios.delete(BASE_URL + `/events/${id}`);
}

const create_invite = (data) => {
  console.log('trying to make invite', data)
  return axios.post(BASE_URL + '/invites', {
    invite: data
  });
}

const fetch_users = () => {
  axios.get(BASE_URL + "/users").then(res => {
    let action = {
      type: 'users/set',
      data: res.data.data
    }
    store.dispatch(action);
  })
}

const fetch_events = () => {
  axios.get(BASE_URL + "/events").then(res => {
    let action = {
      type: 'events/set',
      data: res.data.data
    }
    store.dispatch(action);
  })
}

const load_defaults = () => {
  fetch_users();
  fetch_events();
}

export { api_login, create_user, fetch_users, create_event, get_event, update_event, delete_event, fetch_events, create_invite, load_defaults }