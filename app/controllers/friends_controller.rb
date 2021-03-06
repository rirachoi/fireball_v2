class FriendsController < ApplicationController

  def invite
    #invite friend
    friend = User.where(:username => params[:username]).first
    friendship = Friendship.create(:user_id => @current_user.id, :friend_id => friend.id, :approved => false)
    render :json => friendship
  end

  def approve
    #approve friend
    friend = User.where(:username => params[:username]).first
    Friendship.create(:user_id => @current_user.id, :friend_id => friend.id, :approved => true)
    friendship_on_friend_side = Friendship.where(:user_id => friend.id, :friend_id => @current_user.id).first
    friendship_on_friend_side.update(:approved => true)
    render :json => friend
  end

  def destroy
    #destroy friendship
    friend = User.where(:user_id => params[:user_id]).first
    friendship_on_my_side = Friendship.where(:user_id => @current_user.id, :friend_id => friend.id)
    friendship_on_friend_side = Friendship.where(:user_id => friend.id, :friend_id => @current_user.id)
    friendship_on_my_side.destroy
    friendship_on_friends_side.destroy
    render :text => 'Friendship DESTROYED'
  end

end