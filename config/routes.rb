Rails.application.routes.draw do
  root :to => 'users#show'
  resources :chats, :only => [:create, :show, :index, :destroy] do
    resources :messages, :only => [:create]
  end

  post 'games/:id/end' => 'games#end_game'
  post 'games/:id/start' => 'games#start_game'
  resources :games, :only => [:create, :show, :index, :destroy]
  resources :users
  resources :messages, :only => [:show]

  post '/friends/:id' => 'friends#invite'
  put '/friends/:id' => 'friends#approve'
  delete '/friends/:id' => 'friends#destroy'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy'
end

#        Prefix Verb   URI Pattern                        Controller#Action
#          root GET    /                                  chats#index
# chat_messages POST   /chats/:chat_id/messages(.:format) messages#create
#         chats GET    /chats(.:format)                   chats#index
#               POST   /chats(.:format)                   chats#create
#          chat GET    /chats/:id(.:format)               chats#show
#               DELETE /chats/:id(.:format)               chats#destroy
#         games GET    /games(.:format)                   games#index
#               POST   /games(.:format)                   games#create
#          game GET    /games/:id(.:format)               games#show
#               DELETE /games/:id(.:format)               games#destroy
#               POST   /games/:id(.:format)               games#start_game
#               PUT    /games/:id(.:format)               game#end_game
#         users GET    /users(.:format)                   users#index
#               POST   /users(.:format)                   users#create
#      new_user GET    /users/new(.:format)               users#new
#     edit_user GET    /users/:id/edit(.:format)          users#edit
#          user GET    /users/:id(.:format)               users#show
#               PATCH  /users/:id(.:format)               users#update
#               PUT    /users/:id(.:format)               users#update
#               DELETE /users/:id(.:format)               users#destroy
#       message GET    /messages/:id(.:format)            messages#show
#               POST   /friends/:id(.:format)             friends#invite
#               DELETE /friends/:id(.:format)             friends#destroy
#         login GET    /login(.:format)                   sessions#new
#               POST   /login(.:format)                   sessions#create
#               DELETE /login(.:format)                   sessions#destroy