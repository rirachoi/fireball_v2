class MessagesController < ApplicationController

  def index
    @messages = @current_user.messages
  end

  def new
    @message = Message.new
  end

  def create
    @message = Message.create
    if @message.save
      @current_user.messages << @message
      if params[:game_id]
        game = Game.find params[:game_id]
        game.messages << @message
      end
      if params[:chat_id]
        game = Game.find params[:chat_id]
        game.messages << @message
      end
    end

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
