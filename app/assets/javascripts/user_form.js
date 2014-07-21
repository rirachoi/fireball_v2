$(document).ready(function(){
    $('input, textarea').each(function(){
      $(this).on('focus', function(){
        $(this).parent().find('label').addClass('active');
        $(this).parent().find('input').addClass('active');
      });
      $(this).on('blur', function(){
        $(this).parent().find('input').removeClass('active');
        $(this).parent().find('label').removeClass('active');
      });
  });
});