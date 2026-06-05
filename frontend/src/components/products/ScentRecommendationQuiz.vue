<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['add-to-cart', 'view-product'])
const router = useRouter()

const storageKey = 'artisan-alley:scent-quiz-result'

const questions = [
  {
    key: 'environment',
    title: 'Preferred environment',
    subtitle: 'Where do you imagine yourself enjoying the scent?',
    options: [
      {
        value: 'beach',
        label: 'Beach',
        scores: { citrus_fruity: 2, fresh_clean: 3, woody_aquatic: 1 }
      },
      {
        value: 'forest',
        label: 'Forest',
        scores: { woody_aquatic: 3, herbal_aromatherapy: 2, fresh_clean: 1 }
      },
      {
        value: 'coffee-shop',
        label: 'Coffee shop',
        scores: { sweet_gourmand: 3, woody_aquatic: 1, fresh_clean: 1 }
      },
      {
        value: 'garden',
        label: 'Garden',
        scores: { floral: 3, herbal_aromatherapy: 1, fresh_clean: 1 }
      }
    ]
  },
  {
    key: 'mood',
    title: 'Desired mood',
    subtitle: 'What feeling do you want from your candle or fragrance?',
    options: [
      {
        value: 'relaxed',
        label: 'Relaxed',
        scores: { fresh_clean: 2, floral: 2, herbal_aromatherapy: 2 }
      },
      {
        value: 'energetic',
        label: 'Energetic',
        scores: { citrus_fruity: 3, fresh_clean: 2, woody_aquatic: 1 }
      },
      {
        value: 'romantic',
        label: 'Romantic',
        scores: { floral: 3, sweet_gourmand: 2, woody_aquatic: 1 }
      },
      {
        value: 'focused',
        label: 'Focused',
        scores: { herbal_aromatherapy: 3, fresh_clean: 2, woody_aquatic: 1 }
      }
    ]
  },
  {
    key: 'family',
    title: 'Favourite fragrance family',
    subtitle: 'Pick the family you are naturally drawn to.',
    options: [
      {
        value: 'floral',
        label: 'Floral',
        scores: { floral: 5 }
      },
      {
        value: 'woody',
        label: 'Woody',
        scores: { woody_aquatic: 5 }
      },
      {
        value: 'citrus',
        label: 'Citrus',
        scores: { citrus_fruity: 5 }
      },
      {
        value: 'fresh',
        label: 'Fresh',
        scores: { fresh_clean: 5 }
      },
      {
        value: 'sweet',
        label: 'Sweet',
        scores: { sweet_gourmand: 5 }
      }
    ]
  },
  {
    key: 'usageTime',
    title: 'Preferred candle usage time',
    subtitle: 'When will you most likely use it?',
    options: [
      {
        value: 'morning',
        label: 'Morning',
        scores: { citrus_fruity: 2, fresh_clean: 3, herbal_aromatherapy: 1 }
      },
      {
        value: 'afternoon',
        label: 'Afternoon',
        scores: { woody_aquatic: 2, citrus_fruity: 2, fresh_clean: 1 }
      },
      {
        value: 'evening',
        label: 'Evening',
        scores: { floral: 2, sweet_gourmand: 3, woody_aquatic: 1 }
      },
      {
        value: 'bedtime',
        label: 'Bedtime',
        scores: { floral: 1, sweet_gourmand: 2, herbal_aromatherapy: 3, fresh_clean: 1 }
      }
    ]
  },
  {
    key: 'strength',
    title: 'Strength preference',
    subtitle: 'How strong should the scent feel?',
    options: [
      {
        value: 'light',
        label: 'Light',
        scores: { fresh_clean: 2, floral: 2, herbal_aromatherapy: 1 }
      },
      {
        value: 'medium',
        label: 'Medium',
        scores: { woody_aquatic: 2, sweet_gourmand: 2, floral: 1, citrus_fruity: 1 }
      },
      {
        value: 'strong',
        label: 'Strong',
        scores: { woody_aquatic: 3, citrus_fruity: 2, sweet_gourmand: 2 }
      }
    ]
  }
]

const familyCatalog = {
  floral: {
    title: 'Floral',
    description: 'Soft, blooming, and romantic. Best for an uplifting garden-like atmosphere.',
    products: ['Blooming Daisy Candle'],
    keywords: ['floral', 'rose', 'jasmine', 'peony', 'blossom', 'garden']
  },
  fresh_clean: {
    title: 'Fresh/Clean',
    description: 'Airy, crisp, and fresh. Great for a tidy, calming, and bright home mood.',
    products: ['Polar Dreams Gel Candle', 'Sea Breeze Candle', 'Fresh + Clean DIY Room Spray Set'],
    keywords: ['fresh', 'clean', 'linen', 'mint', 'ocean', 'breeze', 'air']
  },
  sweet_gourmand: {
    title: 'Sweet/Gourmand',
    description: 'Comforting and edible-inspired. Perfect when you want a cosy and playful scent.',
    products: ['Sweet Frost Candle Collection', 'Breakfast Bliss Candle Set', 'Pastel Scoop Cupcake Candles', 'Chocolatey Mousse Candle'],
    keywords: ['sweet', 'vanilla', 'honey', 'caramel', 'tonka', 'cocoa', 'dessert']
  },
  citrus_fruity: {
    title: 'Citrus/Fruity',
    description: 'Bright, sparkling, and energetic. A lively pick for daytime refreshment.',
    products: ['Dopamine Candle'],
    keywords: ['citrus', 'lemon', 'orange', 'bergamot', 'grapefruit', 'zest', 'fruit']
  },
  woody_aquatic: {
    title: 'Woody/Aquatic',
    description: 'Grounding yet breezy, combining forest depth with a coastal feel.',
    products: ['Sea Crafts Candle'],
    keywords: ['woody', 'cedar', 'sandalwood', 'forest', 'oak', 'amber', 'sea', 'aquatic']
  },
  herbal_aromatherapy: {
    title: 'Herbal/Aromatherapy',
    description: 'Herbal, soothing, and restorative. Ideal for mindful rituals and downtime.',
    products: ['Tumalo Botanical Room Spray', 'Aromatic Wellness Room Spray'],
    keywords: ['herbal', 'lavender', 'sage', 'rosemary', 'botanical', 'wellness', 'aromatherapy']
  }
}

const currentStep = ref(0)
const answers = reactive({})
const selectedFamily = ref('')
const completed = ref(false)
const optionRefs = ref([])

const totalSteps = computed(() => questions.length)
const progressPercent = computed(() => (completed.value ? 100 : Math.round((currentStep.value / totalSteps.value) * 100)))
const currentQuestion = computed(() => questions[currentStep.value] || null)
const recommendation = computed(() => familyCatalog[selectedFamily.value] || familyCatalog.fresh_clean)

const suggestedProducts = computed(() => {
  return recommendation.value.products.map((productName) => {
    const matchedProduct = props.products.find((product) => normalizeText(product.name) === normalizeText(productName)) || null

    return {
      name: productName,
      product: matchedProduct,
      category: matchedProduct?.category || recommendation.value.title,
      image: matchedProduct?.image || '',
      price: matchedProduct?.price ?? null,
      description: matchedProduct?.description || recommendation.value.description
    }
  })
})

function normalizeText(value) {
  return String(value || '').trim().toLowerCase()
}

function ensureQuestionAnswer(questionKey, option) {
  answers[questionKey] = option.value
}

function scoreAnswers() {
  const familyScores = {
    floral: 0,
    fresh_clean: 0,
    sweet_gourmand: 0,
    citrus_fruity: 0,
    woody_aquatic: 0,
    herbal_aromatherapy: 0
  }

  questions.forEach((question) => {
    const selectedValue = answers[question.key]
    if (!selectedValue) {
      return
    }

    const chosenOption = question.options.find((option) => option.value === selectedValue)
    if (!chosenOption) {
      return
    }

    Object.entries(chosenOption.scores).forEach(([family, points]) => {
      familyScores[family] += points
    })
  })

  const [topFamily] = Object.entries(familyScores).sort((left, right) => right[1] - left[1])[0] || []
  return { familyScores, topFamily: topFamily || 'fresh' }
}

function persistResult(result) {
  localStorage.setItem(storageKey, JSON.stringify(result))
}

function finishQuiz() {
  const { familyScores, topFamily } = scoreAnswers()
  const resultFamily = familyCatalog[topFamily] || familyCatalog.fresh_clean
  selectedFamily.value = topFamily
  completed.value = true
  persistResult({
    answers: { ...answers },
    familyScores,
    selectedFamily: topFamily,
    recommendation: resultFamily.title,
    timestamp: new Date().toISOString(),
    suggestedProducts: suggestedProducts.value.map((item) => item.name)
  })
}

function goNext() {
  if (!currentQuestion.value) {
    return
  }

  const selectedValue = answers[currentQuestion.value.key]
  if (!selectedValue) {
    return
  }

  if (currentStep.value < questions.length - 1) {
    currentStep.value += 1
    return
  }

  finishQuiz()
}

function goBack() {
  if (currentStep.value > 0) {
    currentStep.value -= 1
  }
}

function restartQuiz() {
  Object.keys(answers).forEach((key) => delete answers[key])
  currentStep.value = 0
  selectedFamily.value = ''
  completed.value = false
  localStorage.removeItem(storageKey)
  optionRefs.value = []
}

function chooseOption(option) {
  if (!currentQuestion.value) {
    return
  }

  ensureQuestionAnswer(currentQuestion.value.key, option)
}

function handleOptionKeydown(event, option, index) {
  const isActivationKey = event.key === 'Enter' || event.key === ' '
  if (isActivationKey) {
    event.preventDefault()
    chooseOption(option)
    return
  }

  const moveFocus = (nextIndex) => {
    const target = optionRefs.value[nextIndex]
    if (target) {
      target.focus()
    }
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    moveFocus((index + 1) % currentQuestion.value.options.length)
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    moveFocus((index - 1 + currentQuestion.value.options.length) % currentQuestion.value.options.length)
  }
}

function addToCart(product) {
  emit('add-to-cart', product)
}

function viewProduct(product) {
  emit('view-product', product)
}

function browseCandles() {
  router.push('/products?category=candles-scents')
}

watch(currentStep, () => {
  optionRefs.value = []
})
</script>

<template>
  <section class="quiz_shell" aria-labelledby="quiz-title">
    <div class="quiz_intro_card">
      <div>
        <p class="eyebrow">Scent Finder</p>
        <h2 id="quiz-title">Find the right candle or fragrance</h2>
        <p class="intro_copy">
          Answer five quick questions and we’ll recommend the fragrance family that fits your space and mood.
        </p>
      </div>

      <button type="button" class="restart_btn" @click="restartQuiz">Restart quiz</button>
    </div>

    <div class="progress_wrap" aria-label="Quiz completion">
      <div class="progress_track" role="progressbar" :aria-valuenow="progressPercent" aria-valuemin="0" aria-valuemax="100">
        <div class="progress_fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <p class="progress_text">{{ currentStep + 1 }} / {{ totalSteps }} answered</p>
    </div>

    <Transition name="question-fade" mode="out-in">
      <article v-if="!completed && currentQuestion" :key="currentQuestion.key" class="question_card">
        <p class="question_number">Question {{ currentStep + 1 }}</p>
        <h3>{{ currentQuestion.title }}</h3>
        <p class="question_subtitle">{{ currentQuestion.subtitle }}</p>

        <div class="options_grid" role="radiogroup" :aria-label="currentQuestion.title">
          <label
            v-for="(option, index) in currentQuestion.options"
            :key="option.value"
            class="option_card"
            :class="{ active: answers[currentQuestion.key] === option.value }"
          >
            <input
              :ref="(element) => { optionRefs[index] = element }"
              type="radio"
              class="option_input"
              :name="currentQuestion.key"
              :value="option.value"
              :checked="answers[currentQuestion.key] === option.value"
              :aria-label="`${currentQuestion.title}: ${option.label}`"
              @change="chooseOption(option)"
              @keydown="handleOptionKeydown($event, option, index)"
            />
            <span
              class="option_btn"
              :class="{ active: answers[currentQuestion.key] === option.value }"
            >
              {{ option.label }}
            </span>
          </label>
        </div>

        <div class="nav_row">
          <button type="button" class="secondary_btn" :disabled="currentStep === 0" @click="goBack">Back</button>
          <button
            type="button"
            class="primary_btn"
            :disabled="!answers[currentQuestion.key]"
            @click="goNext"
          >
            {{ currentStep === totalSteps - 1 ? 'See recommendation' : 'Next' }}
          </button>
        </div>
      </article>

      <article v-else class="result_card" :key="selectedFamily || 'result'">
        <div>
          <p class="eyebrow">Your result</p>
          <h3>{{ recommendation?.title || 'Recommended fragrance family' }}</h3>
          <p class="result_copy">{{ recommendation?.description }}</p>
        </div>

        <div class="score_chip">
          <span>Best match</span>
          <strong>{{ recommendation?.title || 'Fresh' }}</strong>
        </div>

        <div class="suggestions_block">
          <h4>Suggested products</h4>
          <div class="suggestions_grid">
            <article v-for="item in suggestedProducts" :key="item.name" class="suggestion_card">
              <img v-if="item.product?.image" :src="`http://localhost:5000/images/${item.product.image}`" :alt="item.name" />
              <div v-else class="fallback_art" :data-family="recommendation?.title">{{ recommendation?.title }}</div>
              <div>
                <p class="product_family">{{ item.category }}</p>
                <h5>{{ item.name }}</h5>
                <p class="product_desc">{{ item.description }}</p>
                <p v-if="item.price !== null" class="product_price">RM {{ Number(item.price).toFixed(2) }}</p>
                <div class="suggestion_actions">
                  <template v-if="item.product">
                    <button type="button" class="primary_btn small" @click="addToCart(item.product)">Add to Cart</button>
                    <button type="button" class="secondary_btn small" @click="viewProduct(item.product)">View</button>
                  </template>
                  <template v-else>
                    <button type="button" class="secondary_btn small" @click="browseCandles">Browse collection</button>
                  </template>
                </div>
              </div>
            </article>
          </div>
          <p class="empty_state">
            These are the exact scent families and products your quiz is mapped to.
          </p>
        </div>

        <button type="button" class="restart_btn result_restart" @click="restartQuiz">Try again</button>
      </article>
    </Transition>
  </section>
</template>

<style scoped>
.quiz_shell {
  width: 100%;
  display: grid;
  gap: 1rem;
}

.quiz_intro_card,
.question_card,
.result_card {
  background: linear-gradient(180deg, #fff, #f9f1e5);
  border: 1px solid #e5d1b7;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(103, 76, 71, 0.12);
}

.quiz_intro_card {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
  padding: 1.25rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #997654;
  font-size: 0.76rem;
  font-weight: 700;
}

h2,
h3,
h4,
h5 {
  color: #674c47;
}

.intro_copy,
.question_subtitle,
.result_copy,
.empty_state,
.progress_text {
  color: #7a6460;
}

.restart_btn,
.primary_btn,
.secondary_btn {
  border: none;
  border-radius: 999px;
  padding: 0.8rem 1.1rem;
  cursor: pointer;
  font-weight: 700;
  transition: transform 160ms ease, background 160ms ease, opacity 160ms ease;
}

.restart_btn:hover,
.primary_btn:hover,
.secondary_btn:hover {
  transform: translateY(-1px);
}

.restart_btn {
  background: #eae0c7;
  color: #674c47;
  white-space: nowrap;
}

.progress_wrap {
  display: grid;
  gap: 0.45rem;
}

.progress_track {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(229, 209, 183, 0.7);
  overflow: hidden;
}

.progress_fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #dc8c24, #f0b56d);
  transition: width 280ms ease;
}

.progress_text {
  margin: 0;
  font-size: 0.9rem;
}

.question_card,
.result_card {
  padding: 1.35rem;
  position: relative;
  z-index: 1;
}

.question_number {
  margin: 0 0 0.4rem;
  color: #997654;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.question_card h3,
.result_card h3 {
  margin: 0;
  font-size: 1.6rem;
}

.question_subtitle {
  margin: 0.45rem 0 1rem;
}

.options_grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
}

.option_card {
  position: relative;
  display: block;
  cursor: pointer;
}

.option_input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  margin: 0;
}

.option_btn {
  display: block;
  min-height: 52px;
  padding: 0.85rem 1rem;
  text-align: left;
  border: 1px solid #e5d1b7;
  border-radius: 16px;
  background: #fff;
  color: #674c47;
  position: relative;
  z-index: 2;
  pointer-events: auto;
}

.option_card:hover .option_btn,
.option_card.active .option_btn,
.option_input:checked + .option_btn,
.option_input:focus-visible + .option_btn {
  border-color: #dc8c24;
  outline: none;
  box-shadow: 0 0 0 3px rgba(220, 140, 36, 0.14);
  background: #fff7ec;
}

.nav_row {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1.1rem;
}

.primary_btn {
  background: #dc8c24;
  color: #fff;
}

.secondary_btn {
  background: #eae0c7;
  color: #674c47;
}

.primary_btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.score_chip {
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  background: #674c47;
  color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.score_chip span {
  color: #e5d1b7;
}

.suggestions_block {
  margin-top: 1rem;
}

.suggestions_block h4 {
  margin: 0 0 0.75rem;
}

.suggestions_grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.suggestion_card {
  background: #fff;
  border: 1px solid #e5d1b7;
  border-radius: 18px;
  overflow: hidden;
}

.suggestion_card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.suggestion_card > div {
  padding: 0.9rem;
}

.product_family {
  margin: 0;
  font-size: 0.82rem;
  color: #997654;
}

.suggestion_card h5 {
  margin: 0.25rem 0 0.35rem;
  font-size: 1rem;
}

.product_price {
  margin: 0 0 0.8rem;
  color: #dc8c24;
  font-weight: 700;
}

.suggestion_actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.small {
  padding: 0.62rem 0.9rem;
  font-size: 0.86rem;
}

.result_restart {
  margin-top: 1rem;
}

.question-fade-enter-active,
.question-fade-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}

.question-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.question-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 900px) {
  .suggestions_grid,
  .options_grid {
    grid-template-columns: 1fr;
  }

  .quiz_intro_card {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .question_card h3,
  .result_card h3 {
    font-size: 1.35rem;
  }

  .nav_row {
    flex-direction: column;
  }

  .restart_btn,
  .primary_btn,
  .secondary_btn {
    width: 100%;
    justify-content: center;
  }
}
</style>