import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.DZ-aWV0f.js","_app/immutable/chunks/D1NJyj1o.js","_app/immutable/chunks/GTAaRy6U.js","_app/immutable/chunks/DFeQT35A.js","_app/immutable/chunks/Bu-B3FWD.js","_app/immutable/chunks/Df5f7g6U.js","_app/immutable/chunks/Bw1bz6lE.js","_app/immutable/chunks/CKU6TQh2.js","_app/immutable/chunks/BAowp6la.js","_app/immutable/chunks/DMpkxKof.js","_app/immutable/chunks/D4erDOge.js"];
export const stylesheets = [];
export const fonts = [];
