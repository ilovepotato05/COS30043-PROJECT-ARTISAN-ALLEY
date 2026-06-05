<template>
  <main class="product-detail-page">
    <div v-if="loading" class="status_message">
      <p>Loading product...</p>
    </div>

    <div v-else-if="error" class="status_message error">
      <p>{{ error }}</p>
    </div>

    <section v-else-if="product" class="product_detail">
      <div class="product_image">
        <img :src="`http://localhost:5000/images/${product.image}`" :alt="product.name" />
      </div>

      <div class="product_info">
        <p class="product_category">{{ product.category }}</p>
        <h1>{{ product.name }}</h1>
        <p class="product_price">RM {{ Number(product.price).toFixed(2) }}</p>

        <p class="product_desc">
          {{ product.description }}
        </p>

        <div class="product_actions">
          <button class="btn_cart">Add to Cart</button>
          <RouterLink to="/products" class="btn_back">Back to Products</RouterLink>
          <button class="primary_btn" @click="tryOn(product)">Try On</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import api from '../services/api'


export default {
  name: 'ProductDetailPage',

  components: {
    RouterLink
  },
  data() {
    return {
      product: null,
      loading: true,
      error: ''
    }
  },
  async mounted() {
    try {
      const productId = this.$route.params.id
      const res = await api.get(`/products/${productId}`)
      this.product = res.data
    } catch (err) {
      console.error('Product detail API error:', err)
      this.error = 'Failed to load product details.'
    } finally {
      this.loading = false
    }
  },
  
}
</script>

<style scoped>
.product-detail-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.product_detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.product_image img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 20px;
  display: block;
  border: 1px solid #E5D1B7;
}

.product_info {
  display: flex;
  flex-direction: column;
}

.product_category {
  color: #997654;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.product_info h1 {
  margin: 0 0 1rem;
  color: #674C47;
  font-size: 2rem;
}

.product_price {
  color: #DC8C24;
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.product_desc {
  color: #674C47;
  line-height: 1.7;
  margin-bottom: 2rem;
  white-space: pre-line;
}

.product_actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn_cart {
  padding: 0.85rem 1.4rem;
  background: #DC8C24;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.btn_cart:hover {
  background: #997654;
}

.btn_back {
  padding: 0.85rem 1.4rem;
  background: #EAE0C7;
  text-decoration: none;
  color: #674C47;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid #E5D1B7;
}

.btn_back:hover {
  background: #E5D1B7;
}

.primary_btn {
  padding: 0.85rem 1.4rem;
  background: #DC8C24;
  text-decoration: none;
  color: white;
  border-radius: 10px;
  font-weight: 600;
  border: 1px solid #E5D1B7;
}

.primary_btn:hover {
  background: #E5D1B7;
}

.status_message {
  text-align: center;
  padding: 3rem;
  color: #674C47;
}

.status_message.error {
  color: #b23b3b;
}

@media (max-width: 768px) {
  .product_detail {
    grid-template-columns: 1fr;
  }

  .product_image img {
    height: 280px;
  }

  .product_info h1 {
    font-size: 1.6rem;
  }
}
</style>