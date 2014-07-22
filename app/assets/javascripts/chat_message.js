$(document).ready(function(){
  if ($('#input_text').length == 1){ // makes sure that it only scrolls down on chat pages
    $("html, body").animate({ scrollTop: ($(document).height() + $(window).height()) }, 500);
  };

  var $currentChatId = $('#chat_id').text();

    var createChatMessage = function(event) {
      event.preventDefault();
      var $inputText = $('#input_text').val();

      var $chatBox = $('<div/>');
      $chatBox.attr('id', 'chat_box');
      $chatBox.addClass('animation-target left');
      var $newMsg = $('<li/>');
      $newMsg.text( $inputText );
      $newMsg.appendTo($chatBox);
      $('#chat_messages').append($chatBox);

      if ($inputText === ''){
        return false;
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
            $chatBox.addClass('animation-target right');

            var $newTimestamp = $('<li/>');
            $newTimestamp.addClass('timestamp');
            $newTimestamp.text( moment().format('lll') + ":");

            var $newMsg = $('<li/>');
            $newMsg.text( response.input_text );

            var $newTranslation = $('<li/>');
            $newTranslation.addClass('translation');
            $newTranslation.text(response.translation);

            $newImg = $('<img/>');
            $newImg.addClass('sticker');
            $newImg.attr("src", "/assets/"+response.image);
            // assests need to remove when we depoloy it!!

            // add span with msg id
            var $newSound = $('<li/>');
            var $newMsgID = $('<span/>');
            $newMsgID.addClass('invisible msg_id');
            $newMsgID.text(response.id);

            var $newPlayButton = $('<button/>');
            $newPlayButton.addClass('play_sound')
            $newPlayButton.text('►');

            $newSound.append($newMsgID);
            $newSound.append($newPlayButton);

            $newImg.appendTo($chatBox);
            $newTimestamp.appendTo($chatBox);
            $newMsg.appendTo($chatBox);
            $newTranslation.appendTo($chatBox);
            $newSound.appendTo($chatBox);
            $('#chat_messages').append($chatBox);
            $('#input_text').val('').focus();
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
          }
        });
      };

    };

  var playSound = function() {
    var $currentMsg = $(this).siblings('span').text();
    if ($('iframe').length > 1) { // removes the sound box if there are any at the time
      $('iframe').remove();
    }
    $('#input_text').val('').focus();

    $.ajax({
      url: '/messages/' + $currentMsg + ".json", // gets the json obj of the message
      method: 'get',
      dataType: 'json',
      data: {
      },
      success: function (response) {
        var $embed =  $('<iframe/>'); // makes a new iframe
        $embed.attr('src', response.sound); // sets the iframe src to the response sound
        $embed.addClass('invisible'); // makes it inivisible
        $embed.appendTo($('body')); // appends it to the body
      }
    });

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
  $('#chat_messages').on('click', '.play_sound', playSound);

});

