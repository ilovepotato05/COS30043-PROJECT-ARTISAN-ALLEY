<script>
export default {
    name: 'AppFooter',
    data() {
        return {
            email: '',
            subscribed: false,
            message: ''
        }
    },
    mounted() {
        // quick check if user already subscribed
        const saved = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]')
        this.subscribed = saved.length > 0
    },
    methods: {
        subscribe() {
            if (!this.email || !this.email.includes('@')) {
                this.message = 'Please enter a valid email.'
                return
            }

            const key = 'newsletterSubscribers'
            const subscribers = JSON.parse(localStorage.getItem(key) || '[]')
            if (!subscribers.includes(this.email)) subscribers.push(this.email)
            localStorage.setItem(key, JSON.stringify(subscribers))
            this.email = ''
            this.subscribed = true
            this.message = 'Thanks — you are subscribed!'

            setTimeout(() => (this.message = ''), 2000)
        }
    }
}
</script>

<template>
    <footer class="footer">
        <div class="footer_inner">
            <div class="brand_col">
                <img src="/logo.png" alt="Artisan Alley" class="logo_img" />
                <h3>Artisan Alley</h3>
                <p class="muted">Support local artisans & handcrafted goods</p>
                <div class="social_row" aria-label="social links">
                    <a href="#" title="Instagram" class="social_link">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.1a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zM18.4 6.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"/></svg>
                        <span>Instagram</span>
                    </a>

                    <a href="#" title="Facebook" class="social_link">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8.5v-3h2V9.2c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3h-1.85v7A10 10 0 0022 12z"/></svg>
                        <span>Facebook</span>
                    </a>

                    <a href="#" title="Twitter" class="social_link">
                        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 5.9c-.6.3-1.2.6-1.9.7.7-.5 1.2-1.2 1.5-2-.7.4-1.4.6-2.2.8-.6-.7-1.6-1.2-2.6-1.2-2 0-3.6 1.6-3.6 3.6 0 .3 0 .6.1.9C8 9.1 5.3 7.7 3.4 5.6c-.3.5-.5 1-.5 1.6 0 1.3.7 2.4 1.8 3-.6 0-1.2-.2-1.7-.5v.1c0 1.8 1.3 3.2 3 3.5-.3.1-.7.1-1 .1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3 2.3-1.1.9-2.5 1.5-4 1.5H6c1.4.9 3.1 1.4 4.8 1.4 5.7 0 8.9-4.7 8.9-8.8v-.4c.6-.4 1.1-1 1.5-1.6-.6.3-1.3.6-2 .7z"/></svg>
                        <span>Twitter</span>
                    </a>
                </div>
            </div>

            <div class="link_cols">
                <div>
                    <h4>Shop</h4>
                    <a href="#/products">All Products</a>
                    <a href="#/products?cat=art">Artwork</a>
                    <a href="#/products?cat=candles">Candles</a>
                    <a href="#/products?cat=jewellery">Jewellery</a>
                </div>

                <div>
                    <h4>Customer</h4>
                    <a href="#/about">About Us</a>
                    <a href="#/contact">Contact</a>
                    <a href="#/faq">FAQ</a>
                    <a href="#/orders">Track Order</a>
                </div>

                <div>
                    <h4>Legal</h4>
                    <a href="#/terms">Terms</a>
                    <a href="#/privacy">Privacy</a>
                </div>
            </div>

            <div class="newsletter_col">
                <h4>Join our newsletter</h4>
                <p class="muted">Get exclusive offers and early access to new collections.</p>
                <div class="newsletter_form">
                    <input type="email" v-model="email" placeholder="Enter your email" />
                    <button @click.prevent="subscribe" class="subscribe_btn">Subscribe</button>
                </div>
                <p class="subscribe_msg">{{ message }}</p>
                <div class="payments">
                    <span>Accepted:</span>
                    <div class="payment_icons">
                        <span class="chip">Visa</span>
                        <span class="chip">Mastercard</span>
                        <span class="chip">PayPal</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer_bottom">
            <div class="bottom_inner">
                <p>© 2026 Artisan Alley. All rights reserved.</p>
                <p class="muted">Made with ❤️ for local creators</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background: linear-gradient(180deg, #7f624f, #8b7355);
    color: white;
    padding: 3rem 1.5rem 1.5rem;
    margin-top: 3rem;
    box-shadow: 0 -6px 24px rgba(0,0,0,0.06);
    width: 100%;
    margin-left: 0;
    align-self: stretch;
}

.footer_inner {
    width: 100%;
    display: grid;
    grid-template-columns: 1.3fr 1fr 1fr 1fr;
    gap: 2rem;
    align-items: start;
}

.brand_col h3 { margin: 0.25rem 0; }
.logo_img { width: 64px; height: 64px; object-fit: contain }
.muted { color: #f0e9df; opacity: 0.9 }

.social_row { display:flex; gap:0.6rem; margin-top:0.6rem }
.social_link { display:inline-flex; align-items:center; gap:0.5rem; color:#fff; text-decoration:none; padding:0.35rem 0.6rem; border-radius:8px; background: rgba(255,255,255,0.03); transition: all 160ms ease }
.social_link svg { width:18px; height:18px; fill: currentColor; opacity:0.95 }
.social_link span { font-size:0.95rem }
.social_link:hover { background: rgba(255,255,255,0.12); color:#ffdca8; transform: translateY(-2px) }

.link_cols h4, .newsletter_col h4 { margin-bottom: 0.6rem; color: #fff }
.link_cols { display:flex; gap:1.25rem; align-items:flex-start }
.link_cols > div { min-width: 140px; padding: 0 0.85rem }

/* decorative dividers between link columns on larger viewports */
@media (min-width: 901px) {
    .link_cols > div:not(:first-child) {
        border-left: 1px solid #E5D1B7; /* beige divider */
        padding-left: 1.1rem;
        margin-left: 0.6rem;
    }
}
.link_cols a { display:block; color: #fff; text-decoration:none; margin-bottom:0.45rem; opacity:0.95 }
.link_cols a:hover { color: #ffdca8 }

.newsletter_form { display:flex; gap:0.5rem; margin-top:0.6rem }
.newsletter_form input { flex:1; padding:0.6rem 0.8rem; border-radius:8px; border: none; }
.subscribe_btn { background:#DC8C24; color:#fff; border:none; padding:0.6rem 0.9rem; border-radius:8px; cursor:pointer }
.subscribe_btn:hover { transform: translateY(-2px) }
.subscribe_msg { margin-top:0.6rem; color:#fff; opacity:0.95 }

.payments { margin-top:1rem; color:#f0e9df }
.payment_icons { display:flex; gap:0.5rem; margin-top:0.5rem; align-items:center }
.chip { background: rgba(255,255,255,0.12); padding:0.35rem 0.6rem; border-radius:8px; font-size:0.85rem }

/* subtle card like backdrop for link columns on wide screens */
@media (min-width: 1100px) {
    .link_cols > div, .newsletter_col, .brand_col { background: rgba(255,255,255,0.02); border-radius: 8px; padding: 0.8rem }
}

.footer_bottom { margin-top:1.5rem; border-top: 1px solid rgba(255,255,255,0.06); padding-top:1rem }
.bottom_inner { width:100%; display:flex; justify-content:space-between; gap:1rem; align-items:center }
.footer_bottom p { margin:0; color:#f7efe2 }

@media (max-width: 900px) {
    .footer_inner { grid-template-columns: 1fr; }
    .bottom_inner { flex-direction:column; gap:0.6rem }
}

@media (min-width: 901px) {
    /* ensure link columns are horizontal on wider viewports */
    .link_cols { flex-direction: row }
}

</style>