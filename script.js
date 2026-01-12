const lista = document.getElementById("lista");

const contador = document.getElementById("contador");
let total = 0;

function atualizarContador() {
  contador.textContent = "Total: " + total;
}


document.getElementById("treinar").onclick = function () {
  adicionarItem("Treinar");
};

document.getElementById("ler").onclick = function () {
  adicionarItem("Ler");
};

document.getElementById("estudar").onclick = function () {
  adicionarItem("Estudar");
};

function salvarDados() {
  const itens = [];

  document.querySelectorAll("li").forEach(li => {
    itens.push({
      texto: li.textContent,
      feito: li.classList.contains("feito")
    });
  });

  localStorage.setItem("atividades", JSON.stringify(itens));
}

function carregarDados() {
  const dados = localStorage.getItem("atividades");
  if (!dados) return;

  const itens = JSON.parse(dados);

  itens.forEach(item => {
    adicionarItem(item.texto, item.feito);
  });
}

function adicionarItem(texto, feito = false) {
  const li = document.createElement("li");
  li.textContent = texto;

  if (feito) {
    li.classList.add("feito");
  }

  total++;
  atualizarContador();

  li.onclick = function () {
    li.classList.toggle("feito");
    salvarDados();
  };

  li.ondblclick = function () {
    li.remove();
    total--;
    atualizarContador();
    salvarDados();
  };

  lista.appendChild(li);
  salvarDados();
}

carregarDados();

const botaoTema = document.getElementById("tema");

botaoTema.onclick = function () {
  document.body.classList.toggle("dark");
  salvarTema();
};

function salvarTema() {
  const temaAtual = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("tema", temaAtual);
}

function carregarTema() {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
  }
}

carregarTema();
