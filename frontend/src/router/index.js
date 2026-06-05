import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ProductListingPage from '../views/ProductListingPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import CartPage from '../views/CartPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import LoginPage from '../views/LoginPage.vue'
import OrderHistoryPage from '../views/OrderHistoryPage.vue'
import WishlistPage from '../views/WishlistPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ProfilePage from '../views/ProfilePage.vue'

const routes = [
  { path: '/', name: 'landing', component: LandingPage },
  { path: '/products', name: 'products', component: ProductListingPage },
  { path: '/products/:id', name: 'product-detail', component: ProductDetailPage },
  { path: '/cart', name: 'cart', component: CartPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/orders', name: 'orders', component: OrderHistoryPage },
  { path: '/wishlist', name: 'wishlist', component: WishlistPage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/profile', name: 'profile', component: ProfilePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router