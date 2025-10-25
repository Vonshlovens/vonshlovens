<script lang="ts">
  interface Category {
    name: string;
    description: string;
    icon: string;
  }

  const categories: Category[] = [
    {
      name: 'Exercise',
      description: 'Track your physical activities, workouts, and movement goals to build strength and endurance.',
      icon: '💪'
    },
    {
      name: 'Lifestyle',
      description: 'Monitor sleep patterns, stress levels, and daily habits that impact your overall wellbeing.',
      icon: '🧘'
    },
    {
      name: 'Nutrition',
      description: 'Log your meals, track macros, and maintain a balanced diet for optimal health.',
      icon: '🥗'
    },
    {
      name: 'Supplements',
      description: 'Keep track of vitamins, minerals, and supplements to support your health goals.',
      icon: '💊'
    }
  ];

  function handleMouseMove(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  }
</script>

<main class="health-page">
  <div class="container">
    <h1 class="title">Health Dashboard</h1>
    <p class="subtitle">Choose a category to track your wellness journey</p>

    <div class="categories-grid">
      {#each categories as category}
        <button
          class="category-card"
          onmousemove={handleMouseMove}
        >
          <div class="icon">{category.icon}</div>
          <h2 class="category-name">{category.name}</h2>
          <p class="category-description">{category.description}</p>
        </button>
      {/each}
    </div>
  </div>
</main>

<style>
  .health-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%);
    padding: 4rem 2rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .title {
    font-size: 3.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #ff0844 0%, #ff6b6b 50%, #ff0844 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 0 0 40px rgba(255, 8, 68, 0.3);
  }

  .subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: #cbd5e1;
    margin-bottom: 4rem;
    opacity: 0.9;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .category-card {
    position: relative;
    background: rgba(20, 20, 20, 0.6);
    border: 2px solid rgba(255, 8, 68, 0.3);
    border-radius: 1.5rem;
    padding: 2.5rem 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    overflow: hidden;
    --mouse-x: 50%;
    --mouse-y: 50%;
  }

  .category-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle 150px at var(--mouse-x) var(--mouse-y),
      rgba(255, 8, 68, 0.4),
      rgba(255, 107, 107, 0.2) 40%,
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .category-card:hover::before {
    opacity: 1;
  }

  .category-card::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(135deg, #ff0844, #ff6b6b, #ff0844);
    border-radius: 1.5rem;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  .category-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 8, 68, 0.8);
    box-shadow: 0 20px 60px rgba(255, 8, 68, 0.4),
                0 0 40px rgba(255, 8, 68, 0.2);
  }

  .category-card:hover::after {
    opacity: 0.5;
  }

  .category-card:active {
    transform: translateY(-4px);
  }

  .icon {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    filter: drop-shadow(0 0 20px rgba(255, 8, 68, 0.5));
    transition: transform 0.3s ease;
  }

  .category-card:hover .icon {
    transform: scale(1.1);
  }

  .category-name {
    font-size: 1.8rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 1rem;
    text-shadow: 0 2px 10px rgba(255, 8, 68, 0.3);
  }

  .category-description {
    font-size: 1rem;
    color: #cbd5e1;
    line-height: 1.6;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 2.5rem;
    }

    .categories-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .category-card {
      padding: 2rem 1.5rem;
    }
  }
</style>
