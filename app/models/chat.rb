# == Schema Information
#
# Table name: chats
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  language       :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#  user2_id       :integer
#  user2_language :integer
#

class Chat < ActiveRecord::Base
  has_many :messages, :dependent => :destroy
  belongs_to :user
  validates :language, :presence => true
end
