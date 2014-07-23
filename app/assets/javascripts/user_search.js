$(document).ready(function(){

  $( "#user_search" ).autocomplete({
      source: _.pluck(all_users, 'username'),
      // appendTo: '#friend_results'
    });


});