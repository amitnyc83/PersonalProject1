class UsersController < ApiController
  # before_action :require_login, except: [:create]


  def create
    @user = User.create(user_params)
    if @user.valid?
      render json: {id: @user.id, username: @user.username, type: @user.type}
    else
      render json: { error: "does not work" }, status: 422
    end
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
