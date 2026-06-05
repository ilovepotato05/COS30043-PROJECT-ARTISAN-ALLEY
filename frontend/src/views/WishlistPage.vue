<script>
import { mockWishlistItems } from '../data/accountMockData'

export default {
  name: 'WishlistPage',
  data() {
    return {
      userLabel: 'Guest',
      wishlistItems: []
    }
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.userLabel = user?.name || 'Guest'
    this.wishlistItems = this.loadWishlist(user)
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.back()
        return
      }

      this.$router.push('/')
    },
    getWishlistStorageKey(user) {
      return `wishlist:${user?._id || user?.email || 'guest'}`
    },
    loadWishlist(user) {
      const storedWishlist = localStorage.getItem(this.getWishlistStorageKey(user))
      if (storedWishlist) {
        try {
          return JSON.parse(storedWishlist)
        } catch (error) {
          console.error('Failed to parse stored wishlist:', error)
        }
      }

      return [...mockWishlistItems]
    },
    persistWishlist() {
      const user = JSON.parse(localStorage.getItem('user'))
      localStorage.setItem(this.getWishlistStorageKey(user), JSON.stringify(this.wishlistItems))
    },
    removeItem(itemId) {
      this.wishlistItems = this.wishlistItems.filter(item => item._id !== itemId)
      this.persistWishlist()
    },
    moveToCart(item) {
      const currentCart = JSON.parse(localStorage.getItem('cart')) || []
      const existingItem = currentCart.find(cartItem => cartItem._id === item._id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        currentCart.push({ ...item, quantity: 1 })
      }

      localStorage.setItem('cart', JSON.stringify(currentCart))
      this.removeItem(item._id)
      alert(`${item.name} moved to cart.`)
    }
  }
}
</script>

<template>
  <main class="wishlist-page">
    <button type="button" class="back_btn" @click="goBack">Back</button>

    <div class="page_header">
      <h1>Your Wishlist</h1>
      <p>Saved items for {{ userLabel }} are stored locally for now and shared across the dashboard.</p>
    </div>

    <div v-if="wishlistItems.length === 0" class="empty_state">
      <p>Your wishlist is empty.</p>
    </div>

    <div class="wishlist_grid">
      <article v-for="item in wishlistItems" :key="item._id" class="wishlist_card">
        <div class="wishlist_image">
          <span>{{ item.category }}</span>
        </div>
        <h2>{{ item.name }}</h2>
        <p class="price">RM {{ Number(item.price).toFixed(2) }}</p>
        <div class="card_actions">
          <button type="button" @click="moveToCart(item)">Move to Cart</button>
          <button type="button" class="secondary_btn" @click="removeItem(item._id)">Remove</button>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.wishlist-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.back_btn {
  margin-bottom: 1rem;
  border: 1px solid #E5D1B7;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  background: #fff;
  color: #674C47;
  cursor: pointer;
}

.back_btn:hover {
  color: #DC8C24;
}

.page_header h1 {
  margin: 0;
  color: #674C47;
}

.page_header p {
  margin: 0.5rem 0 1.5rem;
  color: #997654;
}

.wishlist_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.empty_state {
  background: #fff;
  border: 1px solid #E5D1B7;
  border-radius: 14px;
  padding: 1rem;
  color: #997654;
}

.wishlist_card {
  background: #fff;
  border: 1px solid #E5D1B7;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(103, 76, 71, 0.08);
}

.wishlist_image {
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(135deg, #eae0c7, #f5ede0);
  display: flex;
  align-items: end;
  padding: 0.75rem;
  color: #674C47;
  font-weight: 600;
}

.wishlist_card h2 {
  margin: 0.9rem 0 0.35rem;
  font-size: 1.05rem;
  color: #674C47;
}

.price {
  margin: 0;
  color: #DC8C24;
  font-weight: 600;
}

button {
  margin-top: 1rem;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background: #DC8C24;
  color: white;
  cursor: pointer;
}

.card_actions {
  display: grid;
  gap: 0.6rem;
}

.secondary_btn {
  background: #f4eadc;
  color: #674C47;
  border: 1px solid #E5D1B7;
}

@media (max-width: 768px) {
  .wishlist_grid {
    grid-template-columns: 1fr;
  }
}
</style>