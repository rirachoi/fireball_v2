$(document).ready(function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 0);
  var $currentChatId = $('#chat_id').text();

    var createChatMessage = function(event) {
      event.preventDefault();
      var $inputText = $('#input_text').val();
      if ($inputText === ''){
        return false
      } else {

        $.ajax({
          url: '/chats/' + $currentChatId + '/messages',
          method: 'post',
          dataType: 'json',
          data: {
            input_text: $inputText,
          },
          success: function (response) {
            var $chatBox = $('<div/>');
            $chatBox.attr('id', 'chat_box');
            $chatBox.addClass('animation-target');
            var $newMsg = $('<li/>');
            $newMsg.text(response.created_at + ": "+ response.input_text);
            var $newTranslation = $('<li/>');
            $newTranslation.addClass('translation');
            $newTranslation.text(response.translation);
            $newMsg.appendTo($chatBox);
            $newTranslation.appendTo($chatBox);
            $('#chat_messages').append($chatBox);
            $('#input_text').val('').focus();
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
          }
        });
      };
    };

  $('#speak').on('click', createChatMessage);
  $('#scroll-to-top').on('click', function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
  $('#chat_id').on('keyup', function(event) {
    if (event.which == 13) {
      createChatMessage();
    }
  });

});

