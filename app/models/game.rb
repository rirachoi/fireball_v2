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

  def answers
    [
    "bottle",
    "shoes",
    "hair",
    "tree",
    "chair",
    "table",
    "flower",
    "sun",
    "Hello",
    "Music",
    "Beer",
    "Water",
    "Summer",
    "Winter",
    "Spring",
    "Autumn",
    "School",
    "Computer",
    "Food",
    "Phone",
    "Tired",
    "bag",
    "sea",
    "Distance",
    "Time",
    "Christmas",
    "New Year",
    "book",
    "pen"
    ]
  end

  def translate_game_input(word)
    current_user = User.find self.user_id
    translate_me = URI.encode( word )
    url = 'https://www.googleapis.com/language/translate/v2?key='
    url += ENV['API_KEY']
    url += '&q=' + translate_me
    url += '&source=' + current_user.native_language
    url += '&target=' + self.language
    response = HTTParty.get( url ).to_json
    response = JSON.parse(response)
    if response['data'] # sometimes google is a crap and wont translate my god damn text
      translation = response['data']['translations'].first['translatedText']
    end
    translation
  end

end
