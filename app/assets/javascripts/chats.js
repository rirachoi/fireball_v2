$(document).ready(function(){

    var createChat = function() {

      var $chatLanguage = $('#chat_language').val();
      var $chatLanguageText = $("#chat_language option:selected").text();
        $.ajax({
          url: '/chats',
          method: 'post',
          dataType: 'json',
          data: {
            language: $chatLanguage
          },
          success: function (response) {
            var $chat = $('<li/>');         // Add li for the new chat
            var $chatLink = $('<a/>');      // Add link for the new chat
            $chatLink.attr("href","/chats/" + response.id);
            $chatLink.text($chatLanguageText);
            var $deleteChat = $('<a/>');    // Add delete link
            $deleteChat.addClass('delete_chat');
            $deleteChat.attr("href","/chats/" + response.id);
            $deleteChat.text("Remove");
            $chat.append($chatLink);
            $chat.append(" ");
            $chat.append($deleteChat);
            $('#my_chats').prepend($chat);
          }
        });

    };

    var deleteChat = function(event) {
      event.preventDefault();
      var $this = $(this);
      $this.closest('li').remove();
      $.ajax({
        url: $this.attr('href'),
        method: 'post',
        dataType: 'json',
        data: {
          "_method":"delete",
        },
        success: function (response) {
          // var $removeLink = $('#my_chats').find(this); // Find the right LI to remove
        }
      });
      return false;
    };


  $('#create_new_chat').on('click', createChat);
  $('#my_chats').on('click', '.delete_chat', deleteChat);

});