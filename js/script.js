let cart = [];

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

function renderCart() {
    const itemsList = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("cart-empty");
    const totalText = document.getElementById("cart-total");

    if (!itemsList || !emptyMessage || !totalText) {
        return;
    }

    itemsList.innerHTML = "";

    const checkoutForm = document.getElementById("checkout-form");

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        totalText.textContent = "Total: €0.00";
        if (checkoutForm) {
            checkoutForm.classList.remove("visible");
        }
        return;
    }

    emptyMessage.style.display = "none";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
            <span>${item.product}</span>
            <span>€${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        itemsList.appendChild(li);
        total += item.price;
    });

    totalText.textContent = `Total: €${total.toFixed(2)}`;
}

function addToCart(product, price) {
    cart.push({ product, price });
    updateCartCount();
    renderCart();
    const panel = document.getElementById("cart-panel");
    if (panel && !panel.classList.contains("active")) {
        panel.classList.add("active");
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

let currentCategory = "all";

function toggleCart() {
    const panel = document.getElementById("cart-panel");
    if (!panel) {
        return;
    }
    panel.classList.toggle("active");
}

function checkout() {
    if (cart.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.classList.toggle("visible");
        checkoutForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function confirmOrder() {
    const name = document.getElementById("customer-name-order").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || "cash";

    if (!name || !phone || !address) {
        alert("Veuillez compléter vos informations avant de payer.");
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const order = {
        name,
        phone,
        address,
        paymentMethod,
        total,
        items: cart.map(item => ({ product: item.product, price: item.price }))
    };

    if (paymentMethod === "card") {
        sessionStorage.setItem("cardPaymentOrder", JSON.stringify(order));
        cart = [];
        updateCartCount();
        renderCart();
        window.location.href = "card-payment.html";
        return;
    }

    const paymentLabel = "espèces";
    alert(`Commande pour ${name}\nTéléphone : ${phone}\nAdresse : ${address}\nPaiement : ${paymentLabel}\nTotal : €${total.toFixed(2)}\n\nMerci pour votre commande !`);

    cart = [];
    updateCartCount();
    renderCart();

    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.classList.remove("visible");
        checkoutForm.querySelectorAll("input[type='text'], textarea").forEach(input => input.value = "");
        const cashOption = checkoutForm.querySelector("input[name='payment-method'][value='cash']");
        if (cashOption) cashOption.checked = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    const urlCategory = new URLSearchParams(window.location.search).get("cat");
    filterCategory(urlCategory || "all");

});

function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function updateCategoryActive(category) {
    const buttons = document.querySelectorAll(".category-buttons button");
    buttons.forEach(button => {
        button.classList.toggle("active", button.dataset.category === category);
    });
}

function filterCategory(category) {
    currentCategory = category || "all";
    const cards = document.querySelectorAll(".products .card");
    const hasCategory = Array.from(cards).some(card => card.dataset.category);
    cards.forEach(card => {
        if (!hasCategory) {
            card.style.display = "";
            return;
        }
        const cardCategory = card.dataset.category || "all";
        const matchesCategory = currentCategory === "all" || cardCategory === currentCategory;
        card.style.display = matchesCategory ? "" : "none";
    });
    updateCategoryActive(currentCategory);
    searchProducts();
}

function searchProducts() {
    const input = document.getElementById("search-input");
    if (!input) {
        return;
    }

    const query = input.value.trim();
    const normalizedQuery = normalizeText(query);
    const cards = document.querySelectorAll(".products .card");
    let found = false;

    const hasCategory = Array.from(cards).some(card => card.dataset.category);
    cards.forEach(card => {
        const name = card.getAttribute("data-name") || card.querySelector("h3")?.textContent || "";
        const rating = card.getAttribute("data-rating") || card.querySelector(".rating span")?.textContent || "";
        const keywords = card.getAttribute("data-keywords") || "";
        const altText = card.querySelector("img")?.alt || "";
        const content = `${name} ${rating} ${keywords} ${altText}`;
        const normalizedContent = normalizeText(content);
        const matchesSearch = normalizedQuery === "" || normalizedContent.includes(normalizedQuery);
        const cardCategory = card.dataset.category || "all";
        const matchesCategory = !hasCategory || currentCategory === "all" || cardCategory === currentCategory;
        const show = matchesSearch && matchesCategory;
        card.style.display = show ? "" : "none";
        if (show && normalizedQuery !== "") {
            found = true;
        }
    });

    const message = document.getElementById("search-message");
    if (message) {
        if (query !== "" && !found) {
            message.textContent = "Aucun produit trouvé.";
        } else {
            message.textContent = "";
        }
    }
}


