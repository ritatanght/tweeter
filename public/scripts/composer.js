$(document).ready(() => {
  /**
   * (Stretch) the 'compose' btn in the nav can toggle the new-tweet session sliding up or down
   *  focus on the textarea automatically upon the form slides down
   */
  $(".compose-btn").click(() => {
    $(".new-tweet").slideToggle("fast", function () {
      $(this).find("#tweet-text").focus();
    });
  });

});
