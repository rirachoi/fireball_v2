# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  username         :string(255)
#  email            :string(255)
#  password_digest  :string(255)
#  avatar           :string(255)
#  default_language :string(255)
#  skill_level      :integer
#  created_at       :datetime
#  updated_at       :datetime
#

class User < ActiveRecord::Base
  has_secure_password
  # has_many :chats
  # has_many :games
end
