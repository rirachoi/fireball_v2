# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  email           :string(255)
#  password_digest :string(255)
#  avatar          :string(255)
#  native_language :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  before_save :language_code

  has_secure_password
  validates :username, :presence => true, :length => { :minimum => 3 }, :uniqueness => true
  validates :password, :presence => true, :length => { :minimum => 6 }, :on => :create
  validates :email, :presence => true, :uniqueness => true
  validates :native_language, :presence => :true, :default => "en"
  has_many :chats
  has_many :games
  has_many :messages, :through => :chats
  has_many :messages, :through => :games

  private
  def language_code

  end
end
