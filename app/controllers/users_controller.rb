class UsersController < ApplicationController
  before_action :check_if_logged_in, :except => [:new]
  def index
    @users = User.all
    @users = @users.reject{|u| u == @current_user} # remove the current user from search results
    respond_to do |format|
      format.html {}
      format.json { render :json => @users }
    end
    friendships1 = Friendship.where("friend_id = #{@current_user.id} AND approved = true") # this is going to only grab other side approved friendships
    friendships2 = Friendship.where("user_id = #{@current_user.id} AND approved = true")
    @friends = friendships1 & friendships2
    friendships.each {|friendship| @friends << User.find(friendship.user_id)}

    friends_awaiting_approval = @current_user.friendships.where(:approved => :false)
    @friend_requests = []
    friends_awaiting_approval.each {|friendship| @friend_requests << User.find(friendship.friend_id)}

    pending_approval = Friendship.where("friend_id = #{@current_user.id} AND approved = false")
    @pending_friend_requests = []
    pending_approval.each {|friendship| @pending_friend_requests << User.find(friendship.friend_id)}

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
      redirect_to root_path # you cannot see this page if you are not logged in
    end
    # gets 3 best games from the user
    @high_scores = @user.games.order(:points => :desc).limit(3)
    # gets the current user's cumulative score
    @my_total_score = @user.games.sum(:points)
    # gets the top 10 users cumulative score
    ranking_array = Game.group(:user_id).sum(:points).invert.sort.reverse.first(10)
    @ranking = {}
    ranking_array.each do |record|
      user = User.find(record[-1])
      @ranking[user.username] = record[0]
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