$(document).ready(function(){

  if ($('#user_search').length == 0) { // only runs this code on the user search page
    return false;
  }

  $("#user_search").autocomplete({
      source: _.pluck(all_users, 'username'),
      appendTo: '#friend_results'
    });

  var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if(arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value )){
           arr.splice(i,1);
       }
    }
    return arr;
  }

  var addFriend = function(event) {
    var $friendName = $('#user_search').val();
    if ($friendName == "") {
      return false;
    }
    $('#user_search').val("");
     $.ajax({
          url: '/friends/' + $friendName,
          method: 'post',
          dataType: 'json',
          data: {
            username: $friendName
          },
          success: function (response) {
            var $li = $('<li/>');
            var $a = $('<a/>');
            // removeByAttr(all_users, 'name', $friendName);
          }
        });

  };

  var approveFriend = function() {
    var $friendName = $(this).siblings('span').text();
    $.ajax({
      url: '/friends/' + $friendName + '/approve',
      method: 'post',
      dataType: 'json',
      data: {
        username: $friendName
      },
      success: function(response) {
        var $li = $('<li/>');
        var $a = $('<a/>');
        $a.text(response.username);
        $li.append($a);
        $('#friends').append($li);
        $(this).closest('li').remove();
      }
    });
  };

  var removeFriend = function() {
    var $friendName = $(this).siblings('span').text();
    $.ajax({
      url: '/friends/' + $friendName + '/approve',
      method: 'post',
      dataType: 'json',
      data: {
        "_method":"delete",
      },
      success: function(response) {
        $(this).closest('li').remove();
      }
    });
  };

  $('#search').on('submit', function(event){
    event.preventDefault();
  });


  $('#approve_friend').on('click', approveFriend);
  $('#add_friend_btn').on('click', addFriend);
  $('#user_search').on('keydown', function(event){
    if (event.which == 13) {
      addFriend();
    }
  });

});