// Get cart
export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

// Add item
export const addToCart = (item) => {
  const cart = getCart();

  // Check if same product + size already exists
  const existing = cart.find(
    (i) => i.id === item.id && i.size === item.size
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Remove item
export const removeFromCart = (index) => {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Update quantity
export const updateQuantity = (index, quantity) => {
  const cart = getCart();
  cart[index].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
};