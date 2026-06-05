<script>
import { RouterLink } from 'vue-router'
import api from '../services/api'

export default {
    name: 'RegisterPage',
    components: {
        RouterLink
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            error:'',
            success:''
        }
    },
    methods: {
        async handleRegister() {
            this.error = ''
            this.success = ''

            if(!this.name || !this.email || !this.password || !this.confirmPassword){
                this.error = "Please fill in all fields"
                return
            }

            if(this.password !== this.confirmPassword){
                this.error = "Password do not match!"
                return
            }

            try {
                await api.post('/users/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })

                this.success = "Registration successful! Redirecting to login..."

                setTimeout(() => {
                    this.$router.push('/login')
                }, 1500)
            } catch (err) {
                console.error('Register API error:', err)
                this.error = 'Registration failed. Please try again.'
            }
        }
    }
}
</script>

<template>
    <main class="register-page">
        <div class="register_card">

            <h1>Create account</h1>
            <p class="subtitle">Join Artisan Alley today</p>

            <form @submit.prevent="handleRegister">

                <div class="form_group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        v-model="name"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

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
                        placeholder="Enter password"
                        required
                        />
                </div>

                <div class="form_group">
                    <label>Confirm Password</label>
                    <input 
                        type="password"
                        v-model="confirmPassword"
                        placeholder="Confirm password"
                        required
                    />
                </div>

                <p v-if="error" class="error_msg">{{  error }}</p>
                <p v-if="success" class="success_msg">{{ success }}</p>

                <button type="submit" class="register_btn">
                    Register
                </button>
            </form>

            <p class="login_link">
                Already have an account?
                <RouterLink to="/login">Login here</RouterLink>
            </p>
        </div>
    </main>
</template>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    padding: 2rem;
}

.register_card {
    width: 100%;
    max-width: 420px;
    background: #eae0c7;
    border: 1px solid #e5d1b7;
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
}

.register_card h1 {
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
    color: 674c47;
}

.form_group input {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #e5d1b7;
    border-radius: 10px;
    outline: none;
    box-sizing: border-box;
}

.form_group input:focus {
    border-color: #997654;
}

.register_btn {
    width: 100%;
    padding: 0.8rem;
    background: #dc8c24;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 1rem;
}

.register_btn:hover {
    background: #997654;
}

.error_msg {
    color: red;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}

.success_msg {
    color: green;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}

.login_link {
    margin-top: 1.2rem;
    color:#674c47;
}

.login_link a {
    color: #dc8c24;
    text-decoration: none;
}

.login_link a:hover {
    color: #997654;
}
</style>