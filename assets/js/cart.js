const cartContainer = document.getElementById('cartContainer');


let carrinho = JSON.parse(localStorage.getItem('cart')) || [];

function renderCarrinho() {

  cartContainer.innerHTML = '';

  if (carrinho.length === 0) {
    cartContainer.innerHTML = '<p>Carrinho vazio</p>';
    return;
  }

  carrinho.forEach((item, index) => {

    const div = document.createElement('div');
    div.classList.add('cart-item');

    div.innerHTML = `
      <p><strong>Produto:</strong> ${item.nome}</p>
      <p><strong>Estampa:</strong> ${item.estampa}</p>
      <p><strong>Tamanho:</strong> ${item.tamanho}</p>
      <p><strong>Quantidade:</strong> ${item.quantidade}</p>
      <button onclick="removerItem(${index})">Remover</button>
      <hr>
    `;

    cartContainer.appendChild(div);
  });
}

function removerItem(index) {
  carrinho.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(carrinho));
  renderCarrinho();
}

renderCarrinho();


