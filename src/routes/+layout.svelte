<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<header>
	<nav>
		<div class="nav-brand">
			<a href="/">Portfolio</a>
		</div>
		<div class="nav-links">
			<a href="/" class:active={$page.url.pathname === '/'}>Home</a>
			<a href="/template" class:active={$page.url.pathname === '/template'}>Template</a>
			<a href="/health" class:active={$page.url.pathname === '/health'}>Health</a>
		</div>
	</nav>
</header>

<slot />

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 100;
		background: rgba(15, 23, 42, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(148, 163, 184, 0.1);
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem 2rem;
	}

	.nav-brand a {
		font-size: 1.5rem;
		font-weight: 600;
		text-decoration: none;
		color: #fff;
		transition: color 0.2s ease;
	}

	.nav-brand a:hover {
		color: #818cf8;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		text-decoration: none;
		color: #94a3b8;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
		position: relative;
	}

	.nav-links a:hover {
		color: #fff;
		background: rgba(129, 140, 248, 0.1);
	}

	.nav-links a.active {
		color: #fff;
		background: rgba(139, 92, 246, 0.2);
	}

	.nav-links a.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 2px;
		background: linear-gradient(90deg, #818cf8, #a78bfa);
		border-radius: 2px;
	}
</style>
