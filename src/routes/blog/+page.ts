export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	date: string;
	readTime: string;
	tags: string[];
	published: boolean;
}

// Sample blog posts - in a real app, these would come from a CMS or markdown files
const posts: BlogPost[] = [
	{
		slug: 'welcome-to-my-blog',
		title: 'Welcome to My Blog!',
		excerpt: 'Starting this journey to share thoughts on AI, health tech, and competitive sprinting. Here\'s what you can expect.',
		content: `# Welcome to My Blog!

I'm excited to launch this blog where I'll be sharing my thoughts and experiences at the intersection of technology, health, and athletics.

## What You Can Expect

### 🤖 AI & Technology
- Deep dives into Large Language Models
- Azure workflows and cloud architecture
- DevOps best practices
- Homelab adventures

### 🏃‍♂️ Health & Performance
- Biomechanics insights from competitive sprinting
- Training optimization using data
- The psychology of peak performance

### 🔬 The Intersection
- How AI can revolutionize health and fitness
- Data-driven approaches to athletic performance
- Building tools that matter

Stay tuned for more content, and feel free to reach out if you have questions or want to collaborate!`,
		date: '2025-01-15',
		readTime: '3 min read',
		tags: ['introduction', 'AI', 'health', 'sprinting'],
		published: true
	},
	{
		slug: 'llm-workflows-azure',
		title: 'Building LLM-Powered Workflows in Azure',
		excerpt: 'How I\'m connecting real-world field data with interactive maps using Azure services and Large Language Models.',
		content: `# Building LLM-Powered Workflows in Azure

At work, I've been deep in the trenches building LLM-powered workflows that connect real-world field data with interactive mapping solutions. Here's what I've learned.

## The Challenge

Traditional data processing pipelines often struggle with:
- Unstructured field data
- Complex spatial relationships
- Real-time processing requirements
- User-friendly visualization

## The Solution

Using Azure's suite of AI services, we've built a system that:

### 1. Data Ingestion
- Azure Functions for real-time data processing
- Cosmos DB for flexible document storage
- Event Grid for reliable messaging

### 2. LLM Processing
- Azure OpenAI for text analysis and structuring
- Custom prompts for domain-specific extraction
- Function calling for structured outputs

### 3. Visualization
- Azure Maps for interactive visualization
- Power BI for dashboards
- Custom web apps for specialized views

## Key Learnings

1. **Prompt Engineering is Critical** - The quality of your outputs directly correlates with prompt design
2. **Error Handling** - LLMs can be unpredictable, robust error handling is essential
3. **Cost Management** - Token usage can add up quickly, optimize your prompts
4. **Security** - Always validate and sanitize LLM outputs before using them

## What's Next

I'm excited to explore:
- Multi-modal processing (text + images)
- Real-time streaming analytics
- Edge computing integration

More technical details coming in future posts!`,
		date: '2025-01-10',
		readTime: '7 min read',
		tags: ['Azure', 'LLM', 'workflows', 'mapping'],
		published: true
	}
];

export async function load() {
	const publishedPosts = posts
		.filter(post => post.published)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	
	return {
		posts: publishedPosts
	};
}
