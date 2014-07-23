# == Schema Information
#
# Table name: games
#
#  id               :integer          not null, primary key
#  user_id          :integer
#  points           :integer
#  language         :string(255)
#  lives            :integer
#  difficulty_level :integer
#  stage            :integer
#  created_at       :datetime
#  updated_at       :datetime
#  completed        :boolean          default(FALSE)
#

class Game < ActiveRecord::Base
  belongs_to :user
  has_many :messages, :dependent => :destroy
end
