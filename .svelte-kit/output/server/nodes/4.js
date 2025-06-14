import * as universal from '../entries/pages/blog/_page.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/blog/+page.ts";
export const imports = ["_app/immutable/nodes/4.B29fhBup.js","_app/immutable/chunks/D1NJyj1o.js","_app/immutable/chunks/GTAaRy6U.js","_app/immutable/chunks/DNOMOTc6.js","_app/immutable/chunks/Bu-B3FWD.js","_app/immutable/chunks/Df5f7g6U.js","_app/immutable/chunks/Bw1bz6lE.js","_app/immutable/chunks/4BcCmbNE.js","_app/immutable/chunks/CKU6TQh2.js","_app/immutable/chunks/BAowp6la.js","_app/immutable/chunks/Bos9rtOf.js","_app/immutable/chunks/u2N9GlbM.js","_app/immutable/chunks/KzBMoXST.js","_app/immutable/chunks/Siwr-V5x.js","_app/immutable/chunks/D4erDOge.js"];
export const stylesheets = [];
export const fonts = [];
