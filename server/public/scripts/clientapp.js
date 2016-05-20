$(document).ready(function () {
  console.log('hi');
  getZoo();

  $('#zooSubmit').on('click', postZoo);

});




//ajax functions
function getZoo(){
  $.ajax({
    type: 'GET',
    url: '/zoo',
    success: function (animals) {
      $('#zooList').empty();
      animals.forEach(function (animal) {
        appendAnimal(animal);
      });
    }
  });
}

function appendAnimal(animal) {
  $('#zooList').append('<div class="animals"></div>');
  var $el = $('#zooList').children().last();
  $el.append('<div> <h3>Currently there are ' + animal.amount + '   ' + animal.animal_type + 's in storage. :)</div>');
}

function postZoo(event) {
  event.preventDefault();

  var zoo = {};

  $.each($('#zooForm').serializeArray(), function (i, field) {
    zoo[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/zoo',
    data: zoo,
    success: function (data) {
      getZoo();
    },
  });
}
