# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
Chat.destroy_all
Game.destroy_all
Message.destroy_all

u1 = User.create(:username => "lynt", :email => "strawww@gmail.com", :avatar => "emoticons/peng.png", :password => "chicken", :password_confirmation => "chicken")
u2 = User.create(:username => "rich", :email => "richfield14@gmail.com", :avatar => "emoticons/peng.png", :password => "chicken", :password_confirmation => "chicken")
u3 = User.create(:username => "rira", :email => "rirachoi@gmail.com", :avatar => "emoticons/peng.png", :password => "chicken", :password_confirmation => "chicken")

c1 = Chat.create(:language => "ko")
c2 = Chat.create(:language => "ja")

u1.chats << c1 << c2