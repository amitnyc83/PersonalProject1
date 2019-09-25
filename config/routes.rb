Rails.application.routes.draw do


 resources :users
 resources :products
 resources :carts



 get '/current_user',  to: "auth#show"
 post '/login', to: 'auth#create'

end
