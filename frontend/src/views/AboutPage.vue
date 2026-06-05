<script>
export default {
    name: 'AboutPage'
}
</script>

<template>
        <main class="about-page">
                <section class="about-hero reveal">
                        <p class="eyebrow">🏡About Artisan Alley</p>
                        <h1>Handmade pieces with character</h1>
                        <p class="hero-copy">Artisan Alley is inspired by the charm of a lively maker street, where every stall reveals something unique, thoughtful, and full of craft.</p>
                        <p class="hero-copy">We connect local artisans with people who value authenticity, creativity, and the personal touch that only handcrafted goods can bring.</p>
                </section>

                <section class="about-grid">
                        <article class="about-card reveal delay-1">
                                <h2>✨What We Offer</h2>
                                <ul class="offer-list">
                                        <li>
                                                <strong>Jewellery & Accessories</strong>
                                                <span>Elegant, handcrafted pieces that celebrate individuality.</span>
                                        </li>
                                        <li>
                                                <strong>Handmade Crafts</strong>
                                                <span>Thoughtfully designed items that bring warmth and personality to everyday life.</span>
                                        </li>
                                        <li>
                                                <strong>Artwork & Prints</strong>
                                                <span>Creative expressions from local artists, perfect for adding character to your space.</span>
                                        </li>
                                        <li>
                                                <strong>Candles & Scents</strong>
                                                <span>Handcrafted candles and scents to create a warm, inviting atmosphere.</span>
                                        </li>
                                </ul>
                        </article>

                        <article class="about-card reveal delay-2">
                                <h2>🎗️Our Vision</h2>
                                <ul class="vision-list">
                                        <li>Support small-scale creators by giving them a digital stage.</li>
                                        <li>Offer customers a curated shopping experience that feels personal and inspiring.</li>
                                        <li>Promote sustainability and mindful consumption through handmade, locally produced goods.</li>
                                </ul>
                        </article>

                        <article class="about-card about-card--wide reveal delay-3">
                                <h2>✌️Why Choose Us</h2>
                                <p>Shopping at Artisan Alley means discovering products with soul. Each item carries the dedication of its maker, turning everyday purchases into meaningful connections.</p>
                                <p>Whether you're searching for a gift, a statement piece, or something to brighten your home, you'll find treasures that reflect artistry and care.</p>
                        </article>
                </section>
    </main>
</template>

<style scoped>
.about-page {
    position: relative;
    overflow: hidden;
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 1.5rem 4rem;
}

.about-page::before,
.about-page::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    filter: blur(10px);
    opacity: 0.5;
    pointer-events: none;
    animation: floatGlow 14s ease-in-out infinite;
}

.about-page::before {
    top: 1rem;
    right: -3rem;
    width: 10rem;
    height: 10rem;
    background: radial-gradient(circle, rgba(212, 163, 115, 0.28), rgba(212, 163, 115, 0));
}

.about-page::after {
    bottom: 4rem;
    left: -2rem;
    width: 12rem;
    height: 12rem;
    background: radial-gradient(circle, rgba(204, 213, 174, 0.35), rgba(204, 213, 174, 0));
    animation-delay: -4s;
}

.about-hero {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin-bottom: 1.75rem;
    padding: 2rem 2rem 2.25rem;
    border: 1px solid var(--border-light);
    border-radius: 28px;
    background: linear-gradient(135deg, rgba(254, 250, 224, 0.96), rgba(250, 237, 205, 0.9));
    box-shadow: 0 18px 40px var(--shadow-color);
}

.eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.9rem;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.65);
    color: var(--text-medium);
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
}

.about-hero h1,
.about-card h2 {
    color: var(--text-dark);
}

.about-hero h1 {
    margin: 0 0 1rem;
    font-size: clamp(2.2rem, 4vw, 3.8rem);
    line-height: 1.05;
}

.hero-copy {
    margin: 0 0 0.9rem;
    max-width: 80ch;
    color: var(--text-medium);
    line-height: 1.8;
}

.about-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 1.25rem;
}

.about-card {
    position: relative;
    z-index: 1;
    grid-column: span 6;
    padding: 1.6rem 1.5rem;
    border: 1px solid var(--border-light);
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 12px 26px rgba(90, 74, 69, 0.08);
    transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.about-card:hover {
    transform: translateY(-6px);
    border-color: rgba(212, 163, 115, 0.55);
    box-shadow: 0 18px 32px rgba(90, 74, 69, 0.12);
}

.about-card--wide {
    grid-column: span 12;
}

.about-card h2 {
    margin: 0 0 1rem;
    font-size: 1.4rem;
}

.offer-list,
.vision-list {
    list-style: none;
    display: grid;
    gap: 1rem;
}

.offer-list li {
    display: grid;
    gap: 0.35rem;
    padding-left: 0.95rem;
    border-left: 3px solid rgba(212, 163, 115, 0.6);
}

.offer-list strong,
.vision-list li {
    color: var(--text-dark);
}

.offer-list span {
    color: var(--text-medium);
    line-height: 1.65;
}

.vision-list li {
    position: relative;
    padding-left: 1rem;
    line-height: 1.7;
}

.vision-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: var(--light-bronze);
}

.about-card--wide p {
    max-width: 70ch;
    color: var(--text-medium);
    line-height: 1.85;
}

.about-card--wide p + p {
    margin-top: 0.85rem;
}

.reveal {
    opacity: 0;
    transform: translateY(18px);
    animation: fadeUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.delay-1 {
    animation-delay: 0.25s;
}

.delay-2 {
    animation-delay: 0.45s;
}

.delay-3 {
    animation-delay: 0.65s;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(18px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes floatGlow {
    0%,
    100% {
        transform: translateY(0) scale(1);
    }
    50% {
        transform: translateY(-10px) scale(1.05);
    }
}

@media (max-width: 768px) {
    .about-page {
        padding: 2rem 1rem 3rem;
    }

    .about-hero,
    .about-card {
        padding: 1.4rem;
        border-radius: 22px;
    }

    .about-card {
        grid-column: span 12;
    }

    .about-hero h1 {
        font-size: clamp(2rem, 8vw, 2.8rem);
    }
}

@media (prefers-reduced-motion: reduce) {
    .about-page::before,
    .about-page::after,
    .reveal {
        animation: none;
    }

    .reveal {
        opacity: 1;
        transform: none;
    }

    .about-card,
    .about-card:hover {
        transition: none;
        transform: none;
    }
}
</style>