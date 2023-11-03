/* global $ */
$(document).ready(() => {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: (data) => {
      // Loop through the result of the request and create an article tag representing a Place in the section.places
      for (const place of data) {
        const article = $('<article></article>').addClass('place');
        const titleBox = $('<div></div>').addClass('title_box');
        const title = $('<h2></h2>').text(place.name);
        const price = $('<div></div>')
          .addClass('price_by_night')
          .text(`$${place.price_by_night}`);
        titleBox.append(title).append(price);
        const information = $('<div></div>').addClass('information');
        const maxGuest = $('<div></div>')
          .addClass('max_guest')
          .text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
        const numberRooms = $('<div></div>')
          .addClass('number_rooms')
          .text(
            `${place.number_rooms} Bedroom${
              place.number_rooms !== 1 ? 's' : ''
            }`
          );
        const numberBathrooms = $('<div></div>')
          .addClass('number_bathrooms')
          .text(
            `${place.number_bathrooms} Bathroom${
              place.number_bathrooms !== 1 ? 's' : ''
            }`
          );
        information
          .append(maxGuest)
          .append(numberRooms)
          .append(numberBathrooms);
        const description = $('<div></div>')
          .addClass('description')
          .text(place.description);
        article.append(titleBox).append(information).append(description);
        $('section.places').append(article);
      }
    },
  });
  function searchPlaces() {
    const amenitiesIds = $(':checkbox:checked')
      .map(function () {
        return $(this).data('id');
      })
      .get();
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenitiesIds }),
      success: (data) => {
        $('section.places').empty();
        for (const place of data) {
          const article = $('<article></article>').addClass('place');
          const titleBox = $('<div></div>').addClass('title_box');
          const title = $('<h2></h2>').text(place.name);
          const price = $('<div></div>')
            .addClass('price_by_night')
            .text(`$${place.price_by_night}`);
          titleBox.append(title).append(price);
          const information = $('<div></div>').addClass('information');
          const maxGuest = $('<div></div>')
            .addClass('max_guest')
            .text(
              `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`
            );
          const numberRooms = $('<div></div>')
            .addClass('number_rooms')
            .text(
              `${place.number_rooms} Bedroom${
                place.number_rooms !== 1 ? 's' : ''
              }`
            );
          const numberBathrooms = $('<div></div>')
            .addClass('number_bathrooms')
            .text(
              `${place.number_bathrooms} Bathroom${
                place.number_bathrooms !== 1 ? 's' : ''
              }`
            );
          information
            .append(maxGuest)
            .append(numberRooms)
            .append(numberBathrooms);
          const description = $('<div></div>')
            .addClass('description')
            .text(place.description);
          article.append(titleBox).append(information).append(description);
          $('section.places').append(article);
        }
      },
    });
  }
  $.get('http://localhost:5001/api/v1/status/', (data) => {
    // If the status is "OK", add the "available" class to the div#api_status
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      // Otherwise, remove the "available" class from the div#api_status
      $('div#api_status').removeClass('available');
    }
  });
  let clicked = [];
  $(':checkbox').on('click', function () {
    const currentId = $(this).data('id'); // Correctly retrieve 'data-id' attribute
    if (clicked.indexOf(currentId) === -1) {
      clicked.push(currentId);
    } else {
      clicked = clicked.filter((item) => item !== currentId);
    }
    // Construct the list of names based on the 'clicked' array
    const text = [];
    $('.popover li input').each(function () {
      if (clicked.indexOf($(this).data('id')) !== -1) {
        text.push($(this).data('name'));
      }
    });
    if (text.length > 0) {
      $('.amenities h4').text(text.join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $('button').on('click', searchPlaces);
  let clickedAmenities = [];
  let clickedStates = [];
  let clickedCities = [];

  function updateDisplay() {
    const amenitiesText = [];
    const statesText = [];
    const citiesText = [];

    $('.amenities .popover li input').each(function () {
      if (clickedAmenities.includes($(this).data('id'))) {
        amenitiesText.push($(this).data('name'));
      }
    });
    $('.locations .popover li.states-item input').each(function () {
      if (clickedStates.includes($(this).data('id'))) {
        statesText.push($(this).data('name'));
      }
    });
    $('.locations .popover li.cities-item input').each(function () {
      if (clickedCities.includes($(this).data('id'))) {
        citiesText.push($(this).data('name'));
      }
    });

    $('.amenities h4').text(
      amenitiesText.length > 0 ? amenitiesText.join(', ') : '&nbsp;'
    );
    $('.locations h4').text([...statesText, ...citiesText].join(', '));
  }

  $(':checkbox').on('click', function () {
    const currentId = $(this).data('id');
    const currentType = $(this).closest('.popover').prev('h3').text().trim();

    switch (currentType) {
      case 'Amenities':
        handleCheckboxSelection(clickedAmenities, currentId);
        break;
      case 'States':
        handleCheckboxSelection(clickedStates, currentId);
        break;
      default: // Cities
        handleCheckboxSelection(clickedCities, currentId);
        break;
    }

    updateDisplay();
  });

  function handleCheckboxSelection(array, id) {
    const index = array.indexOf(id);
    if (index === -1) {
      array.push(id);
    } else {
      array.splice(index, 1);
    }
  }
});
