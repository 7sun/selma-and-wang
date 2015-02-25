Rails.application.routes.draw do

  root 'application#index'

  get '/users'     => 'users#index', as: 'users'
  get '/signup'    => 'users#new', as: 'signup'
  get '/users/:id' => 'users#show', as: 'user'
  post '/signup'   => 'users#create'

  get '/login'     => 'sessions#new', as: 'login'
  post '/login'    => 'sessions#create'
  get '/logout'    => 'sessions#destroy', as: 'logout'
  get '/auth/:provider/callback', to: 'sessions#create_fb'

end
