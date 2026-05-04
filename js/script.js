let cart = [];

// 1. INVENTARIO MAESTRO (Aquí añades tus productos una sola vez)
const inventaire = {
    "Collier de fleur": "COL-001",
    "Bracelet chic": "BRA-001",
    "Bracelet de cheville": "CHE-001",
    "Collier papillon": "COL-002",
    "Bracelet du vis": "BRA-002",
    "Bracelet perlé": "BRA-003",
    "Collier lune": "COL-003",
    "Bracelet doré": "BRA-004"
};

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    if (panel) panel.classList.toggle("active");
}

// 2. AGREGAR AL CARRITO (Detecta el ID automáticamente)
function addToCart(product, price) {
    const id = inventaire[product] || "ID-GENERICO"; // Busca el ID en el inventario
    cart.push({ id, product, price });
    
    document.getElementById("cart-count").innerText = cart.length;
    renderCart();
    document.getElementById("cart-panel").classList.add("active");
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

    emptyMessage.style.display = "none";
    if (payBtn && (!checkoutForm || checkoutForm.style.display !== "block")) {
        payBtn.style.display = "block";
    }

    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span><strong>[${item.id}]</strong> ${item.product}</span>
            <span>€${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">x</button>
        `;
        itemsList.appendChild(li);
        total += item.price;
    });

    totalText.textContent = `Total: €${total.toFixed(2)}`;
}

// 3. ENVÍO DE EMAIL AUTOMATIZADO
function sendEmail() {
    const name = document.getElementById("customer-name-order").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

    if (!name || !phone || !address) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Preparamos la lista de productos exactamente como la pide tu HTML ({{#orders}})
    const listaProductos = cart.map(item => ({
        name: item.product,
        units: 1, // Puedes cambiar esto si añades cantidad más adelante
        price: item.price.toFixed(2),
        image_url: "https://tudominio.com/" + item.img // URL completa de la imagen
    }));

    const totalCalculado = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const templateParams = {
        from_name: name,
        email: "cliente@correo.com", // Aquí puedes pedir el email al cliente si quieres
        order_id: Math.floor(Math.random() * 1000000),
        orders: listaProductos, // Esto llena el bloque {{#orders}}
        "cost.shipping": "0.00",
        "cost.tax": "0.00",
        "cost.total": totalCalculado,
        phone: phone,
        address: address
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(() => {
            alert("Commande confirmée !");
            cart = [];
            renderCart();
            window.location.reload();
        });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById("cart-count").innerText = cart.length;
    renderCart();
}

function showCheckoutForm() {
    const form = document.getElementById("checkout-form");
    const payBtn = document.getElementById("pay-button");
    if (form && payBtn) {
        form.style.display = "block";
        payBtn.style.display = "none";
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}