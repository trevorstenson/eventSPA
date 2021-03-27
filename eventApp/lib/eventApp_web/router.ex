defmodule EventAppWeb.Router do
  use EventAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug EventApp.Plugs.FetchSession
  end

  pipeline :api do
    plug CORSPlug
    plug :accepts, ["json"]
  end

  # scope "/", EventAppWeb do
  #   pipe_through :browser

  #   get "/", PageController, :index
  #   resources "/users", UserController
  #   resources "/events", EventController
  #   resources "/sessions", SessionController,
  #     only: [:create, :delete], singleton: true
  #   resources "/invites", InviteController do
  #     post "/going", InviteController, :going
  #     post "/not_going", InviteController, :not_going
  #   end
  #   resources "/comments", CommentController
  # end

  scope "/api", EventAppWeb do
    pipe_through :api

    get "/", PageController, :index
    resources "/users", UserController
    resources "/events", EventController
    # options "/events", EventController, :options
    resources "/sessions", SessionController,
      only: [:create, :delete], singleton: true
    resources "/invites", InviteController do
      post "/going", InviteController, :going
      post "/not_going", InviteController, :not_going
    end
    resources "/comments", CommentController
  end

  # Other scopes may use custom stacks.
  # scope "/api", EventAppWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: EventAppWeb.Telemetry
    end
  end
end
