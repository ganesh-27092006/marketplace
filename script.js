let cartCount = 0;
let wishlistCount = 0;

// Add to Cart
function addToCart() {
    showNotification("Select a product to add to cart");
}

// Search Product
function searchProduct() {
    const searchInput = document
        .getElementById("heroSearch")
        .value
        .toLowerCase()
        .trim();

    const products = document.querySelectorAll(".product-card");

    let found = false;

    products.forEach(product => {

        const productName = product
            .querySelector("h3")
            .innerText
            .toLowerCase();

        const category = product
            .querySelector(".product-category")
            .innerText
            .toLowerCase();

        if (
            productName.includes(searchInput) ||
            category.includes(searchInput)
        ) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

    if (searchInput === "") {
        products.forEach(product => {
            product.style.display = "block";
        });

        showNotification("Showing all products");
    } else if (!found) {
        showNotification("❌ Product not found!");
    } else {
        showNotification("🔍 Search results found!");
    }
}


// Wishlist
const wishlistButtons = document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button => {

    button.addEventListener("click", function () {

        const icon = this.querySelector("i");

        if (icon.classList.contains("fa-regular")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            wishlistCount++;

            showNotification("❤️ Added to wishlist!");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            wishlistCount--;

            showNotification("Removed from wishlist");
        }

    });

});


// Category Click
const categories = document.querySelectorAll(".category-card");

categories.forEach(category => {

    category.addEventListener("click", function () {

        const categoryName = this
            .querySelector("h3")
            .innerText
            .toLowerCase();

        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {

            const productCategory = product
                .querySelector(".product-category")
                .innerText
                .toLowerCase();

            if (
                productCategory.includes(categoryName) ||
                categoryName.includes(productCategory)
            ) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }

        });

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

        showNotification("Showing " + this.querySelector("h3").innerText);

    });

});


// Notification
function showNotification(message) {

    const oldNotification =
        document.querySelector(".notification");

    if (oldNotification) {
        oldNotification.remove();
    }

    const notification =
        document.createElement("div");

    notification.className = "notification";

    notification.innerText = message;

    document.body.appendChild(notification);

    setTimeout(() => {

        notification.style.opacity = "0";

        setTimeout(() => {
            notification.remove();
        }, 500);

    }, 2500);

}


// Login Button
const loginButton =
    document.querySelector(".login-btn");

if (loginButton) {
    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}


// Become Seller Button
const sellerButton =
    document.querySelector(".seller-banner button");

if (sellerButton) {
    sellerButton.addEventListener("click", function () {
        window.location.href = "seller-dashboard.html";
    });
}


// Search using Enter Key
const heroSearchInput = document.getElementById("heroSearch");
if (heroSearchInput) {
    heroSearchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") searchProduct();
    });
}
// ================= PRODUCTS PAGE =================

function filterProducts() {

    const search = document
        .getElementById("productSearch")
        ?.value
        .toLowerCase() || "";

    const category = document.querySelector(
        'input[name="category"]:checked'
    )?.value || "all";

    const price = document
        .getElementById("priceFilter")
        ?.value || "all";

    const rating = document.querySelector(
        'input[name="rating"]:checked'
    )?.value || "all";

    const products = document.querySelectorAll(
        ".market-product-card"
    );

    let count = 0;

    products.forEach(product => {

        const name = product
            .querySelector("h3")
            .innerText
            .toLowerCase();

        const productCategory =
            product.dataset.category;

        const productPrice =
            Number(product.dataset.price);

        const productRating =
            Number(product.dataset.rating);

        let show = true;

        if (
            search &&
            !name.includes(search)
        ) {
            show = false;
        }

        if (
            category !== "all" &&
            productCategory !== category
        ) {
            show = false;
        }

        if (
            price !== "all" &&
            productPrice > Number(price)
        ) {
            show = false;
        }

        if (
            rating !== "all" &&
            productRating < Number(rating)
        ) {
            show = false;
        }

        product.style.display =
            show ? "block" : "none";

        if (show) count++;

    });

    const productCount =
        document.getElementById("productCount");

    if (productCount) {
        productCount.innerText =
            `Showing ${count} Products`;
    }
}


// Reset Filters

function resetFilters() {

    const search =
        document.getElementById("productSearch");

    if (search) search.value = "";

    const allCategory =
        document.querySelector(
            'input[name="category"][value="all"]'
        );

    if (allCategory) allCategory.checked = true;

    const allRating =
        document.querySelector(
            'input[name="rating"][value="all"]'
        );

    if (allRating) allRating.checked = true;

    const price =
        document.getElementById("priceFilter");

    if (price) price.value = "all";

    filterProducts();
}


// Sort Products

function sortProducts() {

    const sort =
        document.getElementById("sortProducts").value;

    const grid =
        document.getElementById("marketProductGrid");

    if (!grid) return;

    const products =
        Array.from(
            grid.querySelectorAll(
                ".market-product-card"
            )
        );

    if (sort === "low") {

        products.sort(
            (a, b) =>
                Number(a.dataset.price) -
                Number(b.dataset.price)
        );

    } else if (sort === "high") {

        products.sort(
            (a, b) =>
                Number(b.dataset.price) -
                Number(a.dataset.price)
        );
    }

    products.forEach(product =>
        grid.appendChild(product)
    );

}


// Product Wishlist

function toggleWishlist(button) {

    const icon =
        button.querySelector("i");

    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");

    if (
        icon.classList.contains("fa-solid")
    ) {
        showNotification("❤️ Added to wishlist!");
    } else {
        showNotification("Removed from wishlist");
    }
}


// Add Product To Cart

function addProductToCart(productName) {
    const product = productData[productName];
    if (!product) return;
    const price = Number(product.price.replace(/[^0-9]/g, ""));
    addToRealCart(productName, price, product.image);
}


// View Product

function viewProduct(productName) {

    localStorage.setItem(
        "selectedProduct",
        productName
    );

    showNotification(
        "Opening " +
        productName
    );

    setTimeout(() => {

        // पुढच्या step मध्ये product-details.html
        window.location.href =
            "product-details.html";

    }, 500);
}
// ================= PRODUCT DETAILS PAGE =================

const productData = {

    "Premium Laptop": {
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
        category: "Electronics",
        price: "₹49,999",
        oldPrice: "₹59,999",
        discount: "20% OFF",
        rating: "4.9",
        reviews: "120",
        description:
            "Experience powerful performance with this Premium Laptop. Perfect for coding, office work, study and entertainment."
    },

    "Smartphone Pro": {
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
        category: "Mobile",
        price: "₹29,999",
        oldPrice: "₹35,999",
        discount: "15% OFF",
        rating: "4.8",
        reviews: "98",
        description:
            "Enjoy a powerful smartphone experience with excellent camera, performance and modern design."
    },

    "Wireless Headphones": {
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
        category: "Electronics",
        price: "₹2,999",
        oldPrice: "₹4,299",
        discount: "30% OFF",
        rating: "4.5",
        reviews: "150",
        description:
            "High quality wireless headphones with clear sound, deep bass and comfortable design."
    },

    "Sports Shoes": {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
        category: "Fashion",
        price: "₹1,999",
        oldPrice: "₹2,499",
        discount: "20% OFF",
        rating: "4.4",
        reviews: "89",
        description:
            "Comfortable and stylish sports shoes suitable for daily use and workouts."
    },

    "Gaming Console": {
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=85",
        category: "Gaming",
        price: "₹45,999",
        oldPrice: "₹49,999",
        discount: "8% OFF",
        rating: "4.9",
        reviews: "210",
        description:
            "Enjoy next level gaming with powerful performance and immersive entertainment."
    },

    "Smart Watch": {
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        category: "Electronics",
        price: "₹3,499",
        oldPrice: "₹4,999",
        discount: "30% OFF",
        rating: "4.4",
        reviews: "85",
        description:
            "Track your fitness and stay connected with this modern smart watch."
    },

    "Casual T-Shirt": {
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
        category: "Fashion",
        price: "₹999",
        oldPrice: "₹1,299",
        discount: "23% OFF",
        rating: "3.9",
        reviews: "65",
        description:
            "Comfortable and stylish casual t-shirt perfect for everyday wear."
    },

    "Bluetooth Speaker": {
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
        category: "Mobile",
        price: "₹4,999",
        oldPrice: "₹5,999",
        discount: "17% OFF",
        rating: "4.3",
        reviews: "112",
        description:
            "Portable Bluetooth speaker with powerful sound and long battery life."
    }

};


function loadProductDetails() {

    const selectedProduct =
        localStorage.getItem("selectedProduct");

    if (!selectedProduct) return;

    const product =
        productData[selectedProduct];

    if (!product) return;

    const productImage = document.getElementById("productImage");

    if (productImage) {

        productImage.src = product.image;
        productImage.alt = selectedProduct;

        document.getElementById(
            "detailsCategory"
        ).innerText = product.category;

        document.getElementById(
            "detailsName"
        ).innerText = selectedProduct;

        document.getElementById(
            "breadcrumbName"
        ).innerText = selectedProduct;

        document.getElementById(
            "detailsPrice"
        ).innerText = product.price;

        document.getElementById(
            "detailsOldPrice"
        ).innerText = product.oldPrice;

        document.getElementById(
            "detailsDiscount"
        ).innerText = product.discount;

        document.getElementById(
            "detailsRating"
        ).innerText = product.rating;

        document.querySelector(
            ".review-count"
        ).innerText =
            "(" + product.reviews + " Reviews)";

        document.getElementById(
            "detailsDescription"
        ).innerText = product.description;
    }

}


// Quantity

let quantity = 1;

function changeQuantity(value) {

    quantity += value;

    if (quantity < 1) {
        quantity = 1;
    }

    const quantityElement =
        document.getElementById("quantity");

    if (quantityElement) {
        quantityElement.innerText = quantity;
    }

}


// Add Details Product To Cart

function addDetailsToCart() {
    const productName = document.getElementById("detailsName")?.innerText;
    const product = productData[productName];
    if (!product) return;
    const price = Number(product.price.replace(/[^0-9]/g, ""));
    for (let i = 0; i < quantity; i++) addToRealCart(productName, price, product.image);
}


// Buy Now

function buyNow() {

    const productName =
        document.getElementById(
            "detailsName"
        )?.innerText;

    showNotification(
        "⚡ Proceeding to checkout for " +
        productName
    );

}


// Load Product Details

document.addEventListener(
    "DOMContentLoaded",
    loadProductDetails
);
// ================= REAL SHOPPING CART =================


// Cart मधील Products घेणे

function getCart() {

    return JSON.parse(
        localStorage.getItem("marketHubCart")
    ) || [];

}


// Cart Save करणे

function saveCart(cart) {

    localStorage.setItem(
        "marketHubCart",
        JSON.stringify(cart)
    );

}


// Cart मध्ये Product Add

function addToRealCart(
    productName,
    price,
    emoji
) {

    let cart = getCart();

    const existingProduct =
        cart.find(
            product =>
                product.name === productName
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: productName,

            price: price,

            emoji: emoji,

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    showNotification(
        "🛒 " +
        productName +
        " added to cart!"
    );

}


// Cart Count Update

function updateCartCount() {

    const cart = getCart();

    let totalItems = 0;

    cart.forEach(product => {

        totalItems += product.quantity;

    });


    document.querySelectorAll(
        ".cart-count"
    ).forEach(cartCount => {

        cartCount.innerText =
            totalItems;

    });

}


// Cart Products दाखवणे

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    if (!cartItems) return;


    const cart = getCart();


    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display =
            "block";

        updateCartSummary();

        return;

    }


    emptyCart.style.display = "none";


    cartItems.innerHTML = "";


    cart.forEach(
        (product, index) => {

            const item =
                document.createElement("div");

            item.className =
                "cart-item";


            item.innerHTML = `

                <div class="cart-product-image">
                    <img src="${product.image || product.emoji || ''}" alt="${product.name}">
                </div>


                <div class="cart-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Premium Quality Product
                    </p>

                    <b>
                        ₹${product.price.toLocaleString()}
                    </b>

                </div>


                <div class="cart-quantity">

                    <button
                        onclick="changeCartQuantity(${index}, -1)"
                    >
                        -
                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="changeCartQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>


                <div class="cart-product-total">

                    ₹${(
                        product.price *
                        product.quantity
                    ).toLocaleString()}

                </div>


                <button
                    class="remove-cart-item"
                    onclick="removeCartItem(${index})"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;


            cartItems.appendChild(item);

        }
    );


    updateCartSummary();

}


// Cart Quantity Change

function changeCartQuantity(
    index,
    value
) {

    let cart = getCart();

    cart[index].quantity += value;


    if (
        cart[index].quantity < 1
    ) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    updateCartCount();

    displayCart();

}


// Remove Product

function removeCartItem(index) {

    let cart = getCart();

    const productName =
        cart[index].name;


    cart.splice(index, 1);


    saveCart(cart);

    updateCartCount();

    displayCart();


    showNotification(
        productName +
        " removed from cart"
    );

}


// Clear Cart

function clearCart() {

    localStorage.removeItem(
        "marketHubCart"
    );


    updateCartCount();

    displayCart();


    showNotification(
        "🗑️ Cart cleared!"
    );

}


// Cart Summary

function updateCartSummary() {

    const cart = getCart();


    let subtotal = 0;


    cart.forEach(product => {

        subtotal +=
            product.price *
            product.quantity;

    });


    const subtotalElement =
        document.getElementById(
            "subtotal"
        );


    const totalElement =
        document.getElementById(
            "total"
        );


    if (subtotalElement) {

        subtotalElement.innerText =
            "₹" +
            subtotal.toLocaleString();

    }


    if (totalElement) {

        totalElement.innerText =
            "₹" +
            subtotal.toLocaleString();

    }

}


// Checkout

function checkout() {

    const cart = getCart();


    if (cart.length === 0) {

        showNotification(
            "❌ Your cart is empty!"
        );

        return;

    }


    showNotification(
        "⚡ Moving to checkout..."
    );


    setTimeout(() => {

        // पुढच्या Step मध्ये Checkout Page
        alert(
            "Checkout Page Coming Next!"
        );

    }, 500);

}


// Page Load

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

    }
);
// ================= CHECKOUT =================


// Checkout Products दाखवणे

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    if (!checkoutItems) return;


    const cart = getCart();


    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <p style="text-align:center; color:#94a3b8;">
                Your cart is empty
            </p>

        `;

        return;

    }


    checkoutItems.innerHTML = "";

    let subtotal = 0;


    cart.forEach(product => {

        const productTotal =
            product.price *
            product.quantity;


        subtotal += productTotal;


        const item =
            document.createElement("div");


        item.className =
            "checkout-product";


        item.innerHTML = `

            <div class="checkout-product-image">
                ${product.emoji}
            </div>


            <div class="checkout-product-info">

                <h4>
                    ${product.name}
                </h4>

                <small>
                    Qty: ${product.quantity}
                </small>

            </div>


            <div class="checkout-product-price">

                ₹${productTotal.toLocaleString()}

            </div>

        `;


        checkoutItems.appendChild(item);

    });


    document.getElementById(
        "checkoutSubtotal"
    ).innerText =
        "₹" +
        subtotal.toLocaleString();


    document.getElementById(
        "checkoutTotal"
    ).innerText =
        "₹" +
        subtotal.toLocaleString();

}


// Place Order

function placeOrder() {

    const name =
        document.getElementById(
            "customerName"
        )?.value.trim();


    const mobile =
        document.getElementById(
            "customerMobile"
        )?.value.trim();


    const email =
        document.getElementById(
            "customerEmail"
        )?.value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        )?.value.trim();


    const city =
        document.getElementById(
            "customerCity"
        )?.value.trim();


    const pincode =
        document.getElementById(
            "customerPincode"
        )?.value.trim();


    const state =
        document.getElementById(
            "customerState"
        )?.value.trim();


    // Validation

    if (
        !name ||
        !mobile ||
        !email ||
        !address ||
        !city ||
        !pincode ||
        !state
    ) {

        showNotification(
            "❌ Please fill all details!"
        );

        return;

    }


    const cart = getCart();


    if (cart.length === 0) {

        showNotification(
            "❌ Your cart is empty!"
        );

        return;

    }


    // Payment Method

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        )?.value;


    // Order ID

    const orderId =
        "MH" +
        Date.now();


    // Order Object

    const order = {

        orderId: orderId,

        customer: {

            name: name,

            mobile: mobile,

            email: email,

            address: address,

            city: city,

            pincode: pincode,

            state: state

        },

        payment: payment,

        products: cart,

        orderDate:
            new Date()
            .toLocaleString()

    };


    // Save Order

    let orders =
        JSON.parse(
            localStorage.getItem(
                "marketHubOrders"
            )
        ) || [];


    orders.push(order);


    localStorage.setItem(
        "marketHubOrders",
        JSON.stringify(orders)
    );


    // Clear Cart

    localStorage.removeItem(
        "marketHubCart"
    );


    updateCartCount();


    // Success

    alert(

        "🎉 Order Placed Successfully!\n\n" +

        "Order ID: " +
        orderId +

        "\n\nThank you for shopping with MarketHub!"

    );


    // Home Page

    window.location.href =
        "index.html";

}


// Checkout Page Load

document.addEventListener(
    "DOMContentLoaded",
    displayCheckout
);
function checkout() {

    const cart = getCart();

    if (cart.length === 0) {

        showNotification(
            "❌ Your cart is empty!"
        );

        return;

    }

    window.location.href =
        "checkout.html";
}
// ================= LOGIN / REGISTER =================


// Register User

function registerUser() {

    const name =
        document.getElementById(
            "registerName"
        )?.value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        )?.value.trim();

    const password =
        document.getElementById(
            "registerPassword"
        )?.value;

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        )?.value;


    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
    ) {

        alert(
            "Please fill all details!"
        );

        return;

    }


    if (
        password !== confirmPassword
    ) {

        alert(
            "Passwords do not match!"
        );

        return;

    }


    const users =
        JSON.parse(
            localStorage.getItem(
                "marketHubUsers"
            )
        ) || [];


    const userExists =
        users.find(
            user =>
                user.email === email
        );


    if (userExists) {

        alert(
            "Account already exists!"
        );

        return;

    }


    const user = {

        name: name,

        email: email,

        password: password,

        role: "customer"

    };


    users.push(user);


    localStorage.setItem(
        "marketHubUsers",
        JSON.stringify(users)
    );


    alert(
        "🎉 Account created successfully!"
    );


    window.location.href =
        "login.html";

}


// Login User

function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        )?.value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        )?.value;


    if (
        !email ||
        !password
    ) {

        alert(
            "Please enter email and password!"
        );

        return;

    }


    const users =
        JSON.parse(
            localStorage.getItem(
                "marketHubUsers"
            )
        ) || [];


    const user =
        users.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!user) {

        alert(
            "Invalid email or password!"
        );

        return;

    }


    // Current User Save

    localStorage.setItem(
        "marketHubCurrentUser",
        JSON.stringify(user)
    );


    alert(
        "🎉 Welcome " +
        user.name
    );


    window.location.href =
        "index.html";

}


// Logout User

function logoutUser() {

    localStorage.removeItem(
        "marketHubCurrentUser"
    );


    window.location.href =
        "index.html";

}


// Current User Check

function updateUserUI() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "marketHubCurrentUser"
            )
        );


    const loginButtons =
        document.querySelectorAll(
            ".login-btn"
        );


    if (user) {

        loginButtons.forEach(button => {

            button.innerText =
                user.name;

            button.onclick =
                logoutUser;

        });

    } else {

        loginButtons.forEach(button => {

            button.innerText =
                "Login";

            button.onclick =
                function () {

                    window.location.href =
                        "login.html";

                };

        });

    }

}


// Page Load

document.addEventListener(
    "DOMContentLoaded",
    updateUserUI
);
// ================= SELLER DASHBOARD =================


// Seller Product घेणे

function getSellerProducts() {

    return JSON.parse(
        localStorage.getItem(
            "marketHubSellerProducts"
        )
    ) || [];

}


// Seller Product Save

function saveSellerProducts(products) {

    localStorage.setItem(
        "marketHubSellerProducts",
        JSON.stringify(products)
    );

}


// Seller Product Add

function addSellerProduct() {

    const name =
        document.getElementById(
            "sellerProductName"
        )?.value.trim();

    const category =
        document.getElementById(
            "sellerProductCategory"
        )?.value;

    const price =
        document.getElementById(
            "sellerProductPrice"
        )?.value;

    const image =
        document.getElementById(
            "sellerProductImage"
        )?.value.trim();

    const description =
        document.getElementById(
            "sellerProductDescription"
        )?.value.trim();


    if (
        !name ||
        !category ||
        !price ||
        !image ||
        !description
    ) {

        alert(
            "Please fill all product details!"
        );

        return;

    }


    const products =
        getSellerProducts();


    const product = {

        id: Date.now(),

        name: name,

        category: category,

        price: Number(price),

        image: image,

        description: description

    };


    products.push(product);


    saveSellerProducts(products);


    // Form Clear

    document.getElementById(
        "sellerProductName"
    ).value = "";

    document.getElementById(
        "sellerProductCategory"
    ).value = "";

    document.getElementById(
        "sellerProductPrice"
    ).value = "";

    document.getElementById(
        "sellerProductImage"
    ).value = "";

    document.getElementById(
        "sellerProductDescription"
    ).value = "";


    displaySellerProducts();

    updateSellerStats();


    alert(
        "🎉 Product added successfully!"
    );

}


// Display Products

function displaySellerProducts() {

    const grid =
        document.getElementById(
            "sellerProductsGrid"
        );

    const empty =
        document.getElementById(
            "sellerEmptyProducts"
        );


    if (!grid) return;


    const products =
        getSellerProducts();


    grid.innerHTML = "";


    if (products.length === 0) {

        empty.style.display = "block";

        return;

    }


    empty.style.display = "none";


    products.forEach(product => {

        const card =
            document.createElement("div");

        card.className =
            "seller-product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <div class="seller-product-info">

                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.description}
                </p>


                <div class="seller-product-price">

                    ₹${product.price.toLocaleString()}

                </div>


                <div class="seller-product-actions">

                    <button
                        class="edit-product-btn"
                        onclick="editSellerProduct(${product.id})"
                    >

                        <i class="fa-solid fa-pen"></i>
                        Edit

                    </button>


                    <button
                        class="delete-product-btn"
                        onclick="deleteSellerProduct(${product.id})"
                    >

                        <i class="fa-solid fa-trash"></i>
                        Delete

                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


// Delete Product

function deleteSellerProduct(id) {

    const confirmDelete =
        confirm(
            "Delete this product?"
        );


    if (!confirmDelete) return;


    let products =
        getSellerProducts();


    products =
        products.filter(
            product =>
                product.id !== id
        );


    saveSellerProducts(products);


    displaySellerProducts();

    updateSellerStats();

}


// Edit Product

function editSellerProduct(id) {

    const products =
        getSellerProducts();


    const product =
        products.find(
            product =>
                product.id === id
        );


    if (!product) return;


    document.getElementById(
        "sellerProductName"
    ).value = product.name;


    document.getElementById(
        "sellerProductCategory"
    ).value = product.category;


    document.getElementById(
        "sellerProductPrice"
    ).value = product.price;


    document.getElementById(
        "sellerProductImage"
    ).value = product.image;


    document.getElementById(
        "sellerProductDescription"
    ).value = product.description;


    // Delete old product
    deleteSellerProduct(id);


    document.getElementById(
        "addProduct"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


// Seller Stats

function updateSellerStats() {

    const products =
        getSellerProducts();


    const totalProducts =
        document.getElementById(
            "totalProducts"
        );


    const productBadge =
        document.getElementById(
            "productCountBadge"
        );


    if (totalProducts) {

        totalProducts.innerText =
            products.length;

    }


    if (productBadge) {

        productBadge.innerText =
            products.length;

    }

}


// Seller User Name

function updateSellerUser() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "marketHubCurrentUser"
            )
        );


    if (!user) return;


    const sellerName =
        document.getElementById(
            "sellerName"
        );


    const sellerWelcome =
        document.getElementById(
            "sellerWelcome"
        );


    if (sellerName) {

        sellerName.innerText =
            user.name;

    }


    if (sellerWelcome) {

        sellerWelcome.innerText =
            user.name;

    }

}


// Seller Page Load

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSellerUser();

        displaySellerProducts();

        updateSellerStats();

    }
);

// ================= SELLER PRODUCTS ON PRODUCTS PAGE =================
function addSellerProductsToMarketplace() {
    const grid = document.getElementById("marketProductGrid");
    if (!grid) return;

    // Remove previously rendered seller products before rendering again
    grid.querySelectorAll(".seller-market-product").forEach(card => card.remove());

    const sellerProducts = JSON.parse(localStorage.getItem("marketHubSellerProducts")) || [];

    sellerProducts.forEach(product => {
        const category = String(product.category || "Other").toLowerCase();
        const price = Number(product.price || 0);
        const safeName = String(product.name || "Product");
        const card = document.createElement("div");
        card.className = "market-product-card seller-market-product";
        card.dataset.category = category;
        card.dataset.price = price;
        card.dataset.rating = 4;

        card.innerHTML = `
            <div class="market-product-image">
                <img src="${product.image}" alt="${safeName}" onerror="this.src='https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=900&q=85'">
                <span class="discount">NEW</span>
                <button class="wishlist" onclick="toggleWishlist(this)">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="market-product-info">
                <p class="product-category">${product.category}</p>
                <h3>${safeName}</h3>
                <div class="rating">⭐⭐⭐⭐ <span>(New)</span></div>
                <div class="product-price">₹${price.toLocaleString()}</div>
                <div class="product-actions">
                    <button class="view-product" onclick="viewSellerProduct(${product.id})">View</button>
                    <button class="product-cart" onclick="addSellerProductToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>`;
        grid.appendChild(card);
    });

    filterProducts();
}

function getSellerProductById(id) {
    const products = JSON.parse(localStorage.getItem("marketHubSellerProducts")) || [];
    return products.find(product => Number(product.id) === Number(id));
}

function addSellerProductToCart(id) {
    const product = getSellerProductById(id);
    if (!product) return;
    addToRealCart(product.name, Number(product.price), product.image);
}

function viewSellerProduct(id) {
    const product = getSellerProductById(id);
    if (!product) return;
    localStorage.setItem("selectedSellerProduct", JSON.stringify(product));
    window.location.href = "product-details.html";
}

document.addEventListener("DOMContentLoaded", addSellerProductsToMarketplace);
// ================= SELLER ORDERS =================

function getMarketHubOrders() {

    return JSON.parse(
        localStorage.getItem(
            "marketHubOrders"
        )
    ) || [];

}


// Seller Orders Display

function displaySellerOrders() {

    const ordersList =
        document.getElementById(
            "sellerOrdersList"
        );

    if (!ordersList) return;


    const orders =
        getMarketHubOrders();


    ordersList.innerHTML = "";


    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="seller-empty-orders">

                <i class="fa-solid fa-receipt"></i>

                <h3>No Orders Yet</h3>

                <p>
                    Your customer orders will appear here.
                </p>

            </div>

        `;

        return;

    }


    orders.forEach(order => {

        const status =
            order.status || "Pending";


        let productsHTML = "";


        order.products.forEach(product => {

            const image =
                product.image ||
                "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=200&q=80";


            const quantity =
                product.quantity || 1;


            const price =
                Number(product.price || 0);


            productsHTML += `

                <div class="seller-order-product">

                    <img
                        src="${image}"
                        alt="${product.name}"
                    >

                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <span>
                            Qty: ${quantity}
                        </span>

                    </div>

                    <b>
                        ₹${(price * quantity).toLocaleString()}
                    </b>

                </div>

            `;

        });


        let total = 0;


        order.products.forEach(product => {

            total +=
                Number(product.price || 0) *
                Number(product.quantity || 1);

        });


        const orderCard =
            document.createElement("div");


        orderCard.className =
            "seller-order-item";


        orderCard.innerHTML = `

            <div class="seller-order-header">

                <div>

                    <span class="order-id">
                        Order #${order.orderId}
                    </span>

                    <small>
                        ${order.orderDate}
                    </small>

                </div>


                <select
                    class="order-status ${status.toLowerCase()}"
                    onchange="updateOrderStatus(
                        '${order.orderId}',
                        this.value
                    )"
                >

                    <option
                        value="Pending"
                        ${status === "Pending" ? "selected" : ""}
                    >
                        Pending
                    </option>

                    <option
                        value="Shipped"
                        ${status === "Shipped" ? "selected" : ""}
                    >
                        Shipped
                    </option>

                    <option
                        value="Delivered"
                        ${status === "Delivered" ? "selected" : ""}
                    >
                        Delivered
                    </option>

                </select>

            </div>


            <div class="seller-customer-info">

                <h3>
                    <i class="fa-solid fa-user"></i>
                    ${order.customer.name}
                </h3>

                <p>
                    <i class="fa-solid fa-phone"></i>
                    ${order.customer.mobile}
                </p>

                <p>
                    <i class="fa-solid fa-location-dot"></i>

                    ${order.customer.address},
                    ${order.customer.city},
                    ${order.customer.state}
                    - ${order.customer.pincode}

                </p>

            </div>


            <div class="seller-order-products">

                ${productsHTML}

            </div>


            <div class="seller-order-footer">

                <div>

                    <span>Payment:</span>

                    <b>
                        ${order.payment}
                    </b>

                </div>


                <div class="seller-order-total">

                    Total:
                    ₹${total.toLocaleString()}

                </div>

            </div>

        `;


        ordersList.appendChild(
            orderCard
        );

    });

}


// Update Order Status

function updateOrderStatus(
    orderId,
    newStatus
) {

    const orders =
        getMarketHubOrders();


    const order =
        orders.find(
            order =>
                order.orderId === orderId
        );


    if (!order) return;


    order.status =
        newStatus;


    localStorage.setItem(
        "marketHubOrders",
        JSON.stringify(orders)
    );


    displaySellerOrders();

    updateSellerOrderStats();

}


// Update Seller Order Stats

function updateSellerOrderStats() {

    const orders =
        getMarketHubOrders();


    const totalOrders =
        document.getElementById(
            "sellerOrders"
        );


    const totalSales =
        document.getElementById(
            "sellerSales"
        );


    let sales = 0;


    orders.forEach(order => {

        order.products.forEach(product => {

            sales +=
                Number(product.price || 0) *
                Number(product.quantity || 1);

        });

    });


    if (totalOrders) {

        totalOrders.innerText =
            orders.length;

    }


    if (totalSales) {

        totalSales.innerText =
            "₹" +
            sales.toLocaleString();

    }

}


// Seller Orders Page Load

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displaySellerOrders();

        updateSellerOrderStats();

    }
);
// ================= ADMIN DASHBOARD =================


// Get Users

function getAdminUsers() {

    return JSON.parse(
        localStorage.getItem(
            "marketHubUsers"
        )
    ) || [];

}


// Get Products

function getAdminProducts() {

    return JSON.parse(
        localStorage.getItem(
            "marketHubSellerProducts"
        )
    ) || [];

}


// Get Orders

function getAdminOrders() {

    return JSON.parse(
        localStorage.getItem(
            "marketHubOrders"
        )
    ) || [];

}


// ADMIN STATS

function updateAdminStats() {

    const users =
        getAdminUsers();

    const products =
        getAdminProducts();

    const orders =
        getAdminOrders();


    let sales = 0;


    orders.forEach(order => {

        (order.products || []).forEach(product => {

            sales +=
                Number(product.price || 0) *
                Number(product.quantity || 1);

        });

    });


    const usersElement =
        document.getElementById(
            "adminTotalUsers"
        );

    const productsElement =
        document.getElementById(
            "adminTotalProducts"
        );

    const ordersElement =
        document.getElementById(
            "adminTotalOrders"
        );

    const salesElement =
        document.getElementById(
            "adminTotalSales"
        );


    if (usersElement) {

        usersElement.innerText =
            users.length;

    }


    if (productsElement) {

        productsElement.innerText =
            products.length;

    }


    if (ordersElement) {

        ordersElement.innerText =
            orders.length;

    }


    if (salesElement) {

        salesElement.innerText =
            "₹" +
            sales.toLocaleString();

    }

}


// DISPLAY USERS

function displayAdminUsers() {

    const usersList =
        document.getElementById(
            "adminUsersList"
        );

    const badge =
        document.getElementById(
            "adminUsersBadge"
        );


    if (!usersList) return;


    const users =
        getAdminUsers();


    usersList.innerHTML = "";


    if (badge) {

        badge.innerText =
            users.length +
            " Users";

    }


    if (users.length === 0) {

        usersList.innerHTML = `

            <tr>
                <td colspan="4">
                    No registered users found.
                </td>
            </tr>

        `;

        return;

    }


    users.forEach((user, index) => {

        usersList.innerHTML += `

            <tr>

                <td>
                    ${user.name}
                </td>

                <td>
                    ${user.email}
                </td>

                <td>

                    <span class="admin-role">

                        ${user.role || "Customer"}

                    </span>

                </td>

                <td>

                    <button
                        class="admin-delete-user"
                        onclick="deleteAdminUser(${index})"
                    >

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

        `;

    });

}


// DELETE USER

function deleteAdminUser(index) {

    if (!confirm("Delete this user?")) {

        return;

    }


    const users =
        getAdminUsers();


    users.splice(index, 1);


    localStorage.setItem(
        "marketHubUsers",
        JSON.stringify(users)
    );


    displayAdminUsers();

    updateAdminStats();

}


// DISPLAY PRODUCTS

function displayAdminProducts() {

    const productsList =
        document.getElementById(
            "adminProductsList"
        );

    const badge =
        document.getElementById(
            "adminProductsBadge"
        );


    if (!productsList) return;


    const products =
        getAdminProducts();


    productsList.innerHTML = "";


    if (badge) {

        badge.innerText =
            products.length +
            " Products";

    }


    if (products.length === 0) {

        productsList.innerHTML = `

            <p>
                No products found.
            </p>

        `;

        return;

    }


    products.forEach(product => {

        productsList.innerHTML += `

            <div class="admin-product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="admin-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.category}
                    </p>

                    <div class="admin-product-price">

                        ₹${Number(
                            product.price
                        ).toLocaleString()}

                    </div>

                    <button
                        class="admin-delete-product"
                        onclick="deleteAdminProduct(
                            ${product.id}
                        )"
                    >

                        <i class="fa-solid fa-trash"></i>

                        Delete Product

                    </button>

                </div>

            </div>

        `;

    });

}


// DELETE PRODUCT

function deleteAdminProduct(id) {

    if (!confirm(
        "Delete this product?"
    )) {

        return;

    }


    let products =
        getAdminProducts();


    products =
        products.filter(
            product =>
                product.id !== id
        );


    localStorage.setItem(
        "marketHubSellerProducts",
        JSON.stringify(products)
    );


    displayAdminProducts();

    updateAdminStats();

}


// DISPLAY ORDERS

function displayAdminOrders() {

    const ordersList =
        document.getElementById(
            "adminOrdersList"
        );


    if (!ordersList) return;


    const orders =
        getAdminOrders();


    ordersList.innerHTML = "";


    if (orders.length === 0) {

        ordersList.innerHTML = `

            <div class="seller-empty-orders">

                <i class="fa-solid fa-receipt"></i>

                <h3>No Orders Yet</h3>

            </div>

        `;

        return;

    }


    orders.forEach(order => {

        let total = 0;


        (order.products || []).forEach(product => {

            total +=
                Number(product.price || 0) *
                Number(product.quantity || 1);

        });


        ordersList.innerHTML += `

            <div class="admin-order-card">

                <div class="admin-order-top">

                    <div>

                        <div
                            class="admin-order-id"
                        >

                            Order #
                            ${order.orderId}

                        </div>

                        <small>
                            ${order.orderDate}
                        </small>

                    </div>


                    <div>

                        ${order.status || "Pending"}

                    </div>

                </div>


                <div
                    class="admin-order-customer"
                >

                    <b>
                        Customer:
                    </b>

                    ${order.customer?.name || "Customer"}

                    <br>

                    📞
                    ${order.customer?.mobile || "-"}

                    <br>

                    💳
                    ${order.payment || "-"}

                </div>


                <div
                    class="admin-order-total"
                >

                    Total:
                    ₹${total.toLocaleString()}

                </div>

            </div>

        `;

    });

}


// ADMIN LOGOUT

function adminLogout() {

    localStorage.removeItem(
        "marketHubCurrentUser"
    );


    window.location.href =
        "index.html";

}


// ADMIN PAGE LOAD

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAdminStats();

        displayAdminUsers();

        displayAdminProducts();

        displayAdminOrders();

    }
);
// ================= SELLER REGISTRATION =================

function registerSeller() {

    const storeName =
        document.getElementById(
            "sellerStoreName"
        )?.value.trim();

    const ownerName =
        document.getElementById(
            "sellerOwnerName"
        )?.value.trim();

    const email =
        document.getElementById(
            "sellerEmail"
        )?.value.trim();

    const mobile =
        document.getElementById(
            "sellerMobile"
        )?.value.trim();

    const password =
        document.getElementById(
            "sellerPassword"
        )?.value;


    if (
        !storeName ||
        !ownerName ||
        !email ||
        !mobile ||
        !password
    ) {

        alert("Please fill all details!");

        return;
    }


    const users =
        JSON.parse(
            localStorage.getItem(
                "marketHubUsers"
            )
        ) || [];


    const alreadyExists =
        users.find(
            user =>
                user.email === email
        );


    if (alreadyExists) {

        alert(
            "Email already registered!"
        );

        return;
    }


    const seller = {

        id: Date.now(),

        name: ownerName,

        storeName: storeName,

        email: email,

        mobile: mobile,

        password: password,

        role: "seller"

    };


    users.push(seller);


    localStorage.setItem(
        "marketHubUsers",
        JSON.stringify(users)
    );


    alert(
        "🎉 Seller account created successfully!"
    );


    window.location.href =
        "login.html";

}


// ================= ADMIN LOGIN =================

function loginAdmin() {

    const adminId =
        document.getElementById(
            "adminId"
        )?.value.trim();

    const password =
        document.getElementById(
            "adminPassword"
        )?.value;


    // Demo Admin Credentials

    const correctAdminId =
        "admin";

    const correctPassword =
        "admin123";


    if (
        adminId === correctAdminId &&
        password === correctPassword
    ) {

        const admin = {

            name: "Administrator",

            role: "admin"

        };


        localStorage.setItem(
            "marketHubCurrentUser",
            JSON.stringify(admin)
        );


        alert(
            "🎉 Admin Login Successful!"
        );


        window.location.href =
            "admin-dashboard.html";

    } else {

        alert(
            "Invalid Admin ID or Password!"
        );

    }

}
async function registerSeller() {

    const storeName = document.getElementById("sellerStoreName").value.trim();
    const name = document.getElementById("sellerOwnerName").value.trim();
    const email = document.getElementById("sellerEmail").value.trim();
    const mobile = document.getElementById("sellerMobile").value.trim();
    const password = document.getElementById("sellerPassword").value.trim();

    if (!storeName || !name || !email || !mobile || !password) {
        alert("Please fill all fields!");
        return;
    }

    const userData = {
        storeName: storeName,
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        role: "SELLER"
    };

    try {

        const response = await fetch("http://localhost:8080/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {

            alert("Seller Account Created Successfully! 🎉");

            window.location.href = "login.html";

        } else {

            const error = await response.text();
            alert("Registration Failed: " + error);

        }

    } catch (error) {

        console.error(error);
        alert("Cannot connect to server! Make sure Spring Boot is running.");

    }
}
async function loginUser() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter email and password!");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:8080/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data);
            return;
        }

        // User माहिती temporary save
        localStorage.setItem("currentUser", JSON.stringify(data));

        // Role नुसार redirect
        if (data.role === "SELLER") {

            window.location.href = "seller-dashboard.html";

        } else if (data.role === "CUSTOMER") {

            window.location.href = "index.html";

        } else {

            alert("Login successful!");

        }

    } catch (error) {

        console.error(error);
        alert("Cannot connect to server! Make sure backend is running.");

    }
}
// ================================
// SELLER DASHBOARD - USER DATA
// ================================

function loadSellerDashboard() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    // Login नसेल तर login page वर पाठवा
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }

    // Seller नसल्यास login page
    if (currentUser.role !== "SELLER") {
        alert("Please login as a seller!");
        window.location.href = "login.html";
        return;
    }

    // Seller Name
    const sellerName = document.getElementById("sellerName");
    const sellerWelcome = document.getElementById("sellerWelcome");

    if (sellerName) {
        sellerName.textContent = currentUser.name;
    }

    if (sellerWelcome) {
        sellerWelcome.textContent = currentUser.name;
    }

}


// ================================
// LOGOUT
// ================================

function logoutUser() {

    localStorage.removeItem("currentUser");

    alert("Logged out successfully!");

    window.location.href = "login.html";

}


// Dashboard असल्यास load करा

if (document.getElementById("sellerName")) {

    loadSellerDashboard();

}
// =====================================
// ADD PRODUCT TO JAVA + MYSQL
// =====================================

async function addSellerProduct() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    const name = document.getElementById("sellerProductName").value.trim();
    const category = document.getElementById("sellerProductCategory").value;
    const price = document.getElementById("sellerProductPrice").value;
    const image = document.getElementById("sellerProductImage").value.trim();
    const description = document.getElementById("sellerProductDescription").value.trim();

    if (!name || !category || !price) {
        alert("Please fill Product Name, Category and Price!");
        return;
    }

    const product = {
        name: name,
        category: category,
        price: Number(price),
        image: image,
        description: description,
        sellerId: currentUser.id
    };

    try {

        const response = await fetch(
            "http://localhost:8080/api/products",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(product)
            }
        );

        if (!response.ok) {
            throw new Error("Product not saved");
        }

        alert("Product added successfully! 🎉");

        // Clear form
        document.getElementById("sellerProductName").value = "";
        document.getElementById("sellerProductCategory").value = "";
        document.getElementById("sellerProductPrice").value = "";
        document.getElementById("sellerProductImage").value = "";
        document.getElementById("sellerProductDescription").value = "";

        // पुढे products reload करू
        loadSellerProducts();

    } catch (error) {

        console.error(error);
        alert("Error adding product. Make sure backend is running!");

    }
}
// =====================================
// LOAD SELLER PRODUCTS FROM DATABASE
// =====================================

async function loadSellerProducts() {

    const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
    );

    if (!currentUser) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:8080/api/products/seller/${currentUser.id}`
        );

        const products = await response.json();

        const productsGrid =
            document.getElementById("sellerProductsGrid");

        const emptyProducts =
            document.getElementById("sellerEmptyProducts");

        const totalProducts =
            document.getElementById("totalProducts");

        const productCountBadge =
            document.getElementById("productCountBadge");

        // Products clear करा
        productsGrid.innerHTML = "";

        // Count update
        if (totalProducts) {
            totalProducts.textContent = products.length;
        }

        if (productCountBadge) {
            productCountBadge.textContent = products.length;
        }

        // Empty check
        if (products.length === 0) {

            emptyProducts.style.display = "block";
            return;

        }

        emptyProducts.style.display = "none";

        // Products display
        products.forEach(product => {

            productsGrid.innerHTML += `
                <div class="seller-product-card">

                    <img
                        src="${product.image || 'https://via.placeholder.com/300'}"
                        alt="${product.name}"
                    >

                    <div class="seller-product-info">

                        <span>${product.category}</span>

                        <h3>${product.name}</h3>

                        <p>${product.description || ''}</p>

                        <h2>₹${product.price}</h2>
                        <button onclick="deleteSellerProduct(${product.id})">
    Delete Product
</button>

                    </div>

                </div>
            `;

        });

    } catch (error) {

        console.error("Error loading products:", error);

    }
}


// Seller Dashboard load झाल्यावर products पण load करा

if (document.getElementById("sellerProductsGrid")) {

    loadSellerProducts();

}
async function deleteSellerProduct(id) {

    if (!confirm("Delete this product?")) {
        return;
    }

    try {

        await fetch(
            `http://localhost:8080/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        alert("Product deleted successfully!");

        loadSellerProducts();

    } catch (error) {

        alert("Error deleting product!");

    }

}
async function loadDatabaseProducts() {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    try {

        const response = await fetch(
            "http://localhost:8080/api/products"
        );

        const products = await response.json();

        products.forEach(product => {

            productGrid.innerHTML += `

                <div class="product-card">

                    <div class="product-image">

                        <img src="${product.image || 'https://via.placeholder.com/300'}"
                             alt="${product.name}">

                    </div>

                    <div class="product-info">

                        <p class="product-category">
                            ${product.category}
                        </p>

                        <h3>${product.name}</h3>

                        <div class="price-row">

                            <span class="price">
                                ₹${product.price}
                            </span>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.log("Products not loaded");

    }

}

loadDatabaseProducts();
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product) {

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}
async function addToCartById(id) {

    const response = await fetch(
        "http://localhost:8080/api/products"
    );

    const products = await response.json();

    const product = products.find(p => p.id === id);

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}
async function loadMarketProducts() {

    const grid = document.getElementById("marketProductGrid");

    if (!grid) return;

    try {

        const response = await fetch(
            "http://localhost:8080/api/products"
        );

        const products = await response.json();

        products.forEach(product => {

            grid.innerHTML += `

                <div class="market-product-card"
                    data-category="${product.category}"
                    data-price="${product.price}"
                    data-rating="5">

                    <div class="market-product-image">

                        <img src="${product.image || 'https://via.placeholder.com/300'}"
                            alt="${product.name}">

                    </div>

                    <div class="market-product-info">

                        <p class="product-category">
                            ${product.category}
                        </p>

                        <h3>${product.name}</h3>

                        <div class="rating">
                            ⭐⭐⭐⭐⭐
                        </div>

                        <div class="product-price">
                            ₹${product.price}
                        </div>

                        <div class="product-actions">

                            <button class="view-product">
                                View
                            </button>

                            <button
                                class="product-cart"
                                onclick="addToCartById(${product.id})">

                                <i class="fa-solid fa-cart-plus"></i>

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    } catch (error) {

        console.log("Database products not loaded");

    }

}

loadMarketProducts();
const cartBtn = document.getElementById("cartBtn");

if (cartBtn) {
    cartBtn.onclick = function () {
        window.location.href = "cart.html";
    };
}
function loadCart() {

    const cartItems = document.getElementById("cartItems");
    const emptyCart = document.getElementById("emptyCart");

    if (!cartItems) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        emptyCart.style.display = "block";

    } else {

        emptyCart.style.display = "none";

        cart.forEach((product, index) => {

            total += Number(product.price);

            cartItems.innerHTML += `

                <div class="cart-item">

                    <img src="${product.image || 'https://via.placeholder.com/100'}">

                    <div class="cart-item-info">

                        <h3>${product.name}</h3>

                        <p>${product.category || ''}</p>

                        <h3>₹${product.price}</h3>

                    </div>

                    <button onclick="removeFromCart(${index})">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            `;
        });

    }

    document.getElementById("subtotal").innerText = "₹" + total;

    document.getElementById("total").innerText = "₹" + total;

    updateCartCount();
}


function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


function clearCart() {

    localStorage.removeItem("cart");

    loadCart();
}


function checkout() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("Order placed successfully! 🎉");

    localStorage.removeItem("cart");

    loadCart();
}


function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    document.querySelectorAll(".cart-count").forEach(count => {

        count.innerText = cart.length;

    });
}


loadCart();
updateCartCount();
function filterProducts() {

    const search = document
        .getElementById("productSearch")
        ?.value
        .toLowerCase() || "";

    const category = document.querySelector(
        'input[name="category"]:checked'
    )?.value || "all";

    const price = document
        .getElementById("priceFilter")
        ?.value || "all";

    const products = document.querySelectorAll(
        ".market-product-card"
    );

    let visibleCount = 0;

    products.forEach(product => {

        const name = product
            .querySelector("h3")
            ?.innerText
            .toLowerCase() || "";

        const productCategory =
            product.dataset.category.toLowerCase();

        const productPrice =
            Number(product.dataset.price);

        const searchMatch =
            name.includes(search);

        const categoryMatch =
            category === "all" ||
            productCategory === category;

        const priceMatch =
            price === "all" ||
            productPrice <= Number(price);

        if (
            searchMatch &&
            categoryMatch &&
            priceMatch
        ) {

            product.style.display = "block";
            visibleCount++;

        } else {

            product.style.display = "none";

        }

    });

    const count =
        document.getElementById("productCount");

    if (count) {

        count.innerText =
            `Showing ${visibleCount} Products`;

    }

}