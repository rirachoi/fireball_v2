$(document).ready(function(){

  if ($('#user_search').length == 0) {
    return false;
  }

  $("#user_search").autocomplete({
      source: _.pluck(all_users, 'username'),
      // appendTo: '#friend_results'
    });

  var addFriend = function(event) {
    var $friendName = $('#user_search').val();
    if ($friendName == "") {
      return false;
    }

     $.ajax({
          url: '/friends/' + $friendName,
          method: 'post',
          dataType: 'json',
          data: {
            username: $friendName
          },
          success: function (response) {
            console.log(response)
          }
        });

  };

  $('#search').on('submit', function(event){
    event.preventDefault();
    console.log('lelelel')
  });

  $('#add_friend_btn').on('click', addFriend);
  $('#user_search').on('keydown', function(event){
    if (event.which == 13) {
      addFriend();
    }
  });

});