class UsersController < ApiController
  before_action :require_login, except: [:create]


  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token }
  end

  def profile
    user = User.find_by_auth_token!(request.headers[:token])
    if user.type === "Customer"
     render json: {username: user.username, name: user.name, type: user.type}
    else
     render json: { username: user.username, name: user.name, type: user.type }
   end

  end

  private

  def user_params
   params.require(:user).permit(:username, :password, :name, :type)
  end

end
