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
          var $chat = $('<li/>'); // update the page with the response somehow
          var $chatLink = $('<a/>');
          $chatLink.attr("href","/chats/" + response.id);
          $chatLink.text($chatLanguageText);
          var $deleteChat = $('<a/>');
          $deleteChat.attr("href","/chats/" + response.id);
          $deleteChat.attr("data-method","delete");
          $deleteChat.text("Remove");
          $chat.append($chatLink);
          $chat.append(" ");
          $chat.append($deleteChat);
          $('#my_chats').prepend($chat);
          console.log($deleteChat);
          console.log(response);
        }
        });

    };

  $('#create_new_chat').on('click', createChat)

});