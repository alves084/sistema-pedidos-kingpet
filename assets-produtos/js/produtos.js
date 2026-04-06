let cart = [];
let modalQt = 1;
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

//LISTAGENS DAS PIZZAS

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.sizes[0].price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;
        
        const product = pizzaJson[key];
        let defaultSizeIndex;
        if (product.sizes.length === 1) {
            defaultSizeIndex = 0;
        } else {
            defaultSizeIndex = product.sizes.findIndex(s => s.size === 'P');
            if (defaultSizeIndex === -1) {
                defaultSizeIndex = 0; // fallback para o primeiro tamanho
            }
        }
        const price = product.sizes[defaultSizeIndex].price;

        // Atualizar dados do modal
        c('.pizzaBig img').src = product.img;
        c('.pizzaInfo h1').innerHTML = product.name;
        c('.pizzaInfo--desc').innerHTML = product.description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${price.toFixed(2)}`;
        c('.pizzaInfo--qt').addEventListener('input', (e) => {
            if (e.target.value < 1) {
                e.target.value = 1;
            }
        });

        // Renderizar tamanhos dinamicamente
        renderSizes(product, defaultSizeIndex);

        // Abrir modal com animação
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    })

    c('.pizza-area').append(pizzaItem);
});

// Função para renderizar tamanhos dinamicamente
function renderSizes(product, defaultSizeIndex) {
    const sizesContainer = c('.pizzaInfo--sizes');
    sizesContainer.innerHTML = '';

    const isUnico = product.sizes.length === 1 && product.sizes[0].size === 'ÚNICO';

    product.sizes.forEach((sizeObj, sizeIndex) => {
        const sizeEl = document.createElement('div');
        sizeEl.className = 'pizzaInfo--size';
        sizeEl.dataset.key = sizeIndex;
        
        // Adicionar classe 'unico' se for tamanho único
        if (isUnico) {
            sizeEl.classList.add('unico');
        }
        
        // Selecionar por padrão o último tamanho
        if (sizeIndex === defaultSizeIndex) {
            sizeEl.classList.add('selected');
        }

        sizeEl.innerHTML = `${sizeObj.size} <span>R$ ${sizeObj.price.toFixed(2)}</span>`;
        sizesContainer.appendChild(sizeEl);

        // Adicionar evento de clique
        sizeEl.addEventListener('click', (e) => {
            c('.pizzaInfo--size.selected').classList.remove('selected');
            sizeEl.classList.add('selected');
            
            const selectedPrice = product.sizes[sizeIndex].price;
            c('.pizzaInfo--actualPrice').innerHTML = `R$ ${selectedPrice.toFixed(2)}`;
        });
    });
}

//MODAL EVENTS
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    let input = c('.pizzaInfo--qt');
    if (parseInt(input.value) > 1) {
        input.value--;
    }
});

c('.pizzaInfo--qtmais').addEventListener('click', () => {
    let input = c('.pizzaInfo--qt');
    input.value++;
});


// CART

c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = Number(c('.pizzaInfo--size.selected').dataset.key);
    let identifier = pizzaJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item) => item.identifier == identifier);
    if(key > -1){
        cart[key].qt += modalQt;
    } else {
    cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        size,
        qt:parseInt(c('.pizzaInfo--qt').value)
    });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart()
    closeModal();
});

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

//FUNCTION CART

function updateCart(){
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
            let itemPrice = pizzaItem.sizes[cart[i].size].price;

            subTotal += itemPrice * cart[i].qt;

            
            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName = pizzaItem.sizes[cart[i].size].size;
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCart();
            });

            c('.cart').append(cartItem);
        }

        total = subTotal;

        c('.subtotal span:last-child').innerHTML =`R$ ${subTotal.toFixed(2)}`;
        c('.total span:last-child').innerHTML =`R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}

