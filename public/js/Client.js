$(function () {
  $("button[type=submit]").click(function(event) {
    var form = $("#form")
    if (form[0].checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.addClass('was-validated');
  });
})

function readURL1(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#upload_imagem1')
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}
function readURL2(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#upload_imagem2')
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

function readURL3(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#upload_imagem3')
              .attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function(){
  $('.date').mask('00/00/0000');
  $('.time').mask('00:00:00');
  $('.date_time').mask('00/00/0000 00:00:00');
  $('.cep').mask('00000-000');
  $('.phone').mask('0000-0000');
  $('.phone_with_ddd').mask('(00) 0000-0000');
  $('.phone_us').mask('(000) 000-0000');
  $('.mixed').mask('AAA 000-S0S');
  $('.cpf').mask('000.000.000-00', {reverse: true});
  $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
  $('.money').mask('000.000.000.000.000,00', {reverse: true});
  $('.money2').mask("#.##0,00", {reverse: true});
  $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
    translation: {
      'Z': {
        pattern: /[0-9]/, optional: true
      }
    }
  });
  $('.ip_address').mask('099.099.099.099');
  $('.percent').mask('##0,00%', {reverse: true});
  $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
  $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
  $('.fallback').mask("00r00r0000", {
      translation: {
        'r': {
          pattern: /[\/]/,
          fallback: '/'
        },
        placeholder: "__/__/____"
      }
    });
  $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
});

function limpa_formulário_cep() {
  $("#logradouro").val("");
  $("#bairro").val("");
  $("#cidade").val("");
  $("#estado").val("");
  $("#cep").val("");
}

function buscaCEP(valor) {
  var cep = valor.replace(/\D/g, '');

  if (cep != "") {
    var validacep = /^[0-9]{8}$/;

    if(validacep.test(cep)) {
      $("#logradouro").val("...");
      $("#bairro").val("...");
      $("#cidade").val("...");
      $("#estado").val("...");

      $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
        if (!("erro" in dados)) {
          $("#logradouro").val(dados.logradouro);
          $("#bairro").val(dados.bairro);
          $("#cidade").val(dados.localidade);
          $("#estado").val(dados.uf);
        } else {
          limpa_formulário_cep();
          Swal.fire({
            width: 400,
            icon: 'error',
            text: 'CEP não encontrado.',
            showConfirmButton: false,
            timer: 2000
          })
        }
      });
    } else {
      limpa_formulário_cep();
      Swal.fire({
        width: 400,
        icon: 'error',
        text: 'Formato de CEP inválido.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  } else {
    limpa_formulário_cep();
  }
}

$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() != 0) {
      $('#inicio_body').fadeIn()
    } else {
      $('#inicio_body').fadeOut()
    }
  })
  $('#inicio_body').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 800)
  })
})