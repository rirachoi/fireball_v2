module ApplicationHelper

  def smartnav

    links = '<li>' + link_to('Home', root_path) + "</li>"

    if @current_user
      links += "<li>" + link_to('Games', games_path) + " " + "</li>"
      links += "<li>" + link_to('Chat to FireBall', chats_path) + " " + "</li>"
      links += "<li>" + link_to("Settings", edit_user_path(@current_user.id)) + " " + "</li>"
      links += "<li>" + "You are speaking " + LANGUAGES.invert[@current_user.native_language] + "</li>"
      links += "<li>" + link_to("Logout #{@current_user.username}", login_path, :method => :delete) + "</li>"
    else
      links += "<li>" + link_to('Login', login_path) + " " + "</li>"
      links += "<li>" + link_to('Sign up', new_user_path) + "</li>"
    end
    links
  end

end
