class MessagesController < ApplicationController

  def index
    @messages = @current_user.messages
  end

  def new
    @message = Message.new
  end

  def create
    @message = Message.create :input_text => params[:input_text]
    # raise params.inspect
    if @message.save
      # @current_user.messages << @message
      # raise params.inspect
      if params[:chat_id]
        chat = Chat.find params[:chat_id]
        chat.messages << @message
        @current_user.chats << chat
        redirect_to chat_path(chat.id)
        # @message.translate_text
        # render :json => @message
      elsif params[:game_id]
        game = Game.find params[:game_id]
        game.messages << @message
        @current_user.game << game
      end
    end
    # render :json
  end

  def edit
    @message = Message.find params[:id]
  end

  def show
    @message = Message.find params [:id]
  end

  def update
    message = Message.new
    message = Message.find params[:id]
    message.save
    redirect_to message_path
  end

  def destroy
    message = Message.find params[:id]
    message.destroy
    redirect_to message_path
  end

  private
    def message_params
    end
end
