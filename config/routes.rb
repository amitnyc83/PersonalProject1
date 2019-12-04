Rails.application.routes.draw do


 resources :users
 resources :products
 resources :carts




 get '/current_user',  to: "auth#show"
 post '/login', to: 'auth#create'

 get 'checkouts' => 'checkouts#get_payment_methodspayments'
 get 'checkout/confirmation' => 'checkouts#confirmation'
 post 'checkout/confirmation' => 'checkouts#details'
 get 'checkout/error' => 'checkout#error'

end
