class GamesController < ApplicationController

  def index
    @games = @current_user.games.order(updated_at: :desc)
  end

  def create
    @game = Game.create :language => params[:language]
    @current_user.games << @game
    render :json
  end

  def new
    @game = Game.new
  end

  def edit
    @game = Game.find params[:id]
  end

  def show
    @game = Game.find params[:id]
  end

  def update # NEEDS MORE THINGS!!!!!
    @game = Game.new
    @game = Game.find params[:id]
    @game.save
    redirect_to games_path
  end

  def destroy
    @game = Game.find params[:id]
    @game.destroy
    redirect_to games_path
  end

  private
  def game_params

  end
end