# == Schema Information
#
# Table name: messages
#
#  id                  :integer          not null, primary key
#  user_id             :integer
#  game_id             :integer
#  chat_id             :integer
#  image               :string(255)
#  language_from       :string(255)
#  language_to         :string(255)
#  input_text          :string(255)
#  translation         :string(255)
#  pronounciation_text :string(255)
#  sound               :string(255)
#  created_at          :datetime
#  updated_at          :datetime
#

class Message < ActiveRecord::Base
  belongs_to :chat
  belongs_to :game
  belongs_to :user

  def translate_text
    current_user = User.find self.user_id
    translate_me = URI.encode( self.input_text )
    url = 'https://www.googleapis.com/language/translate/v2?key='
    url += API_KEY
    url += '&q=' + translate_me
    url += '&source=' + current_user.native_language
    if chat.present?
      url += '&target=' + chat.language
    elsif game.present?
      url += '&target=' + game.language
    end
    response = HTTParty.get( url ).to_json
    response = JSON.parse(response)
    translation = response['data']['translations'].first['translatedText']
    self.translation = translation
  end

  def self.emoticon
    { autumn: "assets/images/emoticons/autumn.png",
      fall: "assets/images/emoticons/autumn.png",
      christmas: "assets/images/emoticons/christmas.png",
      drink: "assets/images/emoticons/drink.png",
      drinking: "assets/images/emoticons/drink.png",
      fireball: "assets/images/emoticons/fireball.png",
      gift: "assets/images/emoticons/gift.png",
      present: "assets/images/emoticons/gift.png",
      :"i-m-happy" => "assets/images/emoticons/happy.png",
      rich: "assets/images/emoticons/rich.png",
      spring: "assets/images/emoticons/spring.png",
      summer: "assets/images/emoticons/summer.png",
      thirsty: "assets/images/emoticons/thirsty.png",
      toilet: "assets/images/emoticons/toilet.png",
      poo: "assets/images/emoticons/toilet.png",
      pee: "assets/images/emoticons/toilet.png",
      wink: "assets/images/emoticons/wink.png",
      yoy: "assets/images/emoticons/wink.png",
      winter: "assets/images/emoticons/winter.png",
      work: "assets/images/emoticons/work.png",
      office: "assets/images/emoticons/work.png",
      work: "assets/images/emoticons/work.png",
      :"happy-birthday" => "assets/images/emoticons/happybirthday.png",
      :"happy-newyear" => "assets/images/emoticons/happynewyear.png",
      :"i-m-hungry" => "assets/images/emoticons/hungry.png",
      :"i-don-t-know" => "assets/images/emoticons/idontknow.png",
      peng: "assets/images/emoticons/peng.png",
      music: "assets/images/emoticons/music.png",
      dance: "assets/images/emoticons/music.png",
      dancing: "assets/images/emoticons/music.png",
      :"i-love-you" => "assets/images/emoticons/iloveyou.png",
      :"i-like-you" => "assets/images/emoticons/ilikeyou.png",
      :"pissed-off" => "assets/images/emoticons/work.png",
      run: "assets/images/emoticons/run.png",
      running: "assets/images/emoticons/run.png",
      :"i-m-sad" => "assets/images/emoticons/sad.png",
      :"i-m-shy" => "assets/images/emoticons/shy.png",
      :"i-m-sick" => "assets/images/emoticons/sick.png",
      smoking: "assets/images/emoticons/smoke.png",
      smoke: "assets/images/emoticons/smoke.png",
      study: "assets/images/emoticons/study.png",
      cigarette: "assets/images/emoticons/smoke.png",
      studying: "assets/images/emoticons/study.png",
      surprise: "assets/images/emoticons/surprise.png",
      surprised: "assets/images/emoticons/surprise.png",
      surprising: "assets/images/emoticons/surprise.png",
      what: "assets/images/emoticons/what.png",
      win: "assets/images/emoticons/win.png",
      won: "assets/images/emoticons/win.png",
      angry: "assets/images/emoticons/angry.png",
      drunken: "assets/images/emoticons/drunken.png",
      call: "assets/images/emoticons/call.png",
      phone: "assets/images/emoticons/call.png"
    }
  end

  def match_emoticon
    string = self.input_text
    image = Message.emoticon.values if string.include?(Message.emoticon.keys)
  end
end
