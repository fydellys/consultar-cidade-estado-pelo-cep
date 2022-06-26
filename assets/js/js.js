let checkZipCode = document.querySelector('#checkZip');
    checkZipCode.addEventListener('click', function (e) {
      let fieldZip = document.querySelector('#zip');
      searchZip(fieldZip.value);
    });

    const searchZip = (zip) => {
      let check = false;
      if (zip.length < 8) {
        document.getElementById("message").innerHTML = '<div class="alert alert-danger" role="alert">Digite um CEP para encontrar a cidade e estado</div>';
        return
      };
      let url = 'https://viacep.com.br/ws/${cep}/json/'.replace('${cep}', zip);
      fetch(url)
        .then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              if (!json.erro) {
                let country = json.localidade;
                let state = json.uf;
                document.getElementById("country").value = country;
                document.getElementById("state").value = state;
                document.getElementById("flag").innerHTML = '<img class="icon icon-user" src="assets/flags/' + state + '.png" width="140" height="80">';
              } else {
                document.getElementById("message").innerHTML = '<div class="alert alert-danger" role="alert">CEP não encontrado. Digite novamente.</div>';
              }
            });
          }
        });
    }