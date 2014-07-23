class AddFriendToChat < ActiveRecord::Migration
  def change
    add_column :chats, :user2_id, :integer
    add_column :chats, :user2_language, :integer
  end
end
