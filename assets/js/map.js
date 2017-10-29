var map;
var modePin = false;

// $('#pin').on('click', function() {
//     initMap(true);
// })

function initMap(modePin) {
    
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
        url: 'http://localhost:5000/locais'
    })
    .done(function (response) {
        console.log(response);
        var locais = response.data;
        $.each(locais, function (index) {
            addMarker(locais[index]);
        });
    })
    .fail(function (xhr, textStatus, errorThrown) {
        alert("Erro de conexão", xhr.responseText);
    });


    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: { lat: parseFloat(props.latitude), lng: parseFloat(props.longitude)},
            //icon: 'assets/img/marker2.png',
            map: map
        });

        var cont = "";
        if (props.acessos) {
            props.acessos.forEach(function (value, index) {
                cont = cont + "<p>" + value + "</p>";
            });
        
        }
        
        if(props.tipo) {
            switch (props.tipo) {
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
                "<p><strong>" + props.nome + "</strong></p>" + 
                "<p><strong>O que há aqui?</strong><p>" +
                cont +
                "<p><strong>Mais detalhes: </strong>" + props.descricao + "</p>"
        });

        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        });
    }

    var input = document.getElementById('location-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

     //This event listener calls addMarker() when the map is clicked.
    
     if (modePin) {

        google.maps.event.addListener(map, 'click', function (e) {
            placeMarker(e.latLng, map);
            console.log(e.latLng.lat());
        });
    }

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
