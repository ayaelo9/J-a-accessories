let cart = [];

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    if (panel) panel.classList.toggle("active");
}

function addToCart(product, price) {
    cart.push({ product, price });
    
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.innerText = cart.length;

    renderCart();
    
    const panel = document.getElementById("cart-panel");
    if (panel) panel.classList.add("active");
}

// ESTA FUNCIÓN ES LA QUE ABRE EL CUESTIONARIO
function showCheckoutForm() {
    const form = document.getElementById("checkout-form");
    const payBtn = document.getElementById("pay-button");
    
    if (form && payBtn) {
        form.style.display = "block"; // Muestra el cuestionario
        payBtn.style.display = "none";  // Esconde el botón de Commander
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

function renderCart() {
    const itemsList = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("cart-empty");
    const totalText = document.getElementById("cart-total");
    const payBtn = document.getElementById("pay-button");
    const checkoutForm = document.getElementById("checkout-form");

    if (!itemsList || !emptyMessage || !totalText) return;

    itemsList.innerHTML = "";

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        totalText.textContent = "Total: €0.00";
        if (payBtn) payBtn.style.display = "none";
        if (checkoutForm) checkoutForm.style.display = "none"; 
        return;
    }

    // SI HAY PRODUCTOS:
    emptyMessage.style.display = "none";
    
    // Mostramos el botón de Commander, pero NO el formulario todavía
    if (payBtn && (!checkoutForm || checkoutForm.style.display !== "block")) {
        payBtn.style.display = "block";
    }

    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.innerHTML = `
            <span>${item.product}</span>
            <span>€${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">x</button>
        `;
        itemsList.appendChild(li);
        total += item.price;
    });

    totalText.textContent = `Total: €${total.toFixed(2)}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    const countEl = document.getElementById("cart-count");
    if (countEl) countEl.innerText = cart.length;
    renderCart();
}

// Función para confirmar pedido (Asegúrate de tenerla definida)
function sendEmail() {
    emailjs.send("service_id", "template_id", {
        to_email:"jeaaccessories76@gmail.com",
        product: "produit choisi"
    });
}