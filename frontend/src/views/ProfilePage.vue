<script>
import api from '../services/api'

export default {
    name: 'ProfilePage',
    data() {
        return {
            user: {
                _id: '',
                name: '',
                email: ''
            },
            isEditing: false,
            editForm: {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: '',
            success: '',
            loading: true
        }
    },
    mounted() {
        this.loadUserProfile()
    },
    methods: {
        goBack() {
            if (window.history.length > 1) {
                this.$router.back()
                return
            }

            this.$router.push('/')
        },
        loadUserProfile() {
            try {
                const userData = localStorage.getItem('user')
                if (userData) {
                    this.user = JSON.parse(userData)
                    this.editForm.name = this.user.name
                    this.editForm.email = this.user.email
                } else {
                    this.error = 'User data not found. Please login again.'
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 2000)
                }
            } catch (err) {
                console.error('Error loading user profile:', err)
                this.error = 'Failed to load profile'
            } finally {
                this.loading = false
            }
        },
        toggleEditMode() {
            if (this.isEditing) {
                // Cancel edit mode
                this.editForm.name = this.user.name
                this.editForm.email = this.user.email
                this.editForm.password = ''
                this.editForm.confirmPassword = ''
                this.error = ''
                this.success = ''
            }
            this.isEditing = !this.isEditing
        },
        async handleUpdateProfile() {
            this.error = ''
            this.success = ''

            // Validation
            if (!this.editForm.name || !this.editForm.email) {
                this.error = 'Name and email are required'
                return
            }

            // If password is provided, validate it
            if (this.editForm.password) {
                if (this.editForm.password !== this.editForm.confirmPassword) {
                    this.error = 'Passwords do not match!'
                    return
                }
                if (this.editForm.password.length < 6) {
                    this.error = 'Password must be at least 6 characters'
                    return
                }
            }

            try {
                const updateData = {
                    name: this.editForm.name,
                    email: this.editForm.email
                }

                // Only include password if it's provided
                if (this.editForm.password) {
                    updateData.password = this.editForm.password
                }

                const res = await api.put(`/users/${this.user._id}`, updateData)

                // Update local storage
                this.user = res.data
                localStorage.setItem('user', JSON.stringify(res.data))

                this.success = 'Profile updated successfully!'
                this.editForm.password = ''
                this.editForm.confirmPassword = ''

                setTimeout(() => {
                    this.isEditing = false
                    this.success = ''
                }, 1500)
            } catch (err) {
                console.error('Update API error:', err)
                this.error = err.response?.data?.message || 'Failed to update profile. Please try again.'
            }
        }
    }
}
</script>

<template>
    <main class="profile-page">
        <button type="button" class="back_btn" @click="goBack">Back</button>

        <div v-if="loading" class="loading">Loading profile...</div>

        <div v-else class="profile_container">
            <div class="profile_card">
                <div class="profile_header">
                    <h1>My Profile</h1>
                    <button
                        v-if="!isEditing"
                        @click="toggleEditMode"
                        class="edit_btn"
                    >
                        Edit Profile
                    </button>
                    <div v-else class="action_buttons">
                        <button
                            @click="handleUpdateProfile"
                            class="save_btn"
                        >
                            Save Changes
                        </button>
                        <button
                            @click="toggleEditMode"
                            class="cancel_btn"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                <form v-if="isEditing" @submit.prevent="handleUpdateProfile" class="profile_form">
                    <div class="form_group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            v-model="editForm.name"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div class="form_group">
                        <label>Email</label>
                        <input
                            type="email"
                            v-model="editForm.email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div class="form_divider">
                        <p>Optional: Leave password fields empty to keep current password</p>
                    </div>

                    <div class="form_group">
                        <label>New Password (Optional)</label>
                        <input
                            type="password"
                            v-model="editForm.password"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div class="form_group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            v-model="editForm.confirmPassword"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <p v-if="error" class="error_msg">{{ error }}</p>
                    <p v-if="success" class="success_msg">{{ success }}</p>
                </form>

                <div v-else class="profile_info">
                    <div class="info_group">
                        <label>Full Name</label>
                        <p>{{ user.name }}</p>
                    </div>

                    <div class="info_group">
                        <label>Email</label>
                        <p>{{ user.email }}</p>
                    </div>

                    <div class="info_group">
                        <label>Account ID</label>
                        <p class="account_id">{{ user._id }}</p>
                    </div>

                    <p v-if="error" class="error_msg">{{ error }}</p>
                    <p v-if="success" class="success_msg">{{ success }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.profile-page {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    padding: 2rem;
}

.back_btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    border: 1px solid #e5d1b7;
    border-radius: 999px;
    padding: 0.65rem 1rem;
    background: #fff;
    color: #674c47;
    cursor: pointer;
}

.back_btn:hover {
    color: #dc8c24;
}

.loading {
    text-align: center;
    font-size: 1.1rem;
    color: #997654;
}

.profile_container {
    width: 100%;
    max-width: 600px;
}

.profile_card {
    background: #eae0c7;
    border: 1px solid #e5d1b7;
    border-radius: 20px;
    padding: 2rem;
}

.profile_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px solid #e5d1b7;
}

.profile_header h1 {
    color: #674c47;
    margin: 0;
}

.edit_btn,
.save_btn,
.cancel_btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background 0.3s ease;
}

.edit_btn {
    background: #dc8c24;
    color: white;
}

.edit_btn:hover {
    background: #c4915f;
}

.action_buttons {
    display: flex;
    gap: 0.8rem;
}

.save_btn {
    background: #7cb342;
    color: white;
}

.save_btn:hover {
    background: #689f38;
}

.cancel_btn {
    background: #d4a5a5;
    color: white;
}

.cancel_btn:hover {
    background: #c89999;
}

.profile_form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.profile_info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form_group {
    display: flex;
    flex-direction: column;
}

.form_group label {
    margin-bottom: 0.5rem;
    color: #674c47;
    font-weight: 600;
}

.form_group input {
    padding: 0.8rem;
    border: 1px solid #e5d1b7;
    border-radius: 10px;
    outline: none;
    font-size: 0.95rem;
    transition: border-color 0.3s ease;
}

.form_group input:focus {
    border-color: #997654;
}

.form_divider {
    padding: 1rem;
    background: #f5f0e8;
    border-radius: 10px;
    text-align: center;
    color: #997654;
    font-size: 0.9rem;
    margin: 0.5rem 0;
}

.info_group {
    padding: 1rem;
    background: #f5f0e8;
    border-radius: 10px;
}

.info_group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #674c47;
    font-weight: 600;
    font-size: 0.9rem;
}

.info_group p {
    color: #5a4a45;
    font-size: 1rem;
    margin: 0;
}

.account_id {
    font-family: 'Courier New', monospace;
    font-size: 0.85rem;
    word-break: break-all;
}

.error_msg {
    color: #d32f2f;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    padding: 0.8rem;
    background: #ffebee;
    border-radius: 8px;
    border-left: 3px solid #d32f2f;
}

.success_msg {
    color: #388e3c;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    padding: 0.8rem;
    background: #e8f5e9;
    border-radius: 8px;
    border-left: 3px solid #388e3c;
}

@media (max-width: 600px) {
    .profile-page {
        padding: 1rem;
    }

    .profile_card {
        padding: 1.5rem;
    }

    .profile_header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .action_buttons {
        width: 100%;
    }

    .action_buttons button {
        flex: 1;
    }
}
</style>
