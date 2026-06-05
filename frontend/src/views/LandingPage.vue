<script>
import { RouterLink } from 'vue-router';
import api from '../services/api'

export default {
    name: 'LandingPage',
    components: {
        RouterLink
    },
    data() {
        return {
            products: []
        }
    },
    async mounted() {
        try {
            const res = await api.get('/products')
            this.products = res.data.slice(0,4)
        } catch (err) {
            console.error('Error fetching products:', err)
        }
    }
  }
</script>

<template>
    <main class="landing-page">
        <section class="hero">
            <div class="hero_container">
                <div class="hero_text">
                    <p class="hero_tag">Handcrafted with heart</p>
                    <h1>Discover Unique Handmade Treasures</h1>
                    <p class="hero_desc">Explore handmade crafts, candles, jewellery, and artwork created by talented local artisans.</p>
                  <div class="hero_actions">
                    <RouterLink to="/products" class="btn btn_primary">Shop Now</RouterLink>
                    <RouterLink to="/about" class="btn btn_secondary">Learn More</RouterLink>
                  </div>
                </div>
            </div>
        </section>

        <div class="content-wrapper">
            <section class="intro">
                <h2>Welcome to Artisan Alley!</h2>
                <p>A warm and inviting marketplace where visitors can browse handcrafted products made by local artisans, from elegant accessories to beautiful home decor.
                </p>
            </section>

            <section class="popular_products">
                <div class="section_heading">
                    <h2>Popular Products</h2>
                    <RouterLink to="/products" class="view_all">View All</RouterLink>
                </div>
                <div class="product-grid">
                    <div class="product_card" v-for="product in products" :key="product._id">
                        <img :src="`http://localhost:5000/images/${product.image}`" :alt="product.name" />
                        <h3>{{ product.name}}</h3>
                        <p class="product_category">{{ product.category }}</p>
                        <p class="product_price">RM {{ Number(product.price).toFixed(2) }}</p>
                        <RouterLink :to="`/products/${product._id}`" class="product_btn">View Product</RouterLink>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
}

.hero {
  width: 100%;
  background: #8B7355;
  border-bottom: 1px solid #E5D1B7;
  padding: 3rem 1.5rem;
  box-sizing: border-box;
}

.hero_container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
}

.hero_text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeUp 800ms ease both;
}

.hero_tag {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.35rem 0.8rem;
  background: #8B7355;
  color: #EAE0C7;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  width: fit-content;
  opacity: 0;
  animation: fadeUp 700ms ease both;
  animation-delay: 120ms;
}

.hero_text h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
  line-height: 1.2;
  color: #eae0c7;
  opacity: 0;
  animation: fadeUp 750ms ease both;
  animation-delay: 200ms;
}

.hero_desc {
  margin: 0;
  color: #EAE0C7;
  line-height: 1.7;
  max-width: 600px;
  opacity: 0;
  animation: fadeUp 750ms ease both;
  animation-delay: 320ms;
}

.hero_actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  opacity: 0;
  animation: fadeUp 750ms ease both;
  animation-delay: 420ms;
}

.btn {
  text-decoration: none;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 160ms ease, box-shadow 160ms ease;
}

.btn_primary {
  background: #DC8C24;
  color: white;
  box-shadow: 0 6px 18px rgba(220,140,36,0.18);
}

.btn_primary:hover {
  transform: translateY(-3px) scale(1.02);
}

.btn_primary:active { transform: translateY(-1px); }

.btn_secondary {
  border: 1.5px solid #997654;
  color: #674C47;
  background: transparent;
}

/* product card enter animation */
.product-grid .product_card {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeUp 600ms ease both;
}
.product-grid .product_card:nth-child(1) { animation-delay: 0.12s }
.product-grid .product_card:nth-child(2) { animation-delay: 0.22s }
.product-grid .product_card:nth-child(3) { animation-delay: 0.32s }
.product-grid .product_card:nth-child(4) { animation-delay: 0.42s }

/* small float on product image to add life */
.product_card img {
  animation: float 6s ease-in-out infinite;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0); }
}

.hero_actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  text-decoration: none;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  transition: 0.2s ease;
}

.btn_primary {
  background: #DC8C24;
  color: white;
}

.btn_primary:hover {
  background: #997654;
}

.btn_secondary {
  border: 1.5px solid #997654;
  color: #674C47;
  background: transparent;
}

.btn_secondary:hover {
  background: #E5D1B7;
}

.hero_image img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 18px;
  display: block;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  width: 100%;
  box-sizing: border-box;
}

.intro {
  text-align: center;
  margin-bottom: 2.5rem;
  padding: 0 1rem;
}

.intro h2 {
  color: #674C47;
  margin-bottom: 0.75rem;
}

.intro p {
  color: #997654;
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
}

.popular_products {
  margin-top: 1rem;
}

.section_heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section_heading h2 {
  color: #674C47;
  margin: 0;
}

.view_all {
  text-decoration: none;
  color: #DC8C24;
  font-weight: 600;
}

.view_all:hover {
  color: #997654;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.product_card {
  background: #FFFFFF;
  border: 1px solid #E5D1B7;
  border-radius: 18px;
  overflow: hidden;
  padding-bottom: 1rem;
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

.product_card h3 {
  margin: 1rem 1rem 0.4rem;
  color: #674C47;
  font-size: 1.1rem;
}

.product_category {
  margin: 0 1rem 0.4rem;
  color: #997654;
  font-size: 0.9rem;
}

.product_price {
  margin: 0 1rem 1rem;
  color: #DC8C24;
  font-weight: 700;
}

.product_btn {
  display: inline-block;
  margin: 0 1rem;
  padding: 0.65rem 1rem;
  text-decoration: none;
  background: #EAE0C7;
  color: #674C47;
  border-radius: 10px;
  font-weight: 600;
}

.product_btn:hover {
  background: #E5D1B7;
}

@media (max-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }

  .hero_text h1 {
    font-size: 1.8rem;
  }

  .hero_image img {
    height: 240px;
  }

  .section_heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>