function changeImage(el) {
  document.getElementById("mainImage").src = el.src;
}


// ===============================
// VARIÁVEIS
// ===============================
let selectedSize = null;
let selectedColor = null;
let quantidade = 1;
let unitPrice = 0;

const pricesBySize = {
  P: 99.90,
  M: 129.90,
  G: 159.90,
  GG: 189.90
};

const priceElement = document.querySelector('.product-price');
const qtyInput = document.getElementById('quantity');

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const btnAddToCart = document.getElementById('addToCart');

// ===============================
// SELEÇÃO DE TAMANHO
// ===============================
document.querySelectorAll('.size-option').forEach(option => {
  option.addEventListener('click', () => {

    document.querySelectorAll('.size-option')
      .forEach(s => s.classList.remove('selected'));

    option.classList.add('selected');

    tamanhoSelecionado = option.dataset.size;

    calculateTotalPrice();
  });
});

// ===== TAMANHO SELECIONADO =====
const sizeOptions = document.querySelectorAll('.size-option');

let tamanhoSelecionado = null;

sizeOptions.forEach(option => {
  option.addEventListener('click', () => {

    // remove seleção de todos
    sizeOptions.forEach(s => s.classList.remove('selected'));

    // adiciona no clicado
    option.classList.add('selected');

    // salva tamanho
    tamanhoSelecionado = option.dataset.size;

    console.log('Tamanho selecionado:', tamanhoSelecionado);
  });
});





// ===============================
// SELEÇÃO DE ESTAMPA (COR)
// ===============================
document.querySelectorAll('.color-option').forEach(option => {
  option.addEventListener('click', () => {

    document.querySelectorAll('.color-option')
      .forEach(c => c.classList.remove('selected'));

    option.classList.add('selected');

    estampaSelecionada = option.dataset.estampa;
  });
});

// ===== ESTAMPA SELECIONADA =====
const colorOptions = document.querySelectorAll('.color-option');

let estampaSelecionada = null;

colorOptions.forEach(option => {
  option.addEventListener('click', () => {

    // remove seleção de todas
    colorOptions.forEach(c => c.classList.remove('selected'));

    // adiciona na clicada
    option.classList.add('selected');

    // salva estampa
    estampaSelecionada = option.dataset.estampa;

    console.log('Estampa selecionada:', estampaSelecionada);
  });
});


// ===============================
// CONTROLE DE QUANTIDADE
// ===============================
document.getElementById('plus').addEventListener('click', () => {
  quantidade++;
  qtyInput.value = quantidade;
  calculateTotalPrice();
});

document.getElementById('minus').addEventListener('click', () => {
  if (quantidade > 1) {
    quantidade--;
    qtyInput.value = quantidade;
    calculateTotalPrice();
  }
});


function calculateTotalPrice() {
  if (!tamanhoSelecionado) return;

  const unitPrice = pricesBySize[tamanhoSelecionado];
  const total = unitPrice * quantidade;

  priceElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}


// ===============================
// ADICIONAR AO CARRINHO
// ===============================
document.getElementById('addCart').addEventListener('click', () => {

  if (!tamanhoSelecionado || !estampaSelecionada) {
    alert('Selecione o tamanho e a estampa');
    return;
  }

  const produto = {
    id: Date.now(),
    nome: document.querySelector('.product-title').innerText,
    tamanho: tamanhoSelecionado,
    estampa: estampaSelecionada,
    quantidade: quantidade,
    precoUnitario: pricesBySize[tamanhoSelecionado]
  };

  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert('Produto adicionado ao carrinho!');
});





