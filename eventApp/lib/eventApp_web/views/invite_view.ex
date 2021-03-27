defimpl Jason.Encoder, for: EventApp.Invites.Invite do
  def encode(struct, opts) do
    Map.from_struct(struct)
    |> Map.delete(:__meta__)
    Enum.reduce(%{}, fn
      ({k, %Ecto.Association.NotLoaded{}}, acc) -> acc
      ({k, v}, acc) -> Map.put(acc, k, v)
    end)
    |> Jason.Encode.map(opts)
  end
end

defmodule EventAppWeb.InviteView do
  use EventAppWeb, :view
  alias EventAppWeb.InviteView

  def render("index.json", %{invites: invites}) do
    %{data: render_many(invites, InviteView, "invite.json")}
  end

  def render("show.json", %{invite: invite}) do
    %{data: render_one(invite, InviteView, "invite.json")}
  end

  def render("invite.json", %{invite: invite}) do
    %{
      id: invite.id,
      attending: invite.attending,
      event_id: invite.event.id,
      user_id: invite.user.id
    }
  end
end
