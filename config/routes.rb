Rails.application.routes.draw do


  resources :users
  post '/current_user',  to: "auth#show"
  post '/login', to: 'auth#create'

end
