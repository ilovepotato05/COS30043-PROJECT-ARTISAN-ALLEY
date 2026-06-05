<script>
import { computed } from 'vue'

export default {
    name: 'DashboardSidebar',
    props: {
        open: {
            type: Boolean,
            default: false
        },
        user: {
            type: Object,
            default: null
        }
    },
    emits: ['close'],
    setup(props) {
        const displayName = computed(() => props.user?.name || props.user?.email || 'Guest')
        const isAuthenticated = computed(() => Boolean(props.user?.email || props.user?._id || props.user?.name))

        return {
            displayName,
            isAuthenticated
        }
    }
}
</script>

<template>
    <teleport to="body">
        <transition name="drawer-fade">
            <div v-if="open" class="drawer_overlay" @click="$emit('close')"></div>
        </transition>

        <transition name="drawer-slide">
            <aside v-if="open" class="dashboard_drawer" aria-label="User dashboard menu" @click.stop>
                <div class="drawer_header">
                    <div>
                        <p class="drawer_label">Account</p>
                        <h3>{{ displayName }}</h3>
                    </div>
                    <button type="button" class="close_btn" @click="$emit('close')">×</button>
                </div>

                <nav class="drawer_nav">
                    <RouterLink to="/" @click="$emit('close')">Home</RouterLink>
                    <RouterLink to="/orders" @click="$emit('close')">Orders</RouterLink>
                    <RouterLink to="/wishlist" @click="$emit('close')">Wishlist</RouterLink>
                    <RouterLink to="/profile" @click="$emit('close')">Profile</RouterLink>
                </nav>

                <div class="drawer_actions">
                    <template v-if="isAuthenticated">
                        <button type="button" class="drawer_btn primary" @click="$emit('logout')">Log out</button>
                    </template>
                    <template v-else>
                        <RouterLink to="/login" class="drawer_btn secondary" @click="$emit('close')">Log in</RouterLink>
                        <RouterLink to="/register" class="drawer_btn primary" @click="$emit('close')">Create account</RouterLink>
                    </template>
                </div>
            </aside>
        </transition>
    </teleport>
</template>

<style scoped>
.drawer_overlay {
    position: fixed;
    inset: 0;
    background: rgba(40, 28, 24, 0.38);
    z-index: 90;
}

.dashboard_drawer {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: min(360px, 92vw);
    background: #fffaf3;
    border-left: 1px solid #E5D1B7;
    box-shadow: -18px 0 40px rgba(103, 76, 71, 0.18);
    z-index: 100;
    padding: 1.25rem;
    padding-bottom: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    max-width: 100vw;
}

.drawer_header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
}

.drawer_label {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #997654;
    margin-bottom: 0.25rem;
}

.drawer_header h3 {
    margin: 0;
    color: #674C47;
}

.close_btn {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    border: 1px solid #E5D1B7;
    background: #fff;
    color: #674C47;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
}

.drawer_nav {
    display: grid;
    gap: 0.5rem;
}

.drawer_nav a,
.drawer_btn {
    text-decoration: none;
    border-radius: 12px;
    padding: 0.85rem 1rem;
    border: 1px solid transparent;
    font-weight: 700;
}

.drawer_nav a {
    background: #EAE0C7;
    color: #674C47;
}

.drawer_nav a.router-link-active {
    background: #DC8C24;
    color: #fff;
}

.drawer_actions {
    margin-top: auto;
    display: grid;
    gap: 0.75rem;
}

.drawer_btn {
    text-align: center;
    width: 100%;
}

.drawer_btn.primary {
    background: #DC8C24;
    color: #fff;
}

.drawer_btn.secondary {
    background: #fff;
    color: #674C47;
    border-color: #E5D1B7;
}

.drawer-fade-enter-active,
.drawer-fade-leave-active,
.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: all 180ms ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
    opacity: 0;
}

.drawer-slide-enter-from,
.drawer-slide-leave-to {
    transform: translateX(100%);
    opacity: 0.85;
}

@media (max-width: 768px) {
    .dashboard_drawer {
        width: min(320px, 92vw);
    }
}
</style>