class GamesController < ApplicationController
  before_action :check_if_logged_in

  def index
    @games = @current_user.games.order(updated_at: :desc)
  end

  def create
    game = Game.create :language => params[:language]
    @current_user.games << game
    render :json => game
  end

  def show
    @game = Game.find params[:id]
  end

  def destroy
    @game = Game.find params[:id]
    @game.destroy
    render :text => 'very wow'
  end

  private
  def game_params

  end
end