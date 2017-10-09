var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -3.786407, lng: -38.503781 },
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: {
            lat: -3.786407,
            lng: -3.786407
        },
        map: map
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:6209/Api/Local'
    })
        .done(function (data) {
            console.log(data);
            $.each(data, function (index) {
                addMarker(data[index]);
            });
        })
        .fail(function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
        });


    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: { lat: props.Latitude, lng: props.Longitude },
            //icon: 'assets/img/marker2.png',
            map: map
        });

        var cont = "";
        if (props.Acessos) {
            props.Acessos.forEach(function (value, index) {
                cont = cont + "<p>" + value.Descricao + "</p>";
            });
        
        }
        
        if(props.Tipo) {
            switch (props.Tipo) {
                case '1':
                    marker.setIcon('assets/img/marker-acesso.png');
                    break;
                case '2':
                    marker.setIcon('assets/img/marker-inacesso.png');
                    break;
                case '3':
                    marker.setIcon('assets/img/marker3.png');
                    break;

                default:
                    marker.setIcon('assets/img/marker3.png');
                    break;
            }
        }

        var infoWindow = new google.maps.InfoWindow({
            content: 
                "<p><strong>" + props.Nome + "</strong></p>" + 
                "<p><strong>O que há aqui?</strong><p>" +
                cont +
                "<p><strong>Mais detalhes: </strong>" + props.Descricao + "</p>"
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }

    var input = document.getElementById('location-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    /* This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function (e) {
        placeMarker(e.latLng, map);
        console.log(e);
    });*/

    function placeMarker(position, map) {
        var marker = new google.maps.Marker({
            position: position,
            map: map
        });
        map.panTo(position);
    }

    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();

        var bounds = new google.maps.LatLngBounds();
        var i, place;
        for (i = 0; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(15);
    });

    autocomplete = new google.maps.places.Autocomplete(document.getElementById('inputPost'));
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        console.log();
        $('#nome').val(place.name);
        geocode(place.formatted_address);

    });
}



function geocode(e) {
    var location = e;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: location,
            key: 'AIzaSyBXMFSH6UNNGXif4FFsxIEp_lTlTlcgnpI'
        }
    })
    .then(function (response) {
        var latitudeG = response.data.results[0].geometry.location.lat;
        var longitudeG = response.data.results[0].geometry.location.lng;


        $('#fakeLat').val(latitudeG);
        $('#fakeLng').val(longitudeG);
       
    })
    .catch(function (error) {
        console.log(error);
    });
   
}


$("#btnSend").on('click', sendLocal);

var acessos = [];

function sendLocal(event) {
    event.preventDefault();


    var nome = $('#nome').val();
    var descricao = $('#descricao').val();
    var latitude = $('#fakeLat').val();
    var longitude = $('#fakeLng').val();
    var tipo = $('#select-tipo').val();


    var acessos = new Array();

    switch (tipo) {
        case '1':
            $('.acesso:checked').each(function () {
                acessos.push($(this).val());
            });
            break;
        case '2':
            $('.inacesso:checked').each(function () {
                acessos.push($(this).val());
            });
            break;
        case '3':
            $('.instituicao:checked').each(function () {
                acessos.push($(this).val());
            });
            break;
        default:
            // statements_def
            break;
    }
    $('.acesso:checked').each(function () {
        acessos.push($(this).val());
    });

    var Local = { Nome: nome, Latitude: latitude, Longitude: longitude, Acessos: acessos, Descricao: descricao, Tipo: tipo };

    var url = "http://localhost:6209/Api/Local";

    $.ajax({

        url: url,
        type: 'POST',
        datatype: "json",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: Local,
        success: function (data) {
            console.log(data.response);
            $('#success').show();
            $('#formMap')[0].reset();
            
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            $('#error').show();
        }
    });
};





// Âncoras Suaves
$(".anchor").on("click", function(event){
    var ancora = $(this).attr("href");
    //return false;
    if (ancora[0] == '#'){
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $(ancora).offset().top
        }, 500);
    }
});





$( "#select-tipo" ).change(function() {

  switch($(this).val()) {
    case '1':
        $('#acessibilidade').show();
        $('#inacessibilidade').hide();
        $('#instituicao').hide();
        $('.inacesso').prop('checked', false);
        $('.instituicao').prop('checked', false);
        break;
    case '2':
        $('#inacessibilidade').show();
        $('#acessibilidade').hide();
        $('#instituicao').hide();
        $('.acesso').prop('checked', false);
        $('.instituicao').prop('checked', false);
        break;
    case '3':
        $('#instituicao').show();
        $('#inacessibilidade').hide();
        $('#acessibilidade').hide();
        $('.acesso').prop('checked', false);
        $('.inacesso').prop('checked', false);
        break;
    default:
        $('#acessibilidade').hide();
         $('#inacessibilidade').hide();
         $('#instituicao').hide();
         $('.acesso').prop('checked', false);
         $('.inacesso').prop('checked', false);
         $('.instituicao').prop('checked', false);
        break;
    }
});

