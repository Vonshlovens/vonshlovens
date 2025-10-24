<script lang="ts">
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let dinosaurs = data.dinosaurs;

  function handleMouseMove(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  }
</script>

<main>
  <h1>🦕 Dinosaur app</h1>
  <p>Click on a dinosaur below to learn more.</p>
  {#each dinosaurs as dinosaur (dinosaur.name)}
    <a
      href="/{dinosaur.name.toLowerCase()}"
      class="btn-primary dino-button"
      onmousemove={handleMouseMove}
    >
      {dinosaur.name}
    </a>
  {/each}
</main>

<style>
  .dino-button {
    position: relative;
    overflow: hidden;
    --mouse-x: 50%;
    --mouse-y: 50%;
    transition: transform 0.2s ease;
  }

  .dino-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle 120px at var(--mouse-x) var(--mouse-y),
      rgba(139, 92, 246, 0.6),
      rgba(59, 130, 246, 0.3) 40%,
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .dino-button:hover::before {
    opacity: 1;
  }

  .dino-button:hover {
    transform: translateY(-2px);
  }

  .dino-button:active {
    transform: translateY(0);
  }
</style>
