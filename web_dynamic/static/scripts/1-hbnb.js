// Script that listens for changes on each INPUT checkbox tag
$(document).ready(() => {
  const amenities = {};
  $('input[type="checkbox"]').change(() => {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    const amenitiesList = Object.values(amenities).join(', ');
    $('.amenities h4').text(amenitiesList);
  });
});
