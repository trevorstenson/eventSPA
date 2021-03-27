defmodule EventAppWeb.EventController do
  use EventAppWeb, :controller

  alias EventApp.Events
  alias EventApp.Users.User
  alias EventApp.Events.Event
  alias EventApp.Comments
  alias EventApp.Invites
  alias EventAppWeb.Plugs

  plug Plugs.Authorization when action not in [:index]
  plug :fetch_event when action in [:show, :edit, :update, :delete]
  # plug :require_owner when action in [:edit, :update, :delete]
  # plug :user_is_invited when action in [:respond_to_event]

  def index(conn, _params) do
    # user = conn.assigns[:current_user]
    events = Events.list_events()
    # my_events = Enum.filter(events, fn x -> x.user_id == user.id end)
    # invited_events = Enum.filter(events, fn x -> is_user_invited(conn, x) end)
    # render(conn, "index.json", my_events: my_events, invited_events: invited_events)
    render(conn, "index.json", events: events)
  end

  def respond_to_event(conn, %{"event_id" => id}) do
    event = Events.get_event!(id) |> Events.load_invites
    user = conn.assigns[:current_user]
    actual_inv = Enum.find(event.invites, fn x -> x.user_id == user.id end)
    render(conn, "respond.html", event: event, invite: conn.assigns[:invite])
  end

  def new(conn, _params) do
    changeset = Events.change_event(%Event{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"event" => event_params}) do
    # event_params = Map.put(event_params, "user_id", conn.assigns[:current_user].id)
    IO.inspect("event params: #{Kernel.inspect(event_params)}")
    if User.get_user(event_params["user_id"]) do
      case Events.create_event(event_params) do
        {:ok, event} ->
          send_resp(conn, 200, "")

        {:error, %Ecto.Changeset{} = changeset} ->
          send_resp(conn, 500, "")
      end
    else
      send_resp(conn, 404, "")
    end
  end

  def show(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    |> Events.load_comments
    |> Events.load_invites
    |> Events.load_user
    # comment = %Comments.Comment{
    #   event_id: event.id,
    #   user_id: current_user_id(conn)
    # }
    # invite = %Invites.Invite{
    #   event_id: event.id,
    #   user_id: current_user_id(conn)
    # }
    # new_comment = Comments.change_comment(comment)
    # new_invite = Invites.change_invite(invite)
    render(conn, "show.json", event: event)
  end

  def edit(conn, %{"id" => id}) do
    event = Events.get_event!(id)
    changeset = Events.change_event(event)
    render(conn, "edit.html", event: event, changeset: changeset)
  end

  def update(conn, %{"id" => id, "event" => event_params}) do
    IO.puts("UPDATING EVENT")
    event = Events.get_event!(id)

    case Events.update_event(event, event_params) do
      {:ok, event} ->
        send_resp(conn, 200, "")
        # render(conn, "show.json", event: event)

      {:error, %Ecto.Changeset{} = changeset} ->
        send_resp(conn, 405, "")
        # render(conn, "edit.html", event: event, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    IO.puts("YOOO")
    event = Events.get_event!(id)
    {:ok, _event} = Events.delete_event(event)

    send_resp(conn, 200, "")
  end

  def fetch_event(conn, _args) do
    id = conn.params["id"]
    event = Events.get_event!(id)
    assign(conn, :event, event)
  end

  def require_owner(conn, _args) do
    user = conn.assigns[:current_user]
    event = conn.assigns[:event]
    if user.id == event.user_id do
      conn
    else
      conn
      |> put_flash(:error, "You must be the owner to do this.")
      |> redirect(to: Routes.page_path(conn, :index))
      |> halt
    end
  end

  def user_is_invited(conn, %{"event_id" => id}) do
    user = conn.assigns[:current_user]
    event = Events.get_event!(id)
    |> Events.load_invites
    actual_inv = Enum.find(event.invites, fn x -> x.user_id == user.id end)
    if actual_inv do
      assign(conn, :invite, actual_inv)
    else
      conn
      |> put_flash(:error, "You were not invited.")
      |> redirect(to: Routes.page_path(conn, :index))
      |> halt
    end
  end
end
