Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'application#index'

  get '/users'        =>  'users#index', as: 'users'
  get '/signup'       => 'users#new', as: 'signup'
  post '/signup'      => 'users#create'
  get '/login'        => 'sessions#new', as: 'login'
  post '/login'       => 'sessions#create'
  get '/logout'       => 'sessions#destroy', as: 'logout'
  get 'music-player'  => 'soundcloud#index', as: 'soundcloud'
  get '/auth/:provider/callback', to: 'sessions#create_fb'

  # for tesing svg to canvas
  get '/testing' => 'application#testing'
  get 'dashboard' => 'application#dashboard'

end
