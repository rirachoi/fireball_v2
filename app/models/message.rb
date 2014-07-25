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
    { "autumn" => "emoticons/autumn.png",
      "fall" =>  "emoticons/autumn.png",
      "christmas" => "emoticons/christmas.png",
      "chrissy" => "emoticons/christmas.png",
      "xmas" => "emoticons/christmas.png",
      "drink" => "emoticons/drink.png",
      "party" => "emoticons/drink.png",
      "partying" => "emoticons/drink.png",
      "drinking" => "emoticons/drink.png",
      "fireball" => "emoticons/fireball.png",
      "gift" => "emoticons/gift.png",
      "present" => "emoticons/gift.png",
      "presents" => "emoticons/gift.png",
      "i-m-happy" => "emoticons/happy.png",
      "happy" => "emoticons/happy.png",
      "stoked" => "emoticons/happy.png",
      "rich" => "emoticons/rich.png",
      "money" => "emoticons/rich.png",
      "dollar-bills" => "emoticons/rich.png",
      "them-dollar-bills" => "emoticons/rich.png",
      "spring" => "emoticons/spring.png",
      "picnic" => "emoticons/spring.png",
      "summer" => "emoticons/summer.png",
      "beach" => "emoticons/summer.png",
      "thirsty" => "emoticons/thirsty.png",
      "i-m-thirsty" => "emoticons/thirsty.png",
      "water" => "emoticons/thirsty.png",
      "toilet" => "emoticons/toilet.png",
      "poo" => "emoticons/toilet.png",
      "pee" => "emoticons/toilet.png",
      "wink" => "emoticons/wink.png",
      "yoy" => "emoticons/wink.png",
      "hi" => "emoticons/wink.png",
      "winter" => "emoticons/winter.png",
      "work" => "emoticons/work.png",
      "office" => "emoticons/work.png",
      "work" => "emoticons/work.png",
      "happy-birthday" => "emoticons/happybirthday.png",
      "happy-new-year" => "emoticons/happynewyear.png",
      "i-m-hungry" => "emoticons/hungry.png",
      "i-don-t-know" => "emoticons/idontknow.png",
      "i-don-t-understand" => "emoticons/idontknow.png",
      "huh" => "emoticons/idontknow.png",
      "peng" => "emoticons/peng.png",
      "hello" => "emoticons/peng.png",
      "good-morning" => "emoticons/peng.png",
      "music" =>  "emoticons/music.png",
      "dance" => "emoticons/music.png",
      "dancing" => "emoticons/music.png",
      "i-love-you" => "emoticons/iloveyou.png",
      "i-like-you" => "emoticons/ilikeyou.png",
      "pissed-off" => "emoticons/pissedoff.png",
      "run" => "emoticons/run.png",
      "running" => "emoticons/run.png",
      "jogging" => "emoticons/run.png",
      "bye" => "emoticons/run.png",
      "working-out" => "emoticons/run.png",
      "i-m-sad" => "emoticons/sad.png",
      "sad" => "emoticons/sad.png",
      "lonely" => "emoticons/lonely.png",
      "i-m-shy" => "emoticons/shy.png",
      "shy" => "emoticons/shy.png",
      "i-m-sick" => "emoticons/sick.png",
      "feel-shit" => "emoticons/sick.png",
      "sick" => "emoticons/sick.png",
      "i-m-smoking" => "emoticons/smoke.png",
      "smoke" => "emoticons/smoke.png",
      "study" => "emoticons/study.png",
      "cigarette" => "emoticons/smoke.png",
      "durry" => "emoticons/smoke.png",
      "boss" => "emoticons/smoke.png",
      "i-m-studying" => "emoticons/study.png",
      "surprise" => "emoticons/surprise.png",
      "holy-shit" => "emoticons/surprise.png",
      "wot" => "emoticons/surprise.png",
      "omg" => "emoticons/surprise.png",
      "surprised" => "emoticons/surprise.png",
      "surprising" => "emoticons/surprise.png",
      "what" => "emoticons/what.png",
      "win" => "emoticons/win.png",
      "won" => "emoticons/win.png",
      "angry" => "emoticons/angry.png",
      "drunken" => "emoticons/drunken.png",
      "wasted" => "emoticons/drunken.png",
      "shit-faced" => "emoticons/drunken.png",
      "blasted" => "emoticons/drunken.png",
      "fuck-eyed" => "emoticons/drunken.png",
      "blind" => "emoticons/drunken.png",
      "call" => "emoticons/call.png",
      "phone" => "emoticons/call.png",
      ################ New Emoticons ###################
      "bear_avatar" => "emoticons/bear_avatar.png",
      "bear_avatar_background" => "emoticons/bear_avatar_background.png",
      "die" => "emoticons/die.png",
      "driving" => "emoticons/driving.png",
      "eat" => "emoticons/eat.png",
      "exercise" => "emoticons/exercise.png",
      "good" => "emoticons/good.png",
      "hallelujah" => "emoticons/hallelujah.png",
      "laugh" => "emoticons/laugh.png",
      "name" => "emoticons/name.png",
      "peng_avatar_background" => "emoticons/peng_avatar_background.png",
      "peng_avatar" => "emoticons/peng_avatar.png",
      "punch" => "emoticons/punch.png",
      "seal_avatar" => "emoticons/seal_avata.png",
      "seal_avatar_background" => "emoticons/seal_avata_background.png",
      "shopping" => "emoticons/shopping.png",
      "stress" => "emoticons/stress.png",
      "sunny" => "emoticons/sunny.png"
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
