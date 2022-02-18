var dados;

document.getElementById("btn").addEventListener("click", buscarPersonagem);

function buscarPersonagem() {
  let nome = document.getElementById("nome").value;

  let url =
    "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + nome;
  let public_key = "0f8230f770b6f6edd0023f74359244e2";
  let private_key = "31efe53ef53a906ff236074a0dc4a444e3fce4ff";
  let ts = new Date().getTime();
  url += "&apikey=" + public_key;
  url += "&ts=" + ts;
  const hash = CryptoJS.MD5(ts + private_key + public_key);
  url += "&hash=" + hash;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      dados = data;
      exibeResultadoBusca();
      console.log(data);
    })
    .catch(console.error);
}

function exibeResultadoBusca() {
  let resultado_busca = document.getElementById("resultado_busca");
  let lista = dados.data.results;
  let ul = document.createElement("ul");
  ul.className = "lista";
  for (let i = 0; i < lista.length; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    li.className = "textinho";
    img.className = "icon";
    img.src =
      lista[i].thumbnail.path +
      "/standard_medium." +
      lista[i].thumbnail.extension;
    li.appendChild(img);
    li.innerHTML += lista[i].name;
    li.addEventListener("click", function () {
      mostraPersonagem(lista[i].id);
    });
    ul.appendChild(li);
  }
  resultado_busca.innerHTML = "";
  resultado_busca.appendChild(ul);
}

function mostraPersonagem(id) {
  let lista = dados.data.results;
  let char = lista.filter(function (element) {
    return element.id == id;
  })[0];

  document.getElementById("char").innerHTML = char.name;
  document.getElementById("thumb").src =
    char.thumbnail.path + "/portrait_xlarge." + char.thumbnail.extension;
  document.getElementById("info").innerHTML = char.description;
}
