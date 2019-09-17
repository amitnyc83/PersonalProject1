Rails.application.routes.draw do
  scope '/api/v1' do

    resources :sneakers

    post '/login' => "sessions#create"
    delete '/logout' => "sessions#destroy"
    resources :users
    get '/profile' => "users#profile"
    resources :carts
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
