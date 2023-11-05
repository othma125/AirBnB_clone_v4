/* global $ */
$(document).ready(() => {
  $.get("http://localhost:5001/api/v1/status/", (data) => {
    // If the status is "OK", add the "available" class to the div#api_status
    if (data.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      // Otherwise, remove the "available" class from the div#api_status
      $("div#api_status").removeClass("available");
    }
  });
  let clicked = [];
  $(":checkbox").on("click", function () {
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
