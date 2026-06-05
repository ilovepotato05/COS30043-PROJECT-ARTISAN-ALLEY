<script>
import { mockOrders } from '../data/accountMockData'
import api from '../services/api'

export default {
  name: 'OrderHistoryPage',
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    this.loadOrders()
  },
  methods: {
    async loadOrders() {
      const user = JSON.parse(localStorage.getItem('user'))
      const userKey = user?._id || user?.email || user?.name || ''

      if (!user) {
        this.$router.push('/login')
        return
      }

      try {
        const response = await api.get('/orders')
        const orders = response.data || []
        const scopedOrders = userKey
          ? orders.filter(order => [order.userId, order.userEmail].includes(userKey))
          : []

        this.orders = scopedOrders.length > 0 ? scopedOrders : orders
        return
      } catch (error) {
        console.error('Failed to load orders from API:', error)
      }

      const scopedOrders = userKey
        ? mockOrders.filter(order => [order.userId, order.userEmail].includes(userKey))
        : []

      this.orders = scopedOrders.length > 0 ? scopedOrders : mockOrders
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.back()
        return
      }

      this.$router.push('/')
    }
  }
}
</script>

<template>
  <main class="order-page">
    <button type="button" class="back_btn" @click="goBack">Back</button>
    <h1>Your Orders</h1>

    <div v-if="orders.length === 0" class="empty">
      <p>No orders yet.</p>
    </div>

    <div v-else>
      <div class="order_card" v-for="order in orders" :key="order._id">
        <p><strong>Date:</strong> {{ order.date }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>

        <div class="order_items">
          <div v-for="item in order.items" :key="item._id">
            <p>{{ item.name }} × {{ item.quantity }}</p>
          </div>
        </div>

        <h3>Total: RM {{ Number(order.total).toFixed(2) }}</h3>
      </div>
    </div>
  </main>
</template>

<style scoped>
.order-page {
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

h1 {
  margin-bottom: 1.5rem;
  color: #674C47;
}

.order_card {
  background: #fff;
  border: 1px solid #E5D1B7;
  border-radius: 14px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 6px 18px rgba(103, 76, 71, 0.08);
}

.order_card p {
  margin: 0.4rem 0;
  color: #674C47;
}

.order_items {
  margin: 1rem 0;
  padding: 1rem;
  background: #EAE0C7;
  border-radius: 10px;
  border: 1px solid #E5D1B7;
}

.order_items p {
  margin: 0.4rem 0;
  color: #674C47;
}

h3 {
  margin-top: 1rem;
  color: #DC8C24;
}

.empty {
  margin-top: 1rem;
  color: #997654;
}
</style>