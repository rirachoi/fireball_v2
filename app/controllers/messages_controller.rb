class MessagesController < ApplicationController

  def index
    @messages = @current_user.messages.order(created: :desc)
  end

  def create
    @message = Message.create :input_text => params[:input_text], :user_id => @current_user.id
    if @message.save
      chat = Chat.find params[:chat_id]
      chat.messages << @message
      chat.update_attribute(:updated_at, Time.now) # manually sets the updated_at column
      @message.match_emoticon # run the method called match_emoticon from inside the Message model
      @message.translate_text # run the method called translate_text from inside the Message model
      @message.get_audio
      @message.save
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
