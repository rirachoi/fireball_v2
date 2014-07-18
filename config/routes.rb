Rails.application.routes.draw do
  root :to => 'sessions#new'
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

end
