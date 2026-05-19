// let cart = [];

// // 1. INVENTARIO MAESTRO (URLs de GitHub directas para EmailJS)
// const inventaire = {
//     "Collier de fleur": { id: "COL-001", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collier%20de%20Fleur.jpeg" },
//     "Bracelet chic": { id: "BRA-001", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/Bracelet.jpeg" },
//     "Bracelet de cheville": { id: "CHE-001", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/bracelet%20de%20cheville.jpeg" },
//     "Collier papillon": { id: "COL-002", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collier%20du%20papillant.jpeg" },
//     "Bracelet du vis": { id: "BRA-002", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/bracelet%20du%20vis.jpeg" },
//     "Bracelets du vis": { id: "BRA-003", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/bracelets%20du%20vis%202.jpeg" },
//     "Collier du cœur": { id: "COL-003", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collier%20du%20c%C5%93ur.jpeg" },
//     "Ensemble fleur": { id: "ENS-001", img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collection%20du%20fleur.jpeg" }
// };

// function toggleCart() {
//     const panel = document.getElementById("cart-panel");
//     if (panel) panel.classList.toggle("active");
// }

// // 2. AGREGAR AL CARRITO
// function addToCart(productName, price) {
//     const info = inventaire[productName];
    
//     if (info) {
//         cart.push({ 
//             id: info.id, 
//             product: productName, 
//             price: price, 
//             img: info.img 
//         });
//     } else {
//         // Fallback por si el nombre no coincide exacto con el inventario
//         cart.push({ id: "GEN-000", product: productName, price: price, img: "" });
//     }

//     const countElem = document.getElementById("cart-count");
//     if(countElem) countElem.innerText = cart.length;
    
//     renderCart();
    
//     const panel = document.getElementById("cart-panel");
//     if (panel) panel.classList.add("active");
// }

// function renderCart() {
//     const itemsList = document.getElementById("cart-items");
//     const emptyMessage = document.getElementById("cart-empty");
//     const totalText = document.getElementById("cart-total");
//     const payBtn = document.getElementById("pay-button");
//     const checkoutForm = document.getElementById("checkout-form");

//     if (!itemsList || !emptyMessage || !totalText) return;

//     itemsList.innerHTML = "";

//     if (cart.length === 0) {
//         emptyMessage.style.display = "block";
//         totalText.textContent = "Total: €0.00";
//         if (payBtn) payBtn.style.display = "none";
//         if (checkoutForm) checkoutForm.style.display = "none"; 
//         return;
//     }

//     emptyMessage.style.display = "none";
//     // Solo mostramos el botón "Commander" si el formulario no está ya abierto
//     if (payBtn && (!checkoutForm || checkoutForm.style.display !== "block")) {
//         payBtn.style.display = "block";
//     }

//     let total = 0;
//     cart.forEach((item, index) => {
//         const li = document.createElement("li");
//         li.style.display = "flex";
//         li.style.justifyContent = "space-between";
//         li.style.marginBottom = "10px";
//         li.innerHTML = `
//             <span><strong>[${item.id}]</strong> ${item.product}</span>
//             <span>€${item.price.toFixed(2)} <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer; margin-left:10px;">✕</button></span>
//         `;
//         itemsList.appendChild(li);
//         total += item.price;
//     });

//     totalText.textContent = `Total: €${total.toFixed(2)}`;
// }

// // 3. ENVÍO DE EMAIL
// function sendEmail() {
//     const name = document.getElementById("customer-name-order").value;
//     const phone = document.getElementById("customer-phone").value;
//     const address = document.getElementById("customer-address").value;

//     if (!name || !phone || !address) {
//         alert("Veuillez remplir tous les campos.");
//         return;
//     }

//     // Estructura para el bloque {{#orders}} de EmailJS
//     const listaProductos = cart.map(item => ({
//         name: item.product,
//         units: 1,
//         price: item.price.toFixed(2),
//         image_url: item.img // Usamos la URL que ya tenemos en el inventario
//     }));

//     const totalCalculado = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

//     const templateParams = {
//         from_name: name,
//         order_id: "#" + Math.floor(Math.random() * 1000000),
//         orders: listaProductos, 
//         "cost.shipping": "0.00",
//         "cost.total": totalCalculado,
//         phone: phone,
//         address: address
//     };

//   // Asegúrate de usar el NUEVO ID que acabas de crear
//     const newServiceID = "EL_NUEVO_ID_QUE_CREASTE"; 
//     const templateID = "template_t99h5yw";
//     const publicKey = "sEuta_gO53voXjO8M";

//     emailjs.send(newServiceID, templateID, templateParams, publicKey)
//         .then(function(response) {
//         console.log("¡POR FIN FUNCIONA!", response.status, response.text);
//         alert("Merci ! Votre commande a été confirmée.");
//         cart = [];
//         renderCart();
//         window.location.reload();
//         })
//         .catch(function(error) {
//         console.error("Error técnico:", error);
//         alert("Sigue fallando: " + error.text);
//         });"Error: " + JSON.stringify(error);
//     };


// function removeFromCart(index) {
//     cart.splice(index, 1);
//     const countElem = document.getElementById("cart-count");
//     if(countElem) countElem.innerText = cart.length;
//     renderCart();
// }

// function showCheckoutForm() {
//     const form = document.getElementById("checkout-form");
//     const payBtn = document.getElementById("pay-button");
//     if (form && payBtn) {
//         form.style.display = "block";
//         payBtn.style.display = "none";
//         form.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
// }

// // 4. FILTRADO POR URL
// document.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const category = params.get('cat');
//     const products = document.querySelectorAll('.card');

//     if (category) {
//         products.forEach(product => {
//             const productCat = product.getAttribute('data-category').toLowerCase();
//             product.style.display = (productCat === category.toLowerCase()) ? 'block' : 'none';
//         });
        
//         const title = document.querySelector('.hero h2');
//         if (title) title.textContent = "Nos " + category.charAt(0).toUpperCase() + category.slice(1) + "s";
//     }
// }); 



// ===============================
// JÉA ACCESSOIRES - SCRIPT CLEAN
// ===============================

// -------------------------------
// INITIALISATION EMAILJS
// -------------------------------
emailjs.init("sEuta_gO53voXjO8M");

// -------------------------------
// PANIER
// -------------------------------
let cart = [];

// -------------------------------
// INVENTAIRE
// -------------------------------
const inventaire = {

    "Collier de fleur": {
        id: "COL-001",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collier%20de%20Fleur.jpeg"
    },

    "Bracelet chic": {
        id: "BRA-001",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/Bracelet.jpeg"
    },

    "Bracelet de cheville": {
        id: "CHE-001",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/bracelet%20de%20cheville.jpeg"
    },

    "Collier papillon": {
        id: "COL-002",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collier%20du%20papillant.jpeg"
    },

    "Bracelet du vis": {
        id: "BRA-002",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/bracelet%20du%20vis.jpeg"
    },

    "Bracelets du vis": {
        id: "BRA-003",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/bracelets%20du%20vis%202.jpeg"
    },

    "Collier du cœur": {
        id: "COL-003",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collier%20du%20c%C5%93ur.jpeg"
    },

    "Ensemble fleur": {
        id: "ENS-001",
        img: "https://raw.githubusercontent.com/ayaelo9/J-a-accessories/main/collection%20du%20fleur.jpeg"
    }
};

// ===============================
// OUVRIR / FERMER PANIER
// ===============================
function toggleCart() {

    const panel = document.getElementById("cart-panel");

    if (panel) {
        panel.classList.toggle("active");
    }
}

// ===============================
// AJOUTER AU PANIER
// ===============================
function addToCart(productName, price) {

    const info = inventaire[productName];

    const item = {
        id: info ? info.id : "GEN-000",
        product: productName,
        price: Number(price),
        img: info ? info.img : "",
        quantity: 1
    };

    cart.push(item);

    updateCartCount();

    renderCart();

    const panel = document.getElementById("cart-panel");

    if (panel) {
        panel.classList.add("active");
    }
}

// ===============================
// METTRE À JOUR LE COMPTEUR
// ===============================
function updateCartCount() {

    const countElem = document.getElementById("cart-count");

    if (countElem) {
        countElem.innerText = cart.length;
    }
}

// ===============================
// AFFICHER LE PANIER
// ===============================
function renderCart() {

    const itemsList = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("cart-empty");
    const totalText = document.getElementById("cart-total");
    const payBtn = document.getElementById("pay-button");
    const checkoutForm = document.getElementById("checkout-form");

    if (!itemsList || !emptyMessage || !totalText) return;

    itemsList.innerHTML = "";

    // PANIER VIDE
    if (cart.length === 0) {

        emptyMessage.style.display = "block";

        totalText.textContent = "Total : €0.00";

        if (payBtn) {
            payBtn.style.display = "none";
        }

        if (checkoutForm) {
            checkoutForm.style.display = "none";
        }

        return;
    }

    emptyMessage.style.display = "none";

    if (payBtn) {
        payBtn.style.display = "block";
    }

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const li = document.createElement("li");

        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "10px";

        li.innerHTML = `
            <div>
                <strong>[${item.id}]</strong>
                ${item.product}
            </div>

            <div>
                €${item.price.toFixed(2)}

                <button
                    onclick="removeFromCart(${index})"
                    style="
                        margin-left:10px;
                        border:none;
                        background:none;
                        color:red;
                        cursor:pointer;
                        font-size:16px;
                    "
                >
                    ✕
                </button>
            </div>
        `;

        itemsList.appendChild(li);
    });

    totalText.textContent = `Total : €${total.toFixed(2)}`;
}

// ===============================
// SUPPRIMER DU PANIER
// ===============================
function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartCount();

    renderCart();
}

// ===============================
// AFFICHER FORMULAIRE
// ===============================
function showCheckoutForm() {

    const form = document.getElementById("checkout-form");

    const payBtn = document.getElementById("pay-button");

    if (form && payBtn) {

        form.style.display = "block";

        payBtn.style.display = "none";

        form.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

// ===============================
// ENVOYER EMAIL
// ===============================
function sendEmail() {

    const name = document.getElementById("customer-name-order").value.trim();

    const email = document.getElementById("customer-email").value.trim(); 

    const phone = document.getElementById("customer-phone").value.trim();

    const address = document.getElementById("customer-address").value.trim();

    // VALIDATION
    if (!name || !email || !phone || !address) {

        alert("Veuillez remplir tous les champs.");

        return;
    }

    // PANIER VIDE
    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;
    }

    // PRODUITS EMAILJS
    const orders = cart.map(item => ({
        name: item.product,
        units: item.quantity,
        price: item.price.toFixed(2),
        image_url: item.img
    }));

    // TOTAL
    const total = cart
        .reduce((sum, item) => sum + item.price, 0)
        .toFixed(2);

    // PARAMÈTRES TEMPLATE
    const templateParams = {

        from_name: name,

        customer_email: email,

        order_id: "#" + Math.floor(Math.random() * 1000000),

        orders: orders,

        phone: phone,

        address: address,

        shipping: "0.00",

        total: total
    };

    // EMAILJS IDs
    const serviceID = "service_rb1xshi";

    const templateID = "template_t99h5yw";

    // ENVOI
    emailjs.send(serviceID, templateID, templateParams)

    .then(response => {

        console.log("Commande envoyée :", response);

        alert("Merci ! Votre commande a été confirmée.");

        document.getElementById("checkout-form").style.display = "none";
        
        // 2. Mostramos tu nueva ENCUESTA personalizada
        document.getElementById("order-success").style.display = "block";
        
        // 3. Scroll suave hacia la encuesta
        document.getElementById("order-success").scrollIntoView({ behavior: 'smooth' });

        // RESET
        cart = [];

        updateCartCount();

        renderCart();

        location.reload();
    })

    .catch(error => {

        console.error("Erreur EmailJS :", error);

        alert("Erreur lors de l'envoi de la commande.");
    });
}

// ===============================
// FILTRAGE PAR CATÉGORIE
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);

    const category = params.get("cat");

    const products = document.querySelectorAll(".card");

    if (!category) return;

    products.forEach(product => {

        const productCat = product
            .getAttribute("data-category")
            ?.toLowerCase();

        product.style.display =
            productCat === category.toLowerCase()
                ? "block"
                : "none";
    });

    const title = document.querySelector(".hero h2");

    if (title) {

        title.textContent =
            "Nos " +
            category.charAt(0).toUpperCase() +
            category.slice(1) +
            "s";
    }
});

function openMail() {
    window.location.href = "mailto:jeaaccessories76@gmail.com";
}

// Función para cuando hacen clic directamente en un botón redondo (punto)
function irAFoto(puntoClickeado, indiceDestino) {
    event.stopPropagation();
    
    const contenedor = puntoClickeado.closest('.galeria-contenedor');
    const imagenes = contenedor.querySelectorAll('.articulo-img');
    const puntos = contenedor.querySelectorAll('.punto');

    // Quitar la clase activa de todas las imágenes y puntos de ESTA tarjeta
    imagenes.forEach(img => img.classList.remove('activa'));
    puntos.forEach(p => p.classList.remove('activo'));

    // Activar la imagen y el punto seleccionados
    imagenes[indiceDestino].classList.add('activa');
    puntos[indiceDestino].classList.add('activo');
}

// Actualización de la función de las flechas para que también mueva los botones de puntos
function cambiarImagenInterna(boton, direccion) {
    event.stopPropagation(); 
    
    const contenedor = boton.closest('.galeria-contenedor');
    const imagenes = contenedor.querySelectorAll('.articulo-img');
    const puntos = contenedor.querySelectorAll('.punto');
    
    let indiceActivo = -1;

    imagenes.forEach((img, index) => {
        if (img.classList.contains('activa')) {
            indiceActivo = index;
        }
    });

    // Quitar estados activos actuales
    imagenes[indiceActivo].classList.remove('activa');
    if (puntos.length > 0) puntos[indiceActivo].classList.remove('activo');

    // Calcular nueva posición
    let nuevoIndice = indiceActivo + direccion;
    if (nuevoIndice >= imagenes.length) nuevoIndice = 0;
    if (nuevoIndice < 0) nuevoIndice = imagenes.length - 1;

    // Aplicar nuevos estados activos
    imagenes[nuevoIndice].classList.add('activa');
    if (puntos.length > 0) puntos[nuevoIndice].classList.add('activo');
}
function irAFoto(puntoClickeado, indiceDestino) {
    event.stopPropagation();
    const contenedor = puntoClickeado.closest('.galeria-contenedor');
    const imagenes = contenedor.querySelectorAll('.articulo-img');
    const puntos = contenedor.querySelectorAll('.punto');
    imagenes.forEach(img => img.classList.remove('activa'));
    puntos.forEach(p => p.classList.remove('activo'));
    imagenes[indiceDestino].classList.add('activa');
    puntos[indiceDestino].classList.add('activo');
}

function cambiarImagenInterna(boton, direccion) {
    event.stopPropagation(); 
    const contenedor = boton.closest('.galeria-contenedor');
    const imagenes = contenedor.querySelectorAll('.articulo-img');
    const puntos = contenedor.querySelectorAll('.punto');
    let indiceActivo = -1;
    imagenes.forEach((img, index) => {
        if (img.classList.contains('activa')) {
            indiceActivo = index;
        }
    });
    imagenes[indiceActivo].classList.remove('activa');
    if (puntos.length > 0) puntos[indiceActivo].classList.remove('activo');
    let nuevoIndice = indiceActivo + direccion;
    if (nuevoIndice >= imagenes.length) nuevoIndice = 0;
    if (nuevoIndice < 0) nuevoIndice = imagenes.length - 1;
    imagenes[nuevoIndice].classList.add('activa');
    if (puntos.length > 0) puntos[nuevoIndice].classList.add('activo');
}