


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

var acessos = new Array();


$('#add-plus-acesso').on('click', function(){
    var plusAc = $('#plus-acesso').val();
    if(plusAc != ''){
        acessos.push(plusAc);
        $('#plus-acesso').val('');
    }

})


function sendLocal(event) {
    event.preventDefault();


    var nome = $('#nome').val();
    var descricao = $('#descricao').val();
    var latitude = $('#fakeLat').val();
    var longitude = $('#fakeLng').val();
    var tipo = $('#select-tipo').val();


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
    $('c:checked').each(function () {
        acessos.push($(this).val());
    });

    $('#add-plus-acesso').on('click', function(){
        var plusAc = $('#plus-acesso').val();

        acessos.push(plusAc);

        console.log(acessos);
    })

    var Local = { Nome: nome, Latitude: latitude, Longitude: longitude, Tipo: tipo, Descricao: descricao, Acessos: acessos };

    console.log(acessos);
    var url = "http://localhost:5000/Locais";

    $.ajax({

        url: url,
        type: 'POST',
        datatype: "json",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: Local,
        success: function (data) {
            console.log(data);
            if(data.success) {
                swal('Obrigado', data.message,'success');
                $('#formMap')[0].reset();
            } else {
                swal('Oops', "Algo deu errado, tente novamente",'error');
            }
            
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            swal('Oops', "Algo deu errado, tente novamente",'error');
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



function deletePLace() {

    var id = $()
    
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/locais?id='+id
    })
    .done(function (response) {
        console.log(response);
    })
    .fail(function (xhr, textStatus, errorThrown) {
        alert("Erro de conexão", xhr.responseText);
    });
}



function openForm() {
    $('#section-form').show();
}


function cadastrar(e) {
    e.preventDefault();

    var name = $('#login-name').val();
    var password = $('#login-password').val();

    console.log(name + password);

    var url = "http://localhost:5000/usuarios/cadastrar";
    var usuario = { nome: name, senha: password };
    
    $.ajax({

        url: url,
        type: 'POST',
        datatype: "json",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: usuario,
        success: function (data) {
            console.log(data);
            // if(data.success) {
            //     swal('Obrigado', data.message,'success');
            //     $('#formMap')[0].reset();
            // } else {
            //     swal('Oops', "Algo deu errado, tente novamente",'error');
            // }
            
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            swal('Oops', "Algo deu errado, tente novamente",'error');
        }
    });
}



function logar(e) {
    e.preventDefault();

    var name = $('#log-name').val();
    var password = $('#log-password').val();

    console.log(name + password);

    var url = "http://localhost:5000/usuarios/login";
    var usuario = { nome: name, senha: password };
    
    $.ajax({

        url: url,
        type: 'POST',
        datatype: "json",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        data: usuario,
        success: function (data) {
            console.log(data);
            // if(data.success) {
            //     swal('Obrigado', data.message,'success');
            //     $('#formMap')[0].reset();
            // } else {
            //     swal('Oops', "Algo deu errado, tente novamente",'error');
            // }
            
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            swal('Oops', "Algo deu errado, tente novamente",'error');
        }
    });
}