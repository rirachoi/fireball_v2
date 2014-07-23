class FriendsController < ApplicationController

  def create
    #invite friend
    friendship = Friendship.create(:user_id => @current_user.id, :friend_id => params[:friend_id], :approved => :true)
    Friendship.create(:user_id => params[:friend_id], :friend_id => @current_user.id, :approved => :true)
    #approve friend
  end

  def destroy
      #destroy friendships
  end

end