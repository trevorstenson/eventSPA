import Jason
defmodule EventAppWeb.EventView do
  use EventAppWeb, :view
  alias EventAppWeb.EventView

  def render("index.json", %{events: events}) do
    %{data: render_many(events, EventView, "event.json")}
  end

  def render("show.json", %{event: event}) do
    %{data: render_one(event, EventView, "event.json")}
  end

  def render("event.json", %{event: event}) do
    IO.puts("in render: #{Kernel.inspect(event.user)}")
    %{
      id: event.id,
      name: event.name,
      description: event.description,
      date: event.date,
      owner_name: event.user.name,
      invites: event.invites,
      comments: event.comments
    }
  end
end
