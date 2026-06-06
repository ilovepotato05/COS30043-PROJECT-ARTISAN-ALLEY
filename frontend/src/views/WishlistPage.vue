<template>
  <main class="wishlist-page">

    <!-- Header -->
    <section class="page_header">
      <h1>Your Wishlist</h1>
      <p>Saved items for {{ userLabel }}</p>
    </section>

    <!-- Empty State -->
    <div v-if="wishlistItems.length === 0" class="empty_state">
      <p>Your wishlist is empty.</p>
    </div>

    <!-- GRID (same style as product listing) -->
    <section v-else class="product_grid">

      <div
        v-for="item in wishlistItems"
        :key="item._id"
        class="product_card"
      >

        <!-- Image -->
        <img
          :src="`http://localhost:5000/images/${item.image}`"
          :alt="item.name"
        />

        <!-- Info -->
        <div class="product_info">
          <p class="product_category">{{ item.category }}</p>

          <h3>{{ item.name }}</h3>

          <p class="product_price">
            RM {{ Number(item.price).toFixed(2) }}
          </p>

          <!-- Actions -->
          <div class="product_actions">

            <button class="btn_cart" @click="moveToCart(item)">
              Move to Cart
            </button>

            <button class="btn_remove" @click="removeItem(item._id)">
              Remove
            </button>

          </div>

        </div>

      </div>

    </section>

  </main>
</template>

<script>
import api from '../services/api'

export default {
  name: 'WishlistPage',

  data() {
    return {
      userLabel: 'Guest',
      wishlistItems: []
    }
  },

  async mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userLabel = user?.name || 'Guest'

    await this.fetchWishlist()
  },

  methods: {

    // 📥 GET wishlist from backend
    async fetchWishlist() {
      try {
        const res = await api.get('/wishlist')
        this.wishlistItems = res.data
      } catch (err) {
        console.error('Failed to load wishlist:', err)
      }
    },

    // ❌ Remove from wishlist
    async removeItem(id) {
      try {
        await api.delete(`/wishlist/${id}`)
        this.wishlistItems = this.wishlistItems.filter(
          item => item._id !== id
        )
      } catch (err) {
        console.error('Remove failed:', err)
      }
    },

    // 🛒 Move to cart
    moveToCart(item) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []

      const existing = cart.find(i => i._id === item.productId || i._id === item._id)

      if (existing) {
        existing.quantity += 1
      } else {
        cart.push({
          _id: item.productId || item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: 1
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))

      this.removeItem(item._id)

      alert(`${item.name} moved to cart`)
    }
  }
}
</script>

<style scoped>
.wishlist-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

/* Header */
.page_header {
  margin-bottom: 2rem;
}

.page_header h1 {
  margin: 0 0 0.5rem;
  color: #674C47;
  font-size: 2rem;
}

.page_header p {
  margin: 0;
  color: #997654;
}

/* Empty state */
.empty_state {
  text-align: center;
  padding: 3rem;
  color: #674C47;
  font-size: 1.1rem;
}

/* GRID (same as product listing) */
.product_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* CARD */
.product_card {
  background: #fff;
  border: 1px solid #E5D1B7;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(103, 76, 71, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product_card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 22px rgba(103, 76, 71, 0.12);
}

/* IMAGE */
.product_card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

/* INFO */
.product_info {
  padding: 1rem;
}

.product_category {
  margin: 0 0 0.4rem;
  color: #997654;
  font-size: 0.9rem;
}

.product_info h3 {
  margin: 0 0 0.5rem;
  color: #674C47;
  font-size: 1.1rem;
}

.product_price {
  margin: 0 0 1rem;
  color: #DC8C24;
  font-weight: 700;
  font-size: 1.1rem;
}

/* ACTIONS */
.product_actions {
  display: flex;
  gap: 0.75rem;
}

/* BUTTONS */
.btn_cart {
  flex: 1;
  padding: 0.65rem 0.9rem;
  background: #DC8C24;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn_cart:hover {
  background: #997654;
}

.btn_remove {
  flex: 1;
  padding: 0.65rem 0.9rem;
  background: #674C47;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn_remove:hover {
  background: #E5D1B7;
  color: #674C47;
}

/* RESPONSIVE */
@media (max-width: 950px) {
  .product_grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product_grid {
    grid-template-columns: 1fr;
  }

  .page_header h1 {
    font-size: 1.6rem;
  }
}
</style>