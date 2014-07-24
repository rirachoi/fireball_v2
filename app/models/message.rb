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
  include ActionView::Helpers::AssetUrlHelper
  belongs_to :chat
  belongs_to :game
  belongs_to :user

  def translate_text
    current_user = User.find self.user_id
    translate_me = URI.encode( self.input_text )
    url = 'https://www.googleapis.com/language/translate/v2?key='
    url += ENV['API_KEY']
    url += '&q=' + translate_me
    url += '&source=' + current_user.native_language
    if chat.present?
      url += '&target=' + chat.language
    elsif game.present?
      url += '&target=' + game.language
    end
    response = HTTParty.get( url ).to_json
    response = JSON.parse(response)
    if response['data'] # sometimes google is a crap and wont translate my god damn text
      translation = response['data']['translations'].first['translatedText']
      self.translation = translation
    else
      self.translation = ""
    end
  end

  def get_audio
    audio_link = "http://translate.google.com/translate_tts?ie=UTF-8"
    audio_link += "&q=" + self.translation
    if chat.present?
      audio_link += "&tl=" + chat.language
    elsif game.present?
      audio_link += "&tl=" + game.language
    end
    audio_link += "&autoplay=0"
    # response = HTTParty.get(audio_link)
    self.sound = audio_link
  end

  def get_pronounciation
    translate_me = URI.encode( self.input_text )
    pronounciation = "https://translate.google.com.au/translate_a/single?client=t&sl=auto"
    pronounciation += "&tl=" + "ko"
    pronounciation += "&hl=" + "en"
    pronounciation += "&dt=bd&dt=ex&dt=ld&dt=md&dt=qc&dt=rw&dt=rm&dt=ss&dt=t&dt=at&dt=sw&ie=UTF-8&oe=UTF-8&prev=btn&rom=1&ssel=0&tsel=0"
    pronounciation += "&q=" + translate_me
  end

  def emoticon
    { "autumn" => asset_path("emoticons/autumn.png"),
      "fall" =>  asset_path("emoticons/autumn.png"),
      "christmas" => asset_path("emoticons/christmas.png"),
      "chrissy" => asset_path("emoticons/christmas.png"),
      "xmas" => asset_path("emoticons/christmas.png"),
      "drink" => asset_path("emoticons/drink.png"),
      "party" => asset_path("emoticons/drink.png"),
      "partying" => asset_path("emoticons/drink.png"),
      "drinking" => asset_path("emoticons/drink.png"),
      "fireball" => asset_path("emoticons/fireball.png"),
      "gift" => asset_path("emoticons/gift.png"),
      "present" => asset_path("emoticons/gift.png"),
      "presents" => asset_path("emoticons/gift.png"),
      "i-m-happy" => asset_path("emoticons/happy.png"),
      "happy" => asset_path("emoticons/happy.png"),
      "stoked" => asset_path("emoticons/happy.png"),
      "rich" => asset_path("emoticons/rich.png"),
      "money" => asset_path("emoticons/rich.png"),
      "dollar-bills" => asset_path("emoticons/rich.png"),
      "them-dollar-bills" => asset_path("emoticons/rich.png"),
      "spring" => asset_path("emoticons/spring.png"),
      "picnic" => asset_path("emoticons/spring.png"),
      "summer" => asset_path("emoticons/summer.png"),
      "beach" => asset_path("emoticons/summer.png"),
      "thirsty" => asset_path("emoticons/thirsty.png"),
      "i-m-thirsty" => asset_path("emoticons/thirsty.png"),
      "water" => asset_path("emoticons/thirsty.png"),
      "toilet" => asset_path("emoticons/toilet.png"),
      "poo" => asset_path("emoticons/toilet.png"),
      "pee" => asset_path("emoticons/toilet.png"),
      "wink" => asset_path("emoticons/wink.png"),
      "yoy" => asset_path("emoticons/wink.png"),
      "hi" => asset_path("emoticons/wink.png"),
      "winter" => asset_path("emoticons/winter.png"),
      "work" => asset_path("emoticons/work.png"),
      "office" => asset_path("emoticons/work.png"),
      "work" => asset_path("emoticons/work.png"),
      "happy-birthday" => asset_path("emoticons/happybirthday.png"),
      "happy-new-year" => asset_path("emoticons/happynewyear.png"),
      "i-m-hungry" => asset_path("emoticons/hungry.png"),
      "i-don-t-know" => asset_path("emoticons/idontknow.png"),
      "i-don-t-understand" => asset_path("emoticons/idontknow.png"),
      "huh" => asset_path("emoticons/idontknow.png"),
      "peng" => asset_path("emoticons/peng.png"),
      "hello" => asset_path("emoticons/peng.png"),
      "good-morning" => asset_path("emoticons/peng.png"),
      "music" =>  asset_path("emoticons/music.png"),
      "dance" => asset_path("emoticons/music.png"),
      "dancing" => asset_path("emoticons/music.png"),
      "i-love-you" => asset_path("emoticons/iloveyou.png"),
      "i-like-you" => asset_path("emoticons/ilikeyou.png"),
      "pissed-off" => asset_path("emoticons/pissedoff.png"),
      "run" => asset_path("emoticons/run.png"),
      "running" => asset_path("emoticons/run.png"),
      "jogging" => asset_path("emoticons/run.png"),
      "bye" => asset_path("emoticons/run.png"),
      "working-out" => asset_path("emoticons/run.png"),
      "i-m-sad" => asset_path("emoticons/sad.png"),
      "sad" => asset_path("emoticons/sad.png"),
      "lonely" => asset_path("emoticons/lonely.png"),
      "i-m-shy" => asset_path("emoticons/shy.png"),
      "shy" => asset_path("emoticons/shy.png"),
      "i-m-sick" => asset_path("emoticons/sick.png"),
      "feel-shit" => asset_path("emoticons/sick.png"),
      "sick" => asset_path("emoticons/sick.png"),
      "i-m-smoking" => asset_path("emoticons/smoke.png"),
      "smoke" => asset_path("emoticons/smoke.png"),
      "study" => asset_path("emoticons/study.png"),
      "cigarette" => asset_path("emoticons/smoke.png"),
      "durry" => asset_path("emoticons/smoke.png"),
      "boss" => asset_path("emoticons/smoke.png"),
      "i-m-studying" => asset_path("emoticons/study.png"),
      "surprise" => asset_path("emoticons/surprise.png"),
      "holy-shit" => asset_path("emoticons/surprise.png"),
      "wot" => asset_path("emoticons/surprise.png"),
      "omg" => asset_path("emoticons/surprise.png"),
      "surprised" => asset_path("emoticons/surprise.png"),
      "surprising" => asset_path("emoticons/surprise.png"),
      "what" => asset_path("emoticons/what.png"),
      "win" => asset_path("emoticons/win.png"),
      "won" => asset_path("emoticons/win.png"),
      "angry" => asset_path("emoticons/angry.png"),
      "drunken" => asset_path("emoticons/drunken.png"),
      "wasted" => asset_path("emoticons/drunken.png"),
      "shit-faced" => asset_path("emoticons/drunken.png"),
      "blasted" => asset_path("emoticons/drunken.png"),
      "fuck-eyed" => asset_path("emoticons/drunken.png"),
      "blind" => asset_path("emoticons/drunken.png"),
      "call" => asset_path("emoticons/call.png"),
      "phone" => asset_path("emoticons/call.png")
    }

  end

  def match_emoticon
    # unless @current_user.native_language != 'en'
      # self.translate_text
      # string = self.input_text.parameterize
    # else
      string = self.input_text.parameterize
    # end
    if self.emoticon.keys.select {|k| string.include? k}.length > 0
      match = self.emoticon.keys.select {|k| string.include? k}.last
      self.image = self.emoticon[match]
    else
      self.image = self.emoticon["huh"]
    end
  end
end
