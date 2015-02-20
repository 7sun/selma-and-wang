Rails.application.routes.draw do

  root 'application#index'

  get '/signup' => 'users#new', as: 'signup'

  resources :users

end
