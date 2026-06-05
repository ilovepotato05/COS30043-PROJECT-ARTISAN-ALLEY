<script>
import { RouterLink } from 'vue-router'
import api from '../services/api'

export default {
  name: 'CartPage',
  components: {
    RouterLink
  },
  data() {
    return {
      cart: []
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    },
    totalItems() {
      return this.cart.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    }
  },
  mounted(){
    this.cart = JSON.parse(localStorage.getItem('cart')) || []
  },
  methods: {
    increaseQty(item) {
      item.quantity++
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity--
        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeItem(id) {
      this.cart = this.cart.filter(item => item._id !== id)
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    async checkOut() {
      const user = JSON.parse(localStorage.getItem('user'))

      if(!user){
        alert('Please login first')
        this.$router.push('/login')
        return
      }

      try {
        const orderData = {
          userId: user._id,
          items: this.cart,
          total: this.totalPrice,
          status: 'Pending',
          date: new Date().toLocaleString()
        }

        await api.post('/orders', orderData)

        alert('Order placed successfully!')

        localStorage.removeItem('cart')
        this.cart = []

        this.$router.push('/orders')
      } catch (err) {
        alert('Failed to place order', err)
      }
    }
  }
}
</script>

<template>
  <main class="cart-page">
    <h1>Your Shopping Cart</h1>

    <!-- EMPTY CART -->
    <div v-if="cart.length === 0" class="empty_cart">
      <p>Your cart is empty.</p>
      <RouterLink to="/products" class="btn_shop">Go Shopping</RouterLink>
    </div>

    <!-- CART ITEMS -->
    <div v-else class="cart_layout">
      
      <div class="cart_items">
        <div class="cart_item" v-for="item in cart" :key="item._id">
          
          <img :src="`http://localhost:5000/images/${item.image}`" alt="product" />

          <div class="item_info">
            <h3>{{ item.name }}</h3>
            <p class="price">RM {{ Number(item.price).toFixed(2) }}</p>

            <div class="quantity_control">
              <button @click="decreaseQty(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQty(item)">+</button>
            </div>

            <button class="remove_btn" @click="removeItem(item._id)">
              Remove
            </button>
          </div>

        </div>
      </div>

      <!-- SUMMARY -->
      <div class="cart_summary">
        <h2>Order Summary</h2>

        <p>Total Items: {{ totalItems }}</p>
        <p class="total_price">Total: RM {{ totalPrice.toFixed(2) }}</p>

        <button class="checkout_btn" @click="checkOut">Proceed to Checkout</button>
      </div>

    </div>
  </main>
</template>

<style scoped>
.cart-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

h1 {
  margin-bottom: 2rem;
  color: #674C47;
}

/* EMPTY CART */
.empty_cart {
  text-align: center;
  color: #997654;
}

.btn_shop {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.7rem 1.2rem;
  background: #DC8C24;
  color: white;
  text-decoration: none;
  border-radius: 10px;
}

/* LAYOUT */
.cart_layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

/* ITEMS */
.cart_item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: #fff;
  border: 1px solid #E5D1B7;
  border-radius: 12px;
  padding: 1rem;
}

.cart_item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
}

.item_info h3 {
  margin: 0;
  color: #674C47;
}

.price {
  color: #DC8C24;
  margin: 0.3rem 0;
}

/* QUANTITY */
.quantity_control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.quantity_control button {
  width: 30px;
  height: 30px;
  border: none;
  background: #EAE0C7;
  cursor: pointer;
  border-radius: 5px;
}

.remove_btn {
  background: none;
  border: none;
  color: #997654;
  cursor: pointer;
}

/* SUMMARY */
.cart_summary {
  background: #EAE0C7;
  border: 1px solid #E5D1B7;
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
}

.cart_summary h2 {
  margin-top: 0;
  color: #674C47;
}

.total_price {
  font-weight: bold;
  color: #DC8C24;
  margin: 1rem 0;
}

.checkout_btn {
  width: 100%;
  padding: 0.8rem;
  background: #DC8C24;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.checkout_btn:hover {
  background: #997654;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .cart_layout {
    grid-template-columns: 1fr;
  }
}
</style>