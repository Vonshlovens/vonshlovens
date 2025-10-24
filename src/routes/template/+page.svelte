<main>
  <h1>Template Page</h1>
  <p>This is a template/tester page for trying out new components and designs.</p>

  <section class="demo-section">
    <h2>Component Testing Area</h2>
    <p>Use this space to test and develop new UI components.</p>

    <div class="card">
      <h3>Sample Card Component</h3>
      <p>This is a sample card that you can use as a template for building more components.</p>
      <button class="test-button">Test Button</button>
    </div>
  </section>
</main>

<style>
  main {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    margin-bottom: 1rem;
  }

  .demo-section {
    margin-top: 2rem;
    padding: 2rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  .card {
    margin-top: 1.5rem;
    padding: 1.5rem;
    background: rgba(51, 65, 85, 0.5);
    border-radius: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  .card h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: #818cf8;
  }

  .test-button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .test-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  .test-button:active {
    transform: translateY(0);
  }
</style>
