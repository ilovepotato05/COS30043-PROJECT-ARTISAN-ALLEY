<script>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DashboardSidebar from '../dashboard/DashboardSidebar.vue'
export default {
    name: 'AppNavbar',
    components: {
        DashboardSidebar
    },
    setup() {
        const isOpen = ref(false)
        const isProfileOpen = ref(false)
        const dropdownRef = ref(null)
        const user = ref(null)
        const cartCount = ref(0)
        const route = useRoute()
        const router = useRouter()

        const displayName = computed(() => user.value?.name || 'Guest')
        const accountStatus = computed(() => user.value ? 'Signed in' : 'Guest mode')

        function loadCartCount() {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            cartCount.value = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0)
        }

        function toggleDropdown() {
            isOpen.value = !isOpen.value
            isProfileOpen.value = false
        }

        function toggleProfileMenu() {
            user.value = JSON.parse(localStorage.getItem('user'))
            isProfileOpen.value = !isProfileOpen.value
            isOpen.value = false
        }

        function closeProfileMenu() {
            isProfileOpen.value = false
        }

        function handleLogout() {
            localStorage.removeItem('user')
            user.value = null
            isProfileOpen.value = false
            router.push('/')
        }

        function handleClickOutside(e) {
            if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
                isOpen.value = false
            }
        }

        onMounted(() => {
            user.value = JSON.parse(localStorage.getItem('user'))
            loadCartCount()
            document.addEventListener('click', handleClickOutside)
            window.addEventListener('storage', loadCartCount)
        })
        onBeforeUnmount(() => {
            document.removeEventListener('click', handleClickOutside)
            window.removeEventListener('storage', loadCartCount)
        })

        // Close dropdown when route changes
        watch(() => route.fullPath, () => {
            isOpen.value = false
            isProfileOpen.value = false
            loadCartCount()
        })

        return {
            isOpen,
            isProfileOpen,
            dropdownRef,
            user,
            cartCount,
            displayName,
            accountStatus,
            toggleDropdown,
            toggleProfileMenu,
            closeProfileMenu,
            handleLogout,
            // logoImage
        }
    }
}
</script>

<template>
    <header class="navbar">
        <div class="navbar_utility">
            <span>Handmade marketplace</span>
            <span>Free delivery over RM150</span>
            <span>Secure checkout</span>
        </div>

        <div class="navbar_logo">
            <img src="/logo.png" alt="Artisan Alley Logo" class="logo_img" />
            <div class="brand_copy">
                <RouterLink to="/" class="nav-link">Artisan Alley</RouterLink>
                <p>{{ accountStatus }} · {{ displayName }}</p>
            </div>
        </div>

            <nav class="navbar_center">
                <RouterLink to="/" class="nav-link">Home</RouterLink>

                <div class="dropdown" ref="dropdownRef">
                    <button class="dropdown-btn" type="button" @click="toggleDropdown" :aria-expanded="isOpen">Shop</button>

                    <div v-if="isOpen" class="dropdown-menu">
                        <RouterLink to="/products?category=handmade-crafts" class="dropdown-item" @click="isOpen = false">Handmade Crafts</RouterLink>
                        <RouterLink to="/products?category=candles-scents" class="dropdown-item" @click="isOpen = false">Candles &amp; Scents</RouterLink>
                        <RouterLink to="/products?category=jewellery-accessories" class="dropdown-item" @click="isOpen = false">Jewellery &amp; Accessories</RouterLink>
                        <RouterLink to="/products?category=artwork-prints" class="dropdown-item" @click="isOpen = false">Artwork / Prints</RouterLink>
                    </div>
                </div>

                <RouterLink to="/about" class="nav-link">About us</RouterLink>
            </nav>

            <div class="navbar_icons">
                <RouterLink to="/cart" class="icon-btn cart_btn" aria-label="Cart">
                    🛍️
                    <span v-if="cartCount > 0" class="cart_badge">{{ cartCount }}</span>
                </RouterLink>
                <button type="button" class="icon-btn profile_btn" aria-label="Profile" @click="toggleProfileMenu">👤</button>
            </div>
            <DashboardSidebar
                :open="isProfileOpen"
                :user="user"
                @close="closeProfileMenu"
                @logout="handleLogout"
            />
        </header>
    </template>
    

<style scoped>
.navbar {
    width: 100%;
    margin: 0;
    padding: 0.35rem 1rem 0.45rem;
    background: #8B7355;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom: 1px solid #7A6349;
}

.navbar_utility {
    display: none; /* hide promo strip on desktop to keep header compact */
}

.navbar_logo a {
    text-decoration: none;
    font-weight: 700;
    font-size: 2rem;
    color: #FFFFFF;
}

.navbar_logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: auto;
    justify-content: flex-start;
}

.logo_img {
    width: 56px;
    height: 56px;
    object-fit: contain;
    display: block;
}

.brand_copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.1rem;
}

.brand_copy p {
    color: #F4ECDD;
    font-size: 0.78rem;
    opacity: 0.92;
    margin: 0;
    line-height: 1;
}

.navbar_center {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
}

.nav-link {
    text-decoration: none;
    color: #FFFFFF;
    font-size: 1.25rem;
    font-weight: 900;
    transition: 0.2s;
}

.nav-link:hover {
    color: #EAE0C7;
}

.dropdown {
    position: relative;
}

.dropdown-btn {
    background: transparent;
    border: 1.5px solid #FFFFFF;
    border-radius: 999px;
    padding: 0.45rem 1rem;
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 900;
    cursor: pointer;
    color: #FFFFFF;
    transition: 0.2s;
}

.dropdown-btn:hover {
    background: #7A6349;
    color: #EAE0C7;
    border-color: #EAE0C7;
}

.dropdown-menu {
    position: absolute;
    top: 115%;
    left: 50%;
    transform: translateX(-50%);
    width: 190px;
    background: #8B7355;
    border: 1.5px solid #EAE0C7;
    border-radius: 12px;
    overflow: hidden;
    z-index: 10;
    box-shadow: 0 8px 20px rgba(103, 76, 71, 0.12);
}

.dropdown-item {
    display: block;
    padding: 0.85rem 1rem;
    text-decoration: none;
    color: #FFFFFF;
    border-bottom: 1px solid #7A6349;
    font-size: 0.9rem;
    background: #8B7355;
    transition: 0.2s;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover {
    background: #7A6349;
    color: #EAE0C7;
}

.navbar_icons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: auto;
    justify-content: flex-end;
}

.icon-btn {
    background: transparent;
    border: none;
    text-decoration: none;
    font-size: 1.1rem;
    color: #FFFFFF;
    transition: 0.2s;
    cursor: pointer;
}

.cart_btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
}

.cart_badge {
    min-width: 1.2rem;
    height: 1.2rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    background: #DC8C24;
    color: #fff;
    font-size: 0.72rem;
    line-height: 1.2rem;
    text-align: center;
    font-weight: 700;
}

.icon-btn:hover {
    transform: scale(1.08);
    color: #DC8C24;
}

@media (max-width: 768px) {
    .navbar {
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
    }
    .navbar_utility {
        display: flex;
        justify-content: center;
        gap: 0.5rem 0.6rem;
        font-size: 0.74rem;
        color: #F4ECDD;
    }

    .navbar_logo {
        flex-direction: column;
        text-align: center;
    }

    .brand_copy {
        align-items: center;
    }

    .navbar_center {
        justify-content: center;
    }

    .navbar_icons {
        justify-content: center;
    }
}
</style>