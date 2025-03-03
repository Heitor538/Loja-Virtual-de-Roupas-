let Camisetas = document.querySelectorAll('.cmq');
let carrinho = document.getElementById("carrinho");
let totalcart = document.getElementById("totalcart");
let inputEndereco = document.getElementById("inputendereco");
let buttfiish = document.getElementById("buttfiish");
let overlay = document.getElementById("overlay");
let modalCart = document.getElementById("modalcart");
let closeCart = document.getElementById("closeCart");

let cart = [];

// Adicionar produto ao carrinho
Camisetas.forEach(button => {
    button.addEventListener("click", function (event) {
        let item = event.target;
        let name = item.getAttribute("data-name");
        let price = parseFloat(item.getAttribute("data-price"));

        addToCart(name, price);
        showAddedMessage();
    });
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    let list = "";
    let total = 0;

    cart.forEach((item, index) => {
        list += `
            <div>
                <p>${item.name} - ${item.quantity}x - R$ ${item.price.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remover</button>
            </div>
        `;
        total += item.price * item.quantity;
    });

    carrinho.innerHTML = list || "<p>Seu carrinho está vazio.</p>";
    totalcart.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Remover item do carrinho
function removeItem(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    updateCart();
}

// Mostrar mensagem reativa de item adicionado
let produtoAdicionado = document.createElement('div');
produtoAdicionado.id = "produtoAdicionado";
produtoAdicionado.textContent = "Produto Adicionado ao Carrinho!";
document.body.appendChild(produtoAdicionado);

function showAddedMessage() {
    produtoAdicionado.classList.add("show");
    setTimeout(() => {
        produtoAdicionado.classList.remove("show");
    }, 2000);
}

// Toggle carrinho
let toggleCart = document.getElementById("toggleCart");
toggleCart.addEventListener("click", function () {
    modalCart.classList.toggle("active");
    overlay.classList.toggle("active");
});

// Fechar carrinho
closeCart.addEventListener("click", function () {
    modalCart.classList.remove("active");
    overlay.classList.remove("active");
});

// Fechar carrinho clicando fora
overlay.addEventListener("click", function () {
    modalCart.classList.remove("active");
    overlay.classList.remove("active");
});

// Validação do endereço e integração com WhatsApp
buttfiish.addEventListener("click", function () {
    if (cart.length === 0 || inputEndereco.value.trim() === "") {
        inputEndereco.classList.add("input-erro");
        document.getElementById("cartconform").classList.add("texto-erro");
    } else {
        let mensagem = `*Pedido de Compra*\n\n`;

        cart.forEach(item => {
            mensagem += `${item.name} - ${item.quantity}x - R$ ${item.price.toFixed(2)}\n`;
        });

        mensagem += `\n*Total:* R$ ${getTotal().toFixed(2)}\n\n`;
        mensagem += `*Endereço para entrega:* ${inputEndereco.value.trim()}`;

        let numeroWhatsApp = '5544988675936'; 
        let url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        // Redireciona para o WhatsApp com a mensagem
        window.open(url, '_blank');
    }
});

// Retirar o erro quando o usuário começa a digitar
inputEndereco.addEventListener("input", function () {
    if (inputEndereco.value.trim() !== "") {
        inputEndereco.classList.remove("input-erro");
        document.getElementById("cartconform").classList.remove("texto-erro");
    }
});

// Função para calcular o total do carrinho
function getTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    return total;
}
