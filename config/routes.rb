Rails.application.routes.draw do
  root :to => 'chats#index'
  resources :chats do
    resources :messages, :only => [:new, :create]
  end

  resources :games do
    resources :messages, :only => [:new, :create]
  end
  resources :users

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/login' => 'sessions#destroy'

  get '/test' => 'tests#transtest'

end

#           Prefix Verb   URI Pattern                            Controller#Action
#             root GET    /                                      sessions#new
#    chat_messages POST   /chats/:chat_id/messages(.:format)     messages#create
# new_chat_message GET    /chats/:chat_id/messages/new(.:format) messages#new
#            chats GET    /chats(.:format)                       chats#index
#                  POST   /chats(.:format)                       chats#create
#         new_chat GET    /chats/new(.:format)                   chats#new
#        edit_chat GET    /chats/:id/edit(.:format)              chats#edit
#             chat GET    /chats/:id(.:format)                   chats#show
#                  PATCH  /chats/:id(.:format)                   chats#update
#                  PUT    /chats/:id(.:format)                   chats#update
#                  DELETE /chats/:id(.:format)                   chats#destroy
#    game_messages POST   /games/:game_id/messages(.:format)     messages#create
# new_game_message GET    /games/:game_id/messages/new(.:format) messages#new
#            games GET    /games(.:format)                       games#index
#                  POST   /games(.:format)                       games#create
#         new_game GET    /games/new(.:format)                   games#new
#        edit_game GET    /games/:id/edit(.:format)              games#edit
#             game GET    /games/:id(.:format)                   games#show
#                  PATCH  /games/:id(.:format)                   games#update
#                  PUT    /games/:id(.:format)                   games#update
#                  DELETE /games/:id(.:format)                   games#destroy
#            users GET    /users(.:format)                       users#index
#                  POST   /users(.:format)                       users#create
#         new_user GET    /users/new(.:format)                   users#new
#        edit_user GET    /users/:id/edit(.:format)              users#edit
#             user GET    /users/:id(.:format)                   users#show
#                  PATCH  /users/:id(.:format)                   users#update
#                  PUT    /users/:id(.:format)                   users#update
#                  DELETE /users/:id(.:format)                   users#destroy
#            login GET    /login(.:format)                       sessions#new
#                  POST   /login(.:format)                       sessions#create
#                  DELETE /login(.:format)                       sessions#destroy