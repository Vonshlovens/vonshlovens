import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CcvcEYMf.js","_app/immutable/chunks/D1NJyj1o.js","_app/immutable/chunks/GTAaRy6U.js","_app/immutable/chunks/DFeQT35A.js","_app/immutable/chunks/Df5f7g6U.js","_app/immutable/chunks/4BcCmbNE.js","_app/immutable/chunks/BAowp6la.js","_app/immutable/chunks/DMpkxKof.js","_app/immutable/chunks/KzBMoXST.js","_app/immutable/chunks/Siwr-V5x.js","_app/immutable/chunks/D6OIyfxu.js","_app/immutable/chunks/D4erDOge.js"];
export const stylesheets = ["_app/immutable/assets/0.D4o1n0aX.css"];
export const fonts = [];
