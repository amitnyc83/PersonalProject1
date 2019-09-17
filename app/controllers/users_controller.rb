class UsersController < ApiController
  before_action :require_login, except: [:create]


  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    user_carts = user.cart
      render json: {user: {username: user.username, name: user.name}, carts: user_carts}

  end

private

def user_params
  params.require(:user).permit(:username, :password, :name)
end

end
