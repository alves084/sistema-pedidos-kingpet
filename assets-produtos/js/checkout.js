// ===============================
// GERAR MENSAGEM
// ===============================
function gerarMensagem(nome, telefone, carrinho) {
  let mensagem = `*NOVO PEDIDO*%0A%0A`;

  mensagem += `Nome: ${nome}%0A`;
  mensagem += `Telefone: ${telefone}%0A%0A`;

  mensagem += `Pedido:%0A`;

  let total = 0;

  carrinho.forEach(item => {
    // Busca o produto em pizzaJson usando o id
    const produto = pizzaJson.find(p => p.id == item.id);
    
    if (!produto) return;

    // Obtém o nome do produto
    const nomeProduto = produto.name;

    // Obtém o tamanho formatado
    const tamanho = produto.sizes[item.size].size;

    // Obtém o preço do tamanho específico
    const preco = produto.sizes[item.size].price;

    const subtotal = preco * item.qt;
    total += subtotal;

    mensagem += `- ${nomeProduto} (${tamanho}) x${item.qt} = R$ ${subtotal.toFixed(2)}%0A`;
  });

  mensagem += `%0A Total: R$ ${total.toFixed(2)}`;

  return mensagem;
}


// ===============================
// FINALIZAR PEDIDO
// ===============================
document.getElementById('finalizarPedido').addEventListener('click', () => {

  const nome = document.getElementById('nomeCliente').value.trim();
  const telefone = document.getElementById('telefoneCliente').value.trim();
  
  const carrinho = JSON.parse(localStorage.getItem('cart')) || [];

  if (!nome || !telefone) {
    alert('Preencha nome e telefone');
    return;
  }

  // Formata o telefone para o padrão brasileiro
  const telefoneFormatado = telefone.replace(/\D/g, ''); // Remove tudo que não for número

  // Validação de celular brasileiro: DDD + 9 dígitos = 11 dígitos
  if (telefoneFormatado.length !== 11) {
    alert('Digite um celular com 11 dígitos (DDD + 9 dígitos). Ex: 81999998888');
    document.getElementById('telefoneCliente').focus();
    return;
  }

  // Opcional: força celular começando com 9 (padrão móvel no Brasil)
  if (!/^\d{2}9\d{8}$/.test(telefoneFormatado)) {
    alert('Digite um celular válido (DDD + 9 dígitos começando com 9). Ex: 81999998888');
    document.getElementById('telefoneCliente').focus();
    return;
  }

  if (carrinho.length === 0) {
    alert('Carrinho vazio');
    return;
  }

  const numeroEmpresa = "5581993827848"; // 🔥 COLOCA SEU NÚMERO AQUI

  const mensagem = gerarMensagem(nome, telefone, carrinho);

  const url = `https://wa.me/${numeroEmpresa}?text=${mensagem}`;

  // abre WhatsApp
  window.open(url, '_blank');

  // limpa carrinho depois
  localStorage.removeItem('cart');
});