# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(:username => "lynt", :email => "strawww@gmail.com", :password => "chicken", :password_confirmation => "chicken")
User.create(:username => "rich", :email => "richfield14@gmail.com", :password => "chicken", :password_confirmation => "chicken")
User.create(:username => "rira", :email => "rirachoi@gmail.com", :password => "chicken", :password_confirmation => "chicken")