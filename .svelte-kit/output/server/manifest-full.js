export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "vonshlovens/_app",
	assets: new Set(["favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BnTlBTRU.js",app:"_app/immutable/entry/app.DGgWcTG2.js",imports:["_app/immutable/entry/start.BnTlBTRU.js","_app/immutable/chunks/D6OIyfxu.js","_app/immutable/chunks/GTAaRy6U.js","_app/immutable/chunks/Siwr-V5x.js","_app/immutable/chunks/D4erDOge.js","_app/immutable/chunks/DFeQT35A.js","_app/immutable/entry/app.DGgWcTG2.js","_app/immutable/chunks/GTAaRy6U.js","_app/immutable/chunks/Bu-B3FWD.js","_app/immutable/chunks/Df5f7g6U.js","_app/immutable/chunks/Bw1bz6lE.js","_app/immutable/chunks/D1NJyj1o.js","_app/immutable/chunks/DFeQT35A.js","_app/immutable/chunks/4BcCmbNE.js","_app/immutable/chunks/u2N9GlbM.js","_app/immutable/chunks/KzBMoXST.js","_app/immutable/chunks/Siwr-V5x.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog",
				pattern: /^\/blog\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog/[slug]",
				pattern: /^\/blog\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
