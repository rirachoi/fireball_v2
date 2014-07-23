class FriendsController < ApplicationController

  def invite
    #invite friend
    friend = User.where(:username => params[:username]).first
    @friendship = Friendship.create(:user_id => @current_user.id, :friend_id => friend.id, :approved => true)
    Friendship.create(:user_id => friend.id, :friend_id => @current_user.id, :approved => :false)
    render :json => @friendship
  end

  def approve
    #approve friend

  end

  def destroy
      #destroy friendships
  end

end