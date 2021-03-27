# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     EventApp.Repo.insert!(%EventApp.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias EventApp.Repo
alias EventApp.Users.User
alias EventApp.Events.Event

defmodule Inject do
  def user(name, email) do
    hash = Bcrypt.hash_pwd_salt("pass")
    Repo.insert!(%User{name: name, email: email, password_hash: hash})
  end
end

# alice = Repo.insert!(%User{name: "alice", email: "alice@mail.com"})
# bob = Repo.insert!(%User{name: "bob", email: "bob@test.com"})

alice = Inject.user("alice", "alice@mail.com")
bob = Inject.user("bob", "bob@test.com")

Repo.insert(%Event{user_id: alice.id, name: "Surprise Party for Bob", date: NaiveDateTime.local_now(), description: "let's surpsise him so badly!"})
