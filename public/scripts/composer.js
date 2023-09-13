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

  /**
   * (Stretch)
   * Make the 'Go To Top' button appear when the user starts to scroll and the nav button disappear
   */
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 120) {
      $(".compose-btn").hide();
      $(".top-btn").show();
    } else {
      $(".compose-btn").show();
      $(".top-btn").hide();
    }
  });

  // When clicked, the page should scroll to the top and the form should slide down with the textarea enabled.
  $(".top-btn").click(() => {
    $(window).scrollTop(0);
    $(".new-tweet").slideToggle("fast", function () {
      $(this).find("#tweet-text").focus();
    });
  });
});
