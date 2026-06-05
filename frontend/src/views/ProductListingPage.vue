<script>
import { RouterLink } from 'vue-router'
import api from '../services/api'
import ScentRecommendationQuiz from '../components/products/ScentRecommendationQuiz.vue'

export default {
    name: 'ProductListingPage',
    components: {
    RouterLink,
    ScentRecommendationQuiz
    },
    data() {
        return {
            selectedCategory: 'all',
            searchQuery: '',
            products: []
        }
    },
    computed: {
        filteredProducts() {
            return this.products.filter((product) => {
                const matchesCategory =
                    this.selectedCategory === 'all' ||
                    product.category === this.selectedCategory
                
                const matchesSearch = (product.name || '')
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase())
                return matchesCategory && matchesSearch
            })
        }
    },

    async mounted() {
    try {
        const res = await api.get('/products')
        console.log('Products from API:', res.data)
        this.products = res.data

        // Set category from query param (if provided)
        const q = this.$route && this.$route.query && this.$route.query.category
        this.selectedCategory = this.mapQueryToCategory(q)
    } catch (err) {
        console.error('API error:', err)
    }
    },
    watch: {
        '$route.query.category'(newVal) {
            this.selectedCategory = this.mapQueryToCategory(newVal)
        }
    },
    methods:{
      mapQueryToCategory(q) {
        if (!q) return 'all'

        const map = {
          'handmade-crafts': 'Handmade Crafts',
          'candles-scents': 'Candles & Scents',
          'jewellery-accessories': 'Jewellery & Accessories',
          'artwork-prints': 'Artwork / Prints'
        }

        return map[q] || 'all'
      },

      addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || []

        const existing = cart.find(item => item._id === product._id)

        if(existing){
          existing.quantity += 1
        } else {
          cart.push({ ...product, quantity: 1})
        }

        localStorage.setItem('cart', JSON.stringify(cart))

        alert('Added to cart!')
      },

      viewProduct(product) {
        this.$router.push(`/products/${product._id}`)
    }
}
}
</script>


<template>
    <main class="product-listing-page">
        <section class="page_header">
            <h1>Shop Our Handmade Collection</h1>
            <p>Browse unique handcrafted products from local artisans.</p>
        </section>

        <section class="shop_layout">
            <aside class="filter_sidebar">
                <h2>Filters</h2>

                <div class="filter_group">
                    <h3>Category</h3>
                    <label><input type="radio" value="all" v-model="selectedCategory" /> All</label>
                    <label><input type="radio" value="Handmade Crafts" v-model="selectedCategory" /> Handmade Crafts</label>
                    <label><input type="radio" value="Candles & Scents" v-model="selectedCategory" /> Candles &amp; Scents</label>
                    <label><input type="radio" value="Jewellery & Accessories" v-model="selectedCategory" /> Jewellery &amp; Accessories</label>
                    <label><input type="radio" value="Artwork / Prints" v-model="selectedCategory" /> Artwork / Prints</label>
                </div>

                <div class="filter_group">
                    <h3>Search</h3>
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Search product..."
                        class="search_input"
                    />
                </div>
            </aside>

            <section class="product_section">
              <div v-if="selectedCategory === 'Candles & Scents'" class="quiz_section">
                <ScentRecommendationQuiz
                  :products="products"
                  @add-to-cart="addToCart"
                  @view-product="viewProduct"
                />
              </div>

                <div class="section_top">
                    <p>{{ filteredProducts.length }} products found</p>
                </div>

                <div class="product_grid">
                    <div
                        class="product_card"
                        v-for="product in filteredProducts"
                        :key="product._id">

                        <img :src="`http://localhost:5000/images/${product.image}`" :alt="product.name" />
                        <div class="product_info">
                            <p class="product_category">{{  product.category }}</p>
                            <h3>{{  product.name }}</h3>
                            <p class="product_price">RM {{  product.price.toFixed(2) }}</p>

                            <div class="product_actions">
                                <RouterLink :to="`/products/${product._id}`" class="btn_view">View</RouterLink>
                                <button class="btn_cart" @click="addToCart(product)">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>

<style scoped>
.product-listing-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

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

.shop_layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 2rem;
}

.filter_sidebar {
  background: #674c47;
  border: 1px solid #E5D1B7;
  border-radius: 18px;
  padding: 1.5rem;
  height: fit-content;
}

.filter_sidebar h2 {
  margin-top: 0;
  margin-bottom: 1.2rem;
  color: #e5d1b7;
}

.filter_group {
  margin-bottom: 1.5rem;
}

.filter_group h3 {
  margin-bottom: 0.8rem;
  color: #e5d1b7;
  font-size: 1rem;
}

.filter_group label {
  display: block;
  margin-bottom: 0.6rem;
  color: white;
  font-size: 0.95rem;
}

.search_input {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid #E5D1B7;
  border-radius: 10px;
  outline: none;
  box-sizing: border-box;
  color: #674C47;
  background: #fff;
}

.search_input:focus {
  border-color: #997654;
}

.section_top {
  margin-bottom: 1rem;
}

.quiz_section {
  margin-bottom: 1.75rem;
}

.section_top p {
  margin: 0;
  color: #997654;
  font-weight: 500;
}

.product_grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.product_card {
  background: #fff;
  border: 1px solid #E5D1B7;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(103, 76, 71, 0.08);
  transition: transform 0.2s ease;
}

.product_card:hover {
  transform: translateY(-4px);
}

.product_card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

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
}

.product_actions {
  display: flex;
  gap: 0.75rem;
}

.btn_view,
.btn_cart {
  padding: 0.65rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn_view {
  text-decoration: none;
  background: #EAE0C7;
  color: #674C47;
  border: none;
}

.btn_view:hover {
  background: #E5D1B7;
}

.btn_cart {
  background: #DC8C24;
  color: #fff;
  border: none;
}

.btn_cart:hover {
  background: #997654;
}

@media (max-width: 950px) {
  .shop_layout {
    grid-template-columns: 1fr;
  }

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