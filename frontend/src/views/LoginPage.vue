<script>
import { RouterLink } from 'vue-router'
import api from '../services/api'

export default {
    name: 'LoginPage',
    components: {
        RouterLink
    },
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async handleLogin() {
            this.error = ''

            if(!this.email || !this.password){
                this.error = "Please fill in all fields"
                return
            }

            try {
                const res = await api.post('/users/login', {
                    email: this.email,
                    password: this.password
                })

                if(res.data.success){
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    this.$router.push('/')
                } else {
                    this.error = res.data.message || 'Invalid email or password'
                }
            } catch(err) {
                console.error('Login API error:', err)
                this.error = 'Login failed. Please try again.'
            }
        }
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <main class="login-page">
        <div class="login_card">

            <h1>Welcome Back to Artisan Alley</h1>
            <p class="subtitle">Login to your account</p>

            <form @submit.prevent="handleLogin">
                <div class="form_group">
                    <label>Email</label>
                    <input
                        type="email"
                        v-model="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div class="form_group">
                    <label>Password</label>
                    <input
                        type="password"
                        v-model="password"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <p v-if="error" class="error_msg">{{  error }}</p>

                <button type="submit" class="login_btn">
                    Login
                </button>
            </form>

            <p class="register_link">
                Don't have an account?
                <RouterLink to="/register">Register here</RouterLink>
            </p>
        </div>
    </main>
</template>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    padding: 2rem;
}

.login_card {
    width: 100%;
    max-width: 400px;
    background: #eae0c7;
    border: 1px solid #e5d1b7;
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
}

.login_card h1 {
    margin-bottom: 0.5rem;
    color: #674c47;
}

.subtitle {
    margin-bottom: 1.5rem;
    color: #997654;
}

.form_group {
    text-align: left;
    margin-bottom: 1rem;
}

.form_group label {
    display: block;
    margin-bottom: 0.3rem;
    color: #674c47;
}

.form_group input {
    width: 100%;
    padding:0.7rem;
    border: 1px solid #e5d1b7;
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
}

.form_group input:focus {
    border-color: #997654;
}

.login_btn {
    width: 100%;
    padding: 0.8rem;
    background: #dc8c24;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 1rem;
}

.login_btn:hover {
    background: #997654;
}

.error_msg {
    color: red;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}

.register_link {
    margin-top: 1.2rem;
    color: #674c47;
}

.register_link a{
    color: #dc8c24;
    text-decoration: none;
}

.register_link a:hover {
    color: #997654;
}
</style>