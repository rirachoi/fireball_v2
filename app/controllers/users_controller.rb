class UsersController < ApplicationController
  before_action :check_if_logged_in, :except => [:new]
  def index
    @users = User.all
    @users = @users.reject{|u| u == @current_user} # remove the current user from search results
    respond_to do |format|
      format.html {}
      format.json { render :json => @priorities }
    end
    @friends = @current_user.friendships.where(:approved => :true)
    @friends_awaiting_approval = @current_user.friendships.where(:approved => :false)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create user_params
    @user.username = @user.username.downcase
    @user.avatar = "emoticon/peng.png"
    if @user.save
      session[:user_id] = @user.id
      redirect_to users_path
    else
      render :new
    end
  end

  def edit
    @user = User.find params[:id]
    unless @user.id == @current_user.id
      redirect_to root_path
    end
  end

  def show
    @user = @current_user
    if @user.nil?
      redirect_to root_path
    end
  end

  def update
    @user = User.find params[:id]
    @user.update user_params
    @user.username = @user.username.downcase
    @user.save
    redirect_to root_path
  end

  def destroy
    @user = User.find params[:id]
    @user.destroy

    redirect_to users_path
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation, :avatar, :native_language)
  end
end