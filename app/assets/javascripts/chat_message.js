$(document).ready(function(){

    var createChatMessage = function(event) {
      event.preventDefault();
      var $inputText = $('#input_text').val();
      $.ajax({
        url: '/chats/81/messages',
        method: 'post',
        dataType: 'json',
        data: {
          input_text: $inputText,
        },
        success: function (response) {
          console.log(response);// update the page with the response somehow
          var $newMsg = $('<li/>');
          $newMsg.text(response.created_at + ": "+ response.input_text);
          $('#chat_messages').append($newMsg);
        }
      });

    };

  $('#speak').on('click', createChatMessage);

});

