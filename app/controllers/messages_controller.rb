class MessagesController < ApplicationController

  def index
    @messages = @current_user.messages.order(created: :desc)
  end

  def create
    @message = Message.create :input_text => params[:input_text], :user_id => @current_user.id
    if @message.save
      if params[:chat_id]
        chat = Chat.find params[:chat_id]
        chat.messages << @message
        chat.update_attribute(:updated_at, Time.now) # manually sets the updated_at column
        @message.match_emoticon # run the method called match_emoticon from inside the Message model
        @message.translate_text # run the method called translate_text from inside the Message model
        @message.get_audio
        @message.save
      elsif params[:game_id]
        game = Game.find params[:game_id]
        # game.answers.each do |answer|
        #   answer.
        # end
        game.messages << @message
        game.update_attribute(:updated_at, Time.now)
      end
    end
    render :json => @message #sends json obj back to the browser for ajax to use
  end

  def show
    @message = Message.find params[:id]
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render json: @message }
    end
  end

  def destroy
    message = Message.find params[:id]
    message.destroy
    redirect_to message_path
  end

end
