/* global $ */
$(document).ready(() => {
  let clicked = [];

  $(":checkbox").on("click", function () {
    // Use 'function()' instead of '() =>' to properly bind 'this'
    const currentId = $(this).data("id"); // Correctly retrieve 'data-id' attribute

    if (clicked.indexOf(currentId) === -1) {
      clicked.push(currentId);
    } else {
      clicked = clicked.filter((item) => item !== currentId);
    }

    // Construct the list of names based on the 'clicked' array
    const text = [];
    $(".popover li input").each(function () {
      if (clicked.indexOf($(this).data("id")) !== -1) {
        text.push($(this).data("name"));
      }
    });

    if (text.length > 0) {
      $(".amenities h4").text(text.join(", "));
    } else {
      $(".amenities h4").html("&nbsp;");
    }
  });
});
