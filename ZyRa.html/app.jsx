document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector('.search-box input');
    const productCards = document.querySelectorAll('.product-card');
    const cart = document.querySelector('.cart');
    const shopBtn = document.querySelector('.hero button');
    const helpBtn = document.querySelector('.help');
    const closeBtn = document.querySelector('.close-btn');
    const appOffer = document.querySelector('.app-offer');
    const rightOffer = document.querySelector('.right-offer');
    const navLinks = document.querySelectorAll('nav a');
    const sendBtn = document.querySelector('.click');
    const emailInput = document.querySelector('input[type="email"]');

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    function updateCartUI() {

        if (!cart) return;

        let badge = cart.querySelector(".cart-count");

        if (!badge) {

            badge = document.createElement("span");
            badge.classList.add("cart-count");

            badge.style.position = "absolute";
            badge.style.top = "-8px";
            badge.style.right = "-12px";
            badge.style.background = "#ff4f81";
            badge.style.color = "white";
            badge.style.fontSize = "12px";
            badge.style.padding = "2px 7px";
            badge.style.borderRadius = "50%";

            cart.appendChild(badge);
        }

        badge.textContent = cartItems.length;
    }

    updateCartUI();

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            productCards.forEach(card => {

                const text = card.innerText.toLowerCase();

                if (text.includes(value)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });

    }

    if (shopBtn) {

        shopBtn.addEventListener("click", () => {
            window.location.href = "shop.html";
        });

    }

    const addButtons = document.querySelectorAll(".product-card button");

    addButtons.forEach((button, index) => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            const product = {
                id: index,
                name: card.querySelector("b")?.innerText || "Product",
                price: card.querySelector(".price")?.innerText || "$0",
                image: card.querySelector("img")?.src || ""
            };

            cartItems.push(product);

            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            updateCartUI();

            button.innerText = "Added ✓";
            button.style.background = "green";

            setTimeout(() => {
                button.innerText = "Add to Cart";
                button.style.background = "#ff4f81";
            }, 1200);

        });

    });

    if (cart) {

        cart.addEventListener("click", () => {

            if (cartItems.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            let message = "🛒 Cart Items:\n\n";

            cartItems.forEach((item, i) => {
                message += `${i + 1}. ${item.name} - ${item.price}\n`;
            });

            message += `\nTotal Items: ${cartItems.length}`;

            alert(message);

        });

    }

    productCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.03)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0px) scale(1)";
        });

    });

    if (closeBtn && appOffer) {

        closeBtn.addEventListener("click", () => {
            appOffer.style.display = "none";
        });

    }

    if (sendBtn && emailInput) {

        sendBtn.addEventListener("click", () => {

            const email = emailInput.value.trim();

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {
                alert("Please enter your email.");
                return;
            }

            if (!regex.test(email)) {
                alert("Please enter a valid email.");
                return;
            }

            alert("🎉 Thank you for subscribing!");

            localStorage.setItem("subscriberEmail", email);

            emailInput.value = "";

        });

    }

    if (helpBtn) {

        helpBtn.addEventListener("click", () => {

            const supportBox = document.createElement("div");

            supportBox.innerHTML = `
                <div style="
                    position:fixed;
                    bottom:90px;
                    right:20px;
                    width:280px;
                    background:white;
                    border-radius:15px;
                    padding:20px;
                    box-shadow:0 5px 20px rgba(0,0,0,0.2);
                    z-index:9999;
                ">
                    <h3 style="margin-bottom:10px;">Customer Support</h3>
                    <p>Email: support@zyrabeauty.com</p>
                    <p>Phone: +91 9876543210</p>
                    <button id="closeSupport" style="
                        margin-top:10px;
                        padding:8px 15px;
                        border:none;
                        background:#ff4f81;
                        color:white;
                        border-radius:8px;
                        cursor:pointer;
                    ">
                        Close
                    </button>
                </div>
            `;

            document.body.appendChild(supportBox);

            document
                .getElementById("closeSupport")
                .addEventListener("click", () => {
                    supportBox.remove();
                });

        });

    }

    navLinks.forEach(link => {

        if (link.href === window.location.href) {

            link.style.color = "#ff4f81";
            link.style.fontWeight = "bold";

        }

    });

    if (rightOffer) {

        rightOffer.addEventListener("click", () => {
            window.location.href = "shop.html";
        });

    }

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.style.position = "fixed";
    topBtn.style.bottom = "20px";
    topBtn.style.left = "20px";
    topBtn.style.width = "50px";
    topBtn.style.height = "50px";
    topBtn.style.borderRadius = "50%";
    topBtn.style.border = "none";
    topBtn.style.background = "#ff4f81";
    topBtn.style.color = "white";
    topBtn.style.fontSize = "20px";
    topBtn.style.cursor = "pointer";
    topBtn.style.display = "none";
    topBtn.style.zIndex = "999";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    const darkBtn = document.createElement("button");

    darkBtn.innerText = "🌙";

    darkBtn.style.position = "fixed";
    darkBtn.style.top = "90px";
    darkBtn.style.right = "20px";
    darkBtn.style.padding = "12px";
    darkBtn.style.border = "none";
    darkBtn.style.borderRadius = "50%";
    darkBtn.style.cursor = "pointer";
    darkBtn.style.zIndex = "1000";

    document.body.appendChild(darkBtn);

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            document.body.style.background = "#111";
            document.body.style.color = "white";

        } else {

            document.body.style.background = "#fff5f8";
            document.body.style.color = "#333";

        }

    });

    document.body.style.opacity = "0";

    window.addEventListener("load", () => {

        document.body.style.transition = "1s";
        document.body.style.opacity = "1";

    });

    const heroTitle = document.querySelector(".hero h1");

    if (heroTitle) {

        const texts = [
            "Discover Your Natural Glow",
            "Premium Beauty Products",
            "Luxury Skincare Collection",
            "Flat 50% OFF Today"
        ];

        let i = 0;

        setInterval(() => {

            i++;

            if (i >= texts.length) {
                i = 0;
            }

            heroTitle.innerText = texts[i];

        }, 3000);

    }

    productCards.forEach(card => {

        card.addEventListener("dblclick", () => {

            const name = card.querySelector("b")?.innerText;
            const price = card.querySelector(".price")?.innerText;
            const image = card.querySelector("img")?.src;

            const popup = document.createElement("div");

            popup.innerHTML = `
                <div style="
                    position:fixed;
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                    background:white;
                    padding:25px;
                    border-radius:15px;
                    box-shadow:0 5px 25px rgba(0,0,0,0.3);
                    z-index:99999;
                    width:320px;
                    text-align:center;
                ">
                    <img src="${image}" style="width:100%; border-radius:10px;">
                    <h2 style="margin:15px 0;">${name}</h2>
                    <h3>${price}</h3>

                    <button id="closePopup" style="
                        margin-top:15px;
                        padding:10px 20px;
                        border:none;
                        background:#ff4f81;
                        color:white;
                        border-radius:10px;
                        cursor:pointer;
                    ">
                        Close
                    </button>
                </div>
            `;

            document.body.appendChild(popup);

            document
                .getElementById("closePopup")
                .addEventListener("click", () => {
                    popup.remove();
                });

        });

    });

});