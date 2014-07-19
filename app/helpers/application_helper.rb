module ApplicationHelper

  def smartnav
    links = link_to('Home', root_path) + " "
    if @current_user
      links += link_to('Games', games_path) + " "
      links += link_to('Chats', chats_path) + " "
      links += link_to("Settings", edit_user_path(@current_user.id)) + " "
      links += link_to("Logout #{@current_user.username}", login_path, :method => :delete)
    else
      links += link_to('Login', login_path) + " "
      links += link_to('Sign up', new_user_path)
    end
    links
  end

end
