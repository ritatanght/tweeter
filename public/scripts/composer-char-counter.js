// Display the remaining characters for the new tweet form
// Render in RED with the invalid class when the textarea has more than 140 characters
$("document").ready(function() {
  $("textarea").on("keyup", function () {
    let remainingChar = 140 - this.value.length;
    const counter = $(this).parent().find(".counter");

    counter.text(remainingChar);
    // Add the invalid class to the counter output when the remaining character is less than 0
    remainingChar < 0
      ? counter.addClass("invalid")
      : counter.removeClass("invalid");
  });

  // Reset the character count to be 140 upon form submission
  $("form").submit(function() {
    $(this).find(".counter").text(140);
  });
});
