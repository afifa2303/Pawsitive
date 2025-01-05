// Products Array - Add your images by replacing the file paths with paths to images on your PC.
const products = [
    {
      id: 1,
      name: "Cat Toy",
      description: "A fun toy for your cat.",
      price: 200,
      image: "./img/cat-toy.jpg", // Replace with your image path
    },
    {
      id: 2,
      name: "Cat Toy",
      description: "A fun toy for your cat.",
      price: 300,
      image: "./img/cat toy3.jpg", // Replace with your image path
    },
    {
      id: 3,
      name: "Cat Food",
      description: "Delicious Food",
      price: 450,
      image: "./img/karniva food.png", // Replace with your image path
    },
    {
      id: 4,
      name: "Cat Food",
      description: "Healthy Food",
      price: 500,
      image: "./img/catfood.jpg", // Replace with your image path
    },
    {
      id: 5,
      name: "Carry Bag",
      description: "To carry your pet with you.",
      price: 1000,
      image: "./img/carry bag.jpeg", // Replace with your image path
    },
    {
      id: 6,
      name: "Litter Box",
      description: "A durable and spacious litter box to keep your cat comfortable.",
      price: 600,
      image: "./img/litter box.jpg", // Replace with your image path
    },
    {
      id: 7,
      name: "Litter Box",
      description: "A durable and spacious litter box to keep your cat comfortable.",
      price: 300,
      image: "./img/litterbox2.jpeg", // Replace with your image path
    },
    {
      id: 8,
      name: "Cat litter",
      description: "Premium clumping cat litter for odor control and easy cleaning.",
      price:300,
      image: "./img/cat litter.jpg", // Replace with your image path
    },
    {
      id: 9,
      name: "Cat litter",
      description: "Premium clumping cat litter for odor control and easy cleaning.",
      price: 350,
      image: "./img/cat litter2.jpg", // Replace with your image path
    }, 
    {
      id: 10,
      name: "Cat House",
      description: "A cozy place for your cat.",
      price: 2000,
      image: "./img/cathouse.jpeg", // Replace with your image path
    }, 
    {
      id: 11,
      name: "Carry Box",
      description: "A sturdy and portable carry box for safe and comfortable travel with your cat.",
      price: 800,
      image: "./img/pet carry box.jpg", // Replace with your image path
    },
    {
      id: 12,
      name: "Cat Bed",
      description: "A cozy bed for your cat.",
      price: 1000,
      image: "./img/catbed.jpg", // Replace with your image path
    },
  ];
  
  const cart = [];
  
  // Function to render products
  function renderProducts() {
    const productList = document.getElementById("product-list");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
  
      productList.appendChild(productCard);
    });
  }
  
  // Function to add item to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    renderCart();
  }
  
  // Function to render cart
  function renderCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear previous cart items
  
    let totalPrice = 0;
    cart.forEach((item, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} - $${item.price}`;
      cartItems.appendChild(listItem);
      totalPrice += item.price;
    });
  
    document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
  }
  
  // Initialize the store
  renderProducts();
  