/* icons.js — bộ hình pixel tự vẽ. Load SAU core.js, TRƯỚC UI phụ */
/* ===== Bộ hình pixel tự vẽ thay cho emoji mặc định ===== */
(()=>{
const O='#2b1a0e',S=c=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g stroke="${O}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${c}</g></svg>`,N='fill="none"',rep=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
const SVGI={
watch:S(`<path d="M24 3h16l2 15H22zM22 46h20l-2 15H24z" fill="#7a4a24"/><circle cx="32" cy="32" r="16" fill="#d9b44a"/><circle cx="32" cy="32" r="12" fill="#f6efd6"/><path d="M32 24v8l5 3" ${N}/><rect x="47" y="29" width="4" height="6" rx="1" fill="#d9b44a"/><path d="M32 21v2M32 41v2M21 32h2M41 32h2" ${N} stroke-width="1.3"/>`),
camera:S(`<rect x="5" y="20" width="54" height="36" rx="5" fill="#4a4a52"/><rect x="5" y="20" width="54" height="11" rx="4" fill="#c9ccd2"/><circle cx="32" cy="39" r="13" fill="#9a9ea6"/><circle cx="32" cy="39" r="9" fill="#2a3a5a"/><circle cx="29" cy="36" r="2.6" fill="#9fc4ff" stroke="none"/><rect x="11" y="13" width="11" height="7" fill="#c9ccd2"/><rect x="45" y="14" width="9" height="6" fill="#f2d57a"/>`),
radio:S(`<path d="M44 6L26 20" ${N}/><rect x="5" y="20" width="54" height="36" rx="5" fill="#9a5a2a"/><circle cx="22" cy="38" r="12" fill="#d6b27a"/><path d="M14 33h16M13 38h18M14 43h16" ${N} stroke-width="1.4"/><rect x="38" y="26" width="15" height="9" fill="#f1e2b0"/><path d="M41 30h9" stroke="#c03a2a"/><circle cx="42" cy="45" r="3.5" fill="#e8d9a8"/><circle cx="51" cy="45" r="3.5" fill="#e8d9a8"/>`),
teddy:S(`<circle cx="17" cy="13" r="7" fill="#b9814a"/><circle cx="47" cy="13" r="7" fill="#b9814a"/><circle cx="32" cy="22" r="15" fill="#c8915a"/><ellipse cx="32" cy="46" rx="14" ry="14" fill="#c8915a"/><circle cx="13" cy="42" r="6" fill="#b9814a"/><circle cx="51" cy="42" r="6" fill="#b9814a"/><ellipse cx="32" cy="27" rx="6.5" ry="4.8" fill="#f0d2a8"/><circle cx="32" cy="25.5" r="2" fill="${O}"/><circle cx="25" cy="18" r="1.6" fill="${O}" stroke="none"/><circle cx="39" cy="18" r="1.6" fill="${O}" stroke="none"/><path d="M32 38l-5 3 5 3 5-3z" fill="#d44a5a"/>`),
ring:S(`<circle cx="32" cy="40" r="15" ${N} stroke-width="9"/><circle cx="32" cy="40" r="15" ${N} stroke="#d3d6dc" stroke-width="5"/><path d="M23 20l5-9h8l5 9-9 11z" fill="#6ad0f0"/><path d="M23 20h18M28 11l4 20M36 11l-4 20" ${N} stroke-width="1.2"/>`),
guitar:S(`<g transform="rotate(40 32 32)"><rect x="29" y="1" width="6" height="30" fill="#5a3a1c"/><rect x="27" y="0" width="10" height="9" rx="2" fill="#2b1a0e"/><path d="M32 27c-7 0-9 5-8 8-5 1-8 5-8 9 0 7 6 12 16 12s16-5 16-12c0-4-3-8-8-9 1-3-1-8-8-8z" fill="#c9742e"/><circle cx="32" cy="45" r="5" fill="${O}"/><path d="M32 12v30" ${N} stroke="#e8e0c8" stroke-width=".9"/></g>`),
phone:S(`<rect x="17" y="3" width="30" height="58" rx="6" fill="#33363d"/><rect x="21" y="11" width="22" height="36" fill="#7ac3e6"/><path d="M24 18h16M24 24h10" stroke="#fff" ${N} stroke-width="1.6"/><circle cx="32" cy="54" r="3.5" ${N} stroke="#c9ccd2"/><rect x="27" y="6" width="10" height="2" fill="#9a9ea8" stroke="none"/>`),
vase:S(`<path d="M23 4h18v6c0 3 11 7 11 25 0 15-8 25-20 25S12 50 12 35c0-18 11-22 11-25z" fill="#c0643a"/><path d="M15 28h34M13 40h38" ${N} stroke="#f1d9a0" stroke-width="3"/><path d="M20 10h24" ${N}/>`),
violin:S(`<g transform="rotate(30 32 32)"><rect x="29" y="1" width="6" height="26" fill="#3a2410"/><circle cx="32" cy="3" r="4" fill="#8a4a1a"/><path d="M32 24c-6 0-8 4-7 7-4 2-6 5-6 8 0 5 5 7 7 9-2 2-2 5 0 7 2 3 12 3 14 0 2-2 2-5 0-7 2-2 7-4 7-9 0-3-2-6-6-8 1-3-1-7-9-7z" fill="#b5651d"/><path d="M27 38v8M37 38v8" ${N} stroke-width="1.5"/><rect x="29" y="52" width="6" height="3" fill="${O}"/></g><path d="M54 6L12 58" ${N} stroke-width="1.5"/>`),
gameboy:S(`<rect x="13" y="3" width="38" height="58" rx="5" fill="#cfd0c8"/><rect x="18" y="8" width="28" height="24" rx="2" fill="#4a5a4a"/><rect x="21" y="11" width="22" height="18" fill="#9bbc0f"/><path d="M19 42h4v-4h4v4h4v4h-4v4h-4v-4h-4z" fill="#2b2b33"/><circle cx="40" cy="45" r="3.4" fill="#b0304a"/><circle cx="46" cy="39" r="3.4" fill="#b0304a"/><path d="M24 55l5-3M33 55l5-3" stroke-width="2.5"/>`),
typew:S(`<rect x="18" y="3" width="28" height="22" fill="#f4f0e0"/><path d="M22 9h20M22 14h16" ${N} stroke-width="1.4"/><rect x="9" y="25" width="46" height="11" rx="4" fill="#2f3138"/><path d="M8 36h48l-4 22H12z" fill="#3a3d46"/><g fill="#e8e4d0" stroke-width="1">${rep(6,i=>`<circle cx="${17+i*6}" cy="43" r="2.2"/>`)}${rep(5,i=>`<circle cx="${20+i*6}" cy="50" r="2.2"/>`)}</g>`),
clock:S(`<circle cx="32" cy="32" r="27" fill="#a0642c"/><circle cx="32" cy="32" r="21" fill="#faf3dc"/><path d="M32 13v5M32 46v5M13 32h5M46 32h5" ${N} stroke-width="2"/><path d="M32 32V19M32 32l9 5" ${N} stroke-width="2.6"/><circle cx="32" cy="32" r="2.2" fill="${O}"/>`),
lamp:S(`<path d="M24 14c0-6 4-10 8-10s8 4 8 10v14c0 4 4 6 4 10H20c0-4 4-6 4-10z" fill="#bfe6f2" fill-opacity=".85"/><path d="M32 8c4 5 3 9 0 11-3-2-4-6 0-11z" fill="#f59e2a"/><path d="M16 38h32l-4 12H20z" fill="#c9962e"/><rect x="21" y="50" width="22" height="8" rx="3" fill="#a47520"/><path d="M48 40c8 0 8 8 0 8" ${N} stroke-width="3"/>`),
book:S(`<path d="M9 8h39a5 5 0 015 5v38a5 5 0 01-5 5H9z" fill="#7a2a22"/><path d="M15 8v48" ${N}/><path d="M20 18h26M20 24h20" ${N} stroke="#e8c860" stroke-width="2.5"/><path d="M11 56h40v4H11z" fill="#f4ecd0"/><path d="M53 14v38" ${N} stroke="#f4ecd0" stroke-width="3"/>`),
jade:S(`<circle cx="32" cy="32" r="19" ${N} stroke-width="16"/><circle cx="32" cy="32" r="19" ${N} stroke="#3fae78" stroke-width="12"/><path d="M14 24a19 19 0 0 1 14-12" ${N} stroke="#c9f3da" stroke-width="3"/>`),
coin:S(`<circle cx="32" cy="32" r="27" fill="#d9a82e"/><circle cx="32" cy="32" r="22" ${N} stroke-width="1.5"/><rect x="24" y="24" width="16" height="16" fill="#5a3d12"/><path d="M32 10v7M32 47v7M10 32h7M47 32h7" stroke-width="2.5"/>`),
vinyl:S(`<circle cx="32" cy="32" r="28" fill="#1b1b20"/><circle cx="32" cy="32" r="21" ${N} stroke="#4a4a55" stroke-width="1"/><circle cx="32" cy="32" r="15" ${N} stroke="#4a4a55" stroke-width="1"/><circle cx="32" cy="32" r="9" fill="#d24a3a"/><circle cx="32" cy="32" r="2" fill="#f4ecd0"/><path d="M13 20a22 22 0 0 1 10-9" ${N} stroke="#8a8a98" stroke-width="2.5"/>`),
globe:S(`<circle cx="32" cy="26" r="21" fill="#3f8fc9"/><path d="M17 20c4-5 9 0 9 4s-4 6-7 4zM37 12c5 0 9 5 7 9s-6 2-8 6c-2 4-7 2-5-4z" fill="#6ab86a" stroke-width="1.5"/><path d="M10 12a25 25 0 0 1 0 28" ${N} stroke="#c9962e" stroke-width="3"/><path d="M32 47v7M20 60l12-6 12 6z" fill="#c9962e"/>`),
telesc:S(`<g transform="rotate(-25 32 28)"><rect x="3" y="20" width="7" height="17" rx="2" fill="#2b4a6a"/><rect x="9" y="22" width="26" height="13" fill="#c9962e"/><rect x="34" y="24" width="14" height="9" fill="#a47520"/><rect x="47" y="25" width="9" height="7" fill="#8a8e96"/></g><path d="M30 40L18 61M30 40l14 21M30 40v21" ${N} stroke-width="2.5"/>`),
fan:S(`<circle cx="32" cy="26" r="22" fill="#e8ebe0"/><path d="M32 26c-4-11 5-15 9-10zM32 26c11-4 15 5 10 9zM32 26c4 11-5 15-9 10zM32 26c-11 4-15-5-10-9z" fill="#5a7a9a"/><circle cx="32" cy="26" r="3" fill="#2b1a0e"/><rect x="29" y="48" width="6" height="8" fill="#555"/><path d="M16 61h32l-4-6H20z" fill="#444"/>`),
sword:S(`<g transform="rotate(45 32 32)"><path d="M32 0l5 9v29h-10V9z" fill="#d6dae0"/><path d="M32 5v33" ${N} stroke-width="1.2"/><rect x="18" y="38" width="28" height="6" rx="3" fill="#c9962e"/><rect x="29" y="44" width="6" height="13" fill="#5a2a1a"/><circle cx="32" cy="60" r="4" fill="#c9962e"/></g>`),
teapot:S(`<path d="M20 22h28c7 5 7 22 0 26H20c-7-4-7-21 0-26z" fill="#7aa0a8"/><path d="M17 28L5 21c0 7 5 14 12 18z" fill="#7aa0a8"/><path d="M49 28c9-2 12 1 10 7-1 3-6 4-10 4" ${N} stroke-width="3"/><path d="M24 22c0-7 4-9 10-9s10 2 10 9z" fill="#5f8890"/><circle cx="34" cy="11" r="2.8" fill="#5f8890"/><path d="M22 36h26" ${N} stroke="#f2e6c6" stroke-width="3"/>`),
mask:S(`<path d="M9 13c9-6 37-6 46 0 2 19-4 37-23 47C13 50 7 32 9 13z" fill="#b57b3e"/><path d="M15 27c4-4 9-3 12 2-3 4-9 3-12-2zM49 27c-4-4-9-3-12 2 3 4 9 3 12-2z" fill="${O}"/><path d="M32 30l-4 13h8z" fill="#8a5a28"/><path d="M23 49c6 3 12 3 18 0" ${N} stroke-width="2.6"/><path d="M12 17l9 4M52 17l-9 4" ${N} stroke="#e8c860" stroke-width="2.5"/>`),
chess:S(`<path d="M32 3v10M27 8h10" ${N} stroke-width="2.6"/><path d="M23 22c0-5 4-9 9-9s9 4 9 9c0 3-2 5-3 6H26c-1-1-3-3-3-6z" fill="#f2e8cc"/><path d="M26 28h12l3 18H23z" fill="#f2e8cc"/><path d="M17 46h30l3 11H14z" fill="#e8dbb4"/><rect x="12" y="57" width="40" height="5" rx="2" fill="#d6c690"/>`),
crown:S(`<path d="M7 20l13 14 12-19 12 19 13-14-5 33H12z" fill="#e0b030"/><rect x="10" y="50" width="44" height="9" rx="2" fill="#c9962e"/><circle cx="32" cy="9" r="4" fill="#d9363e"/><circle cx="7" cy="20" r="3.4" fill="#5bc4ec"/><circle cx="57" cy="20" r="3.4" fill="#5bc4ec"/><circle cx="32" cy="43" r="4.5" fill="#3a8fd9"/>`),
oilp:S(`<rect x="5" y="9" width="54" height="46" fill="#b8892e"/><rect x="11" y="15" width="42" height="34" fill="#9ed2ee"/><path d="M11 42c8-11 14-9 21-3 6-9 13-9 21 0v10H11z" fill="#4f9a52"/><circle cx="42" cy="25" r="5" fill="#f6d84a"/><path d="M11 49c8-4 16-4 24 0" ${N} stroke="#2e7a3a" stroke-width="1.5"/>`),
statue:S(`<rect x="13" y="51" width="38" height="9" fill="#9a9488"/><path d="M17 51c0-11 6-15 15-15s15 4 15 15z" fill="#b4ae9f"/><ellipse cx="32" cy="22" rx="11" ry="14" fill="#c4bead"/><path d="M25 21h5M34 21h5M32 24v6" ${N} stroke-width="1.8"/><path d="M21 15c2-9 20-9 22 0" ${N} stroke-width="2.5"/><path d="M27 33c3 2 7 2 10 0" ${N} stroke-width="1.6"/>`),
trunk:S(`<path d="M5 29c0-15 11-22 27-22s27 7 27 22z" fill="#9a5a2a"/><rect x="5" y="29" width="54" height="27" fill="#8a4c22"/><path d="M21 8v48M43 8v48" ${N} stroke="#3a3f4a" stroke-width="4.5"/><rect x="27" y="26" width="10" height="13" rx="2" fill="#e0b030"/><circle cx="32" cy="33" r="1.8" fill="${O}" stroke="none"/>`),
bike:S(`<circle cx="14" cy="43" r="12" ${N} stroke-width="3"/><circle cx="50" cy="43" r="12" ${N} stroke-width="3"/><path d="M14 43l12-19h16l8 19M26 24l10 19H14M24 24l-2-7h-7M42 24l-2-9h7" ${N} stroke="#b8402a" stroke-width="3"/><rect x="19" y="13" width="13" height="4" rx="2" fill="${O}"/><circle cx="14" cy="43" r="2" fill="${O}"/><circle cx="50" cy="43" r="2" fill="${O}"/>`),
sax:S(`<path d="M38 5l5 2-3 11v22c0 12-6 18-14 18-8 0-14-6-14-14l5-2c0 6 3 9 9 9 5 0 7-4 7-11V15z" fill="#e3ab2c"/><ellipse cx="11" cy="50" rx="10" ry="8" fill="#f2c548"/><path d="M38 5l9-3 2 4-9 4z" fill="${O}"/>${rep(3,i=>`<circle cx="40" cy="${24+i*8}" r="2.4" fill="#f6dc86"/>`)}`),
pend:S(`<rect x="15" y="3" width="34" height="58" rx="3" fill="#6a3a1a"/><circle cx="32" cy="17" r="10" fill="#faf3dc"/><path d="M32 17v-6M32 17l5 3" ${N} stroke-width="1.8"/><rect x="21" y="31" width="22" height="24" fill="#c9a86a"/><path d="M32 31v14" ${N}/><circle cx="32" cy="46" r="5" fill="#d9a82e"/>`),
sam:S(`<path d="M24 5h16l-2 9H26z" fill="#b87333"/><path d="M19 14h26c8 5 8 29 0 35H19c-8-6-8-30 0-35z" fill="#c9824a"/><path d="M11 28h8M45 28h8" ${N} stroke-width="3"/><path d="M45 37h9l2 5-7 2" fill="#a05a2a"/><rect x="21" y="49" width="22" height="8" fill="#9a5a2a"/><path d="M15 58h34" ${N} stroke-width="3"/>`),
clois:S(`<path d="M25 3h14v9c0 4 13 8 13 24 0 15-9 25-20 25S12 51 12 36c0-16 13-20 13-24z" fill="#2c5fa8"/><path d="M14 28h36M13 43h38" ${N} stroke="#e8c04a" stroke-width="2.2"/><circle cx="24" cy="35" r="3" fill="#e8c04a"/><circle cx="40" cy="35" r="3" fill="#e8c04a"/><path d="M32 18l3 5-3 5-3-5z" fill="#e8c04a"/>`),
scep:S(`<g transform="rotate(35 32 32)"><rect x="29" y="16" width="6" height="45" fill="#e0b030"/><circle cx="32" cy="12" r="8" fill="#d9363e"/><path d="M23 14l-4-9 9 4 4-8 4 8 9-4-4 9z" fill="#e0b030"/></g>`),
drag:S(`<path d="M10 48c-2-14 14-12 14-24s-6-12-6-12" ${N} stroke-width="11"/><path d="M10 48c-2-14 14-12 14-24s-6-12-6-12" ${N} stroke="#3fae78" stroke-width="7"/><path d="M24 26c4 14-12 14-8 26 3 8 18 6 22-4" ${N} stroke-width="11"/><path d="M24 26c4 14-12 14-8 26 3 8 18 6 22-4" ${N} stroke="#3fae78" stroke-width="7"/><path d="M12 8l12 2 8 6-6 6-12-4z" fill="#3fae78"/><circle cx="22" cy="14" r="2" fill="#f6d84a"/><path d="M14 6l-5-3 2 6" ${N}/>`),
gear:S(`<path d="M28 4h8l1 7 5 2 6-4 6 6-4 6 2 5 7 1v8l-7 1-2 5 4 6-6 6-6-4-5 2-1 7h-8l-1-7-5-2-6 4-6-6 4-6-2-5-7-1v-8l7-1 2-5-4-6 6-6 6 4 5-2z" fill="#a9afb8"/><circle cx="32" cy="32" r="9" fill="#e9ebef"/>`),
oil:S(`<path d="M12 27h28v27a4 4 0 01-4 4H16a4 4 0 01-4-4z" fill="#c9372c"/><path d="M38 33l15-15 5 5-14 14z" fill="#9aa0a8"/><rect x="20" y="19" width="12" height="8" fill="#9aa0a8"/><path d="M18 40h16" ${N} stroke="#f4ecd0" stroke-width="3"/><path d="M58 28c-4 6-4 8 0 9s4-4 0-9z" fill="#e8b020"/>`),
screw:S(`<g transform="rotate(30 32 32)"><rect x="21" y="3" width="22" height="10" rx="3" fill="#bfc3ca"/><path d="M27 8h10" ${N}/><path d="M26 13h12v38l-6 9-6-9z" fill="#aab0b8"/><path d="M26 20h12M26 26h12M26 32h12M26 38h12M26 44h12" ${N} stroke-width="1.4"/></g>`),
film:S(`<rect x="3" y="13" width="58" height="38" fill="#26262c"/>${rep(3,i=>`<rect x="${8+i*18}" y="23" width="14" height="18" fill="#8fb5d0"/>`)}${rep(6,i=>`<rect x="${6+i*9.5}" y="16" width="4" height="3.5" fill="#f4ecd0" stroke="none"/><rect x="${6+i*9.5}" y="44.5" width="4" height="3.5" fill="#f4ecd0" stroke="none"/>`)}`),
cleaner:S(`<rect x="17" y="26" width="26" height="33" rx="5" fill="#4ab0d8"/><rect x="23" y="14" width="14" height="12" fill="#e8ecf0"/><path d="M35 17h15l3 5H35z" fill="#e8ecf0"/><rect x="21" y="36" width="18" height="11" fill="#f4f8fb"/><path d="M55 14l5-3M56 20h6" ${N} stroke-width="1.8"/>`),
cap:S(`<rect x="16" y="6" width="32" height="38" rx="5" fill="#2a5aa8"/><rect x="38" y="6" width="10" height="38" rx="3" fill="#c9d3e0"/><path d="M25 44v16M39 44v16" ${N} stroke-width="3"/><path d="M43 12v6M40 15h6" ${N} stroke-width="1.6"/><path d="M22 14h8M22 20h8" ${N} stroke="#c9d3e0"/>`),
wire:S(`<ellipse cx="30" cy="34" rx="24" ry="20" ${N} stroke-width="13"/><ellipse cx="30" cy="34" rx="24" ry="20" ${N} stroke="#c8782f" stroke-width="9"/><ellipse cx="30" cy="34" rx="24" ry="20" ${N} stroke="#f0a860" stroke-width="2" stroke-dasharray="3 3"/><path d="M50 46c4 6 5 9 9 12" ${N} stroke="${O}" stroke-width="6"/><path d="M50 46c4 6 5 9 9 12" ${N} stroke="#c8782f" stroke-width="3"/>`),
part:S(`<rect x="14" y="14" width="36" height="36" rx="3" fill="#2f3138"/><circle cx="21" cy="21" r="2.2" fill="#aab0b8" stroke="none"/><path d="M22 34h20M22 40h14" ${N} stroke="#8a8e96" stroke-width="1.6"/>${rep(5,i=>`<path d="M${19+i*7} 14v-9M${19+i*7} 50v9" ${N} stroke-width="3" stroke="#b9bcc4"/>`)}`),
cloth:S(`<rect x="7" y="12" width="50" height="38" rx="3" fill="#cf4b5e"/><path d="M7 25h50M7 37h50M20 12v38M32 12v38M44 12v38" ${N} stroke="#f4b6c0" stroke-width="2"/><path d="M7 50l9 8h40l-9-8z" fill="#a83a4a"/>`),
thread:S(`<rect x="13" y="6" width="38" height="9" rx="2" fill="#d9b27a"/><rect x="13" y="49" width="38" height="9" rx="2" fill="#d9b27a"/><rect x="18" y="15" width="28" height="34" fill="#3b7bd0"/><path d="M18 22h28M18 29h28M18 36h28M18 43h28" ${N} stroke="#7aa8ee" stroke-width="1.5"/><path d="M46 28c8 0 10 6 10 12" ${N} stroke="#3b7bd0" stroke-width="2"/>`),
cotton:S(`<path d="M13 44c-9 0-11-13-2-15 0-9 13-13 19-6 9-4 17 4 13 11 9 2 7 13-2 13z" fill="#fbfbf6"/><path d="M22 46l10 9 10-9z" fill="#6a9a4a"/><circle cx="26" cy="35" r="1.6" fill="#c9b99a" stroke="none"/>`),
metal:S(`<path d="M16 24l8-10h32l-8 10z" fill="#e3e8ee"/><path d="M8 24h40v26H8z" fill="#aab2bd"/><path d="M48 24l8-10v26l-8 10z" fill="#8f98a4"/><path d="M13 31h30" ${N} stroke="#eef1f5" stroke-width="2.5"/><path d="M13 42h30" ${N} stroke="#8f98a4" stroke-width="1.5"/>`),
gem:S(`<path d="M17 9h30l13 15-28 35L4 24z" fill="#5bc4ec"/><path d="M4 24h56M17 9l9 15 6-15 6 15 9-15M26 24l6 35 6-35" ${N} stroke-width="1.4"/>`),
polish:S(`<path d="M24 20h16v8l7 7v22a3 3 0 01-3 3H20a3 3 0 01-3-3V35l7-7z" fill="#f0c43a"/><rect x="25" y="9" width="14" height="11" fill="#e8ecf0"/><rect x="21" y="39" width="22" height="13" fill="#fff6d0"/><path d="M54 6l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="#fff2a0" stroke-width="1.5"/>`),
string:S(`<circle cx="30" cy="32" r="21" ${N} stroke-width="8"/><circle cx="30" cy="32" r="21" ${N} stroke="#d6d9de" stroke-width="4"/><circle cx="30" cy="32" r="12" ${N} stroke-width="5"/><circle cx="30" cy="32" r="12" ${N} stroke="#d6d9de" stroke-width="2.5"/><path d="M47 47l10 8" ${N}/><circle cx="58" cy="56" r="3.6" fill="#caa040"/>`),
wood:S(`<rect x="5" y="17" width="40" height="32" rx="4" fill="#a8693a"/><path d="M10 24h30M10 33h30M10 42h26" ${N} stroke="#c99060" stroke-width="1.6"/><ellipse cx="46" cy="33" rx="13" ry="16" fill="#d9a468"/><ellipse cx="46" cy="33" rx="8" ry="10" ${N} stroke="#a8693a"/><ellipse cx="46" cy="33" rx="3" ry="4" ${N} stroke="#a8693a"/>`),
battery:S(`<rect x="21" y="11" width="22" height="47" rx="3" fill="#2f8a4a"/><rect x="26" y="5" width="12" height="7" fill="#c9ccd2"/><rect x="21" y="11" width="22" height="14" fill="#2f3138"/><path d="M32 33v12M26 39h12" ${N} stroke="#f4ecd0" stroke-width="3"/>`),
screen:S(`<rect x="5" y="10" width="54" height="36" rx="3" fill="#2b2d33"/><rect x="9" y="14" width="46" height="28" fill="#58b4e8"/><path d="M9 14l20 28M24 14l20 28" ${N} stroke="#bfe3f7" stroke-width="3.5" stroke-opacity=".6"/><rect x="26" y="46" width="12" height="13" fill="#e0a838"/><path d="M29 50h6M29 54h6" ${N} stroke-width="1.2"/>`),
glue:S(`<path d="M12 20h34l9 10-9 10H12z" fill="#f4f4ee"/><rect x="2" y="20" width="11" height="20" rx="2" fill="#e8d84a"/><path d="M20 20v20M30 20v20" ${N} stroke="#d9363e" stroke-width="3"/><path d="M55 30h6" ${N} stroke-width="3"/><circle cx="62" cy="30" r="1.4" fill="#f4f4ee" stroke="none"/>`),
leather:S(`<path d="M9 15c10-7 15 2 23-4 8-5 18 2 22 10l-6 12 4 14c-8 9-20 4-26 9-8 3-16-5-14-13l-4-12z" fill="#8a4a24"/><path d="M16 23c8-5 14 0 22-4M18 44c8 3 14-2 22 2" ${N} stroke="#e8c88a" stroke-width="1.8" stroke-dasharray="3 3"/>`),
glass:S(`<path d="M30 8l22 40H8z" fill="#cfeaf6" fill-opacity=".9"/><path d="M30 18l12 22H18z" ${N} stroke="#fff" stroke-width="2"/><path d="M52 30l10-3M53 36l9 0M52 42l9 4" ${N} stroke="#e8453c" stroke-width="2"/><path d="M52 33l10 2" ${N} stroke="#f2c230" stroke-width="2"/><path d="M0 24l12 8" ${N} stroke="#fff" stroke-width="2.5"/>`),
brass:S(`<path d="M20 20l5-8h14l5 8v8H20z" fill="#e0b84a"/><path d="M8 34l6-8h18l6 8v9H8z" fill="#d6a432"/><path d="M26 34l6-8h18l6 8v9H26z" fill="#e8c05a"/><path d="M8 52l6-8h36l6 8v7H8z" fill="#cc9a2a"/><path d="M13 31h12M31 31h12" ${N} stroke="#fff3b0" stroke-width="2"/>`),
lacquer:S(`<path d="M12 28h34v23a6 6 0 01-6 6H18a6 6 0 01-6-6z" fill="#b5242c"/><ellipse cx="29" cy="28" rx="17" ry="5" fill="#d9363e"/><g transform="rotate(30 50 16)"><rect x="47" y="1" width="6" height="23" fill="#9a6a3a"/><path d="M46 24h8l-1 11h-6z" fill="#d9363e"/></g>`),
silk:S(`<path d="M5 22c10-11 18 11 28 0s18 11 26 0v19c-8 11-16-11-26 0S15 52 5 41z" fill="#8a4ad0"/><path d="M5 31c10-11 18 11 28 0s18 11 26 0" ${N} stroke="#e8c3ff" stroke-width="2"/>`),
clay:S(`<path d="M6 46c-2-16 8-32 26-32s28 16 26 32c-2 9-50 9-52 0z" fill="#b8643a"/><path d="M19 30h9M36 24h9M27 41h12" ${N} stroke="#e0956a" stroke-width="2"/>`),
ink:S(`<path d="M13 28h38v23a6 6 0 01-6 6H19a6 6 0 01-6-6z" fill="#2a2a34"/><ellipse cx="32" cy="28" rx="19" ry="6" fill="#4a4a58"/><ellipse cx="32" cy="28" rx="13" ry="3.5" fill="#15151a"/><path d="M55 4L39 27" ${N} stroke="#8a5a2a" stroke-width="3.5"/><path d="M39 27l-4 5 6-3z" fill="#15151a"/>`),
goldleaf:S(`<path d="M5 38l27-12 27 12-27 12z" fill="#e8bd3a"/><path d="M5 45l27 12 27-12" ${N} stroke-width="2"/><path d="M5 38v7M59 38v7" ${N}/><path d="M16 38l16-7 14 6" ${N} stroke="#fff3b0" stroke-width="2"/><path d="M50 8l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#fff2a0" stroke-width="1.5"/>`)};

const EF='<defs><filter id="e" filterUnits="userSpaceOnUse" x="0" y="0" width="64" height="64" color-interpolation-filters="sRGB"><feOffset in="SourceAlpha" dx="-2" dy="-3" result="b"/><feComposite in="SourceAlpha" in2="b" operator="out" result="d"/><feFlood flood-color="#2a1000" flood-opacity=".28"/><feComposite in2="d" operator="in" result="D"/><feOffset in="SourceAlpha" dx="1.6" dy="2.4" result="a"/><feComposite in="SourceAlpha" in2="a" operator="out" result="h"/><feFlood flood-color="#fff" flood-opacity=".55"/><feComposite in2="h" operator="in" result="H"/><feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="g"/><feSpecularLighting in="g" surfaceScale="3" specularConstant=".5" specularExponent="18" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="55"/></feSpecularLighting><feComposite in="sp" in2="SourceAlpha" operator="in" result="S"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="D"/><feMergeNode in="S"/></feMerge></filter></defs>';
for(const k in SVGI)SVGI[k]=SVGI[k].replace(/(<svg[^>]*>)([\s\S]*)<\/svg>/,(m,a,b)=>a+EF+'<ellipse cx="32" cy="61.5" rx="20" ry="2.6" fill="#000" opacity=".22" stroke="none"/><g filter="url(#e)">'+b+'</g></svg>');
const ICN=["watch", "camera", "radio", "teddy", "ring", "guitar", "phone", "vase", "violin", "gameboy", "typew", "clock", "lamp", "book", "jade", "coin", "vinyl", "globe", "telesc", "fan", "sword", "teapot", "mask", "chess", "crown", "oilp", "statue", "trunk", "bike", "sax", "pend", "sam", "clois", "scep", "drag", "gear", "oil", "screw", "film", "cleaner", "cap", "wire", "part", "cloth", "thread", "cotton", "metal", "gem", "polish", "string", "wood", "battery", "screen", "glue", "leather", "glass", "brass", "lacquer", "silk", "clay", "ink", "goldleaf"],VIM=new Map(),VI=e=>{const c=e.codePointAt(0)-0xE000;if(c<0||c>=ICN.length)return UX(e);let m=VIM.get(c);if(!m){m=new Image();m.src='data:image/svg+xml;utf8,'+encodeURIComponent(SVGI[ICN[c]]);VIM.set(c,m)}return m};ICN.forEach((k,c)=>VI(String.fromCodePoint(0xE000+c)));
const BM={
dot:'..2222../.211132./21111112/21111112/21111112/21111112/.211112./..2222..',
sq:'22222222/21111112/21311112/21111112/21111112/21111112/21111112/22222222',
gem:'......../.222222./21331112/21111112/.211112./..2112../...22.../........',
star:'...22.../..2112../22211222/21113112/.211112./.211112./.21..12./.2....2.',
heart:'......../.22..22./21132112/21111112/.211112./..2112../...22.../........',
check:'......../......22/.....211/2...211./211211../.2111.../..21..../...2....',
cross:'2......2/21....12/.21..12./..2112../..2112../.21..12./21....12/2......2',
warn:'...22.../..2112../..2112../.211112./.212112./22111122/21112112/22222222',
lock:'..2222../.2....2./.2....2./22222222/21111112/21132112/21112112/22222222',
arrow:'....2.../....22../2222112./21111112/2222112./....22../....2.../........',
gear:'...22.../2.2112.2/.211112./21122112/21122112/.211112./2.2112.2/...22...',
tool:'....2222/...21112/...2112./..2112../.2112.../2112..../2112..../.22.....',
mag:'..2222../.211112./21311112/21111112/21111112/.2111122/..222.21/......22',
box:'22222222/21111112/22222222/21111112/21141112/21111112/21111112/22222222',
house:'...22.../..2112../.211112./21111112/21144112/21144112/21144112/22222222',
door:'.222222./.211112./.211112./.211312./.211112./.211412./.211112./22222222',
book:'22222222/21111112/21333312/21111112/21333312/21111112/21111112/22222222',
paper:'.222222./.211112./.233332./.211112./.233332./.211112./.233332./.222222.',
cal:'22222222/24444442/22222222/21111112/21212112/21111112/21121212/22222222',
clock:'..2222../.211112./21112112/21112112/21112212/21111112/.211112./..2222..',
chart:'2......./2.....22/2..22.22/2..22.22/2.222222/2.222222/22222222/........',
bag:'..2222../..2..2../22222222/21111112/21141112/21111112/21111112/22222222',
key:'.222..../21112.../21112222/.222..2./.....22./.....2../.....22./........',
bottle:'...22.../...22.../..2112../.211112./.211112./.213112./.211112./..2222..',
cup:'......../22222222/21111212/21111212/21111222/.211112./..2222../........',
spool:'.222222./.211112./..2222../..2112../..2112../..2222../.211112./.222222.',
cat:'2......2/221..122/21111112/21211212/21111112/21141112/.211112./..2222..',
fin:'....2.../...22.../..212.../.21112../2111112./22222222/......../........',
smile:'..2222../.211112./21211212/21111112/22111122/.222222./..2222../........',
angry:'..2222../.211112./22111122/21211212/21111112/.222222./..2222../........',
sad:'..2222../.211112./21211212/21111112/.222222./22111122/..2222../........',
note:'...2222./...2112./...2..2./...2..2./.222.222/.2112211/.222.222/........',
spk:'....2.../...22.2./2222.2.2/2112..2./2112..2./2222.2.2/...22.2./....2...',
drop:'...2..../..212.../..212.../.21112../2111112./2111112./.21112../..222...',
cloud:'..222.../.21112../2211122./21111112/22222222/......../......../........',
bolt:'....222./...2112./..2112../.211112./...2112./..2112../.2112.../.22.....',
crown:'2..22..2/21222212/21111112/21131112/21111112/22222222/......../........',
vase:'..2222../...22.../..2112../.211112./21111112/21131112/.211112./..2222..',
cam:'..222.../22222222/21111112/21122112/21122112/21111112/22222222/........',
phone:'.222222./.211112./.233332./.233332./.233332./.211112./.214412./.222222.',
man:'..2222../.211112./.212212./..2112../.222222./21111112/21111112/.22..22.',
bus:'......../22222222/21311312/21311312/21111112/22222222/2.2..2.2/.22..22.',
shield:'22222222/21111112/21111112/21131112/.211112./.211112./..2112../...22...',
plant:'..2.2.../.21212../..212.../...2..../.222222./.211112./..2112../..2222..'};

/* ===== Bộ icon vẽ nét cho giao diện (tab, tiêu đề, dụng cụ...), mỗi biểu tượng một hình riêng ===== */
const UIV={},UXM=new Map(),A=(k,b)=>k.split(' ').forEach(e=>UIV[e]=b);
const SV=b=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke="#2a1a0c" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">'+b+'</svg>';
const LN=(d,c,w)=>`<path d="${d}" stroke="#2a1a0c" stroke-width="${w+2.2}" fill="none"/><path d="${d}" stroke="${c}" stroke-width="${w}" fill="none"/>`;
function UX(e){const k=e.replace(/\uFE0F/g,'');if(!UIV[k])return null;let m=UXM.get(k);if(!m){m=new Image();m.src='data:image/svg+xml;utf8,'+encodeURIComponent(SV(UIV[k]));UXM.set(k,m)}return m}
A('🏪','<path d="M4 12l3-7h18l3 7z" fill="#c8452f"/><path d="M10 5l-1 7M16 5v7M22 5l1 7" fill="none"/><path d="M4 12h24v3H4z" fill="#f4e3b8"/><path d="M6 15v13h20V15" fill="#e8c88a"/><rect x="13" y="19" width="6" height="9" fill="#8a5a2a"/><rect x="8" y="18" width="4" height="4" fill="#9fd3ee"/><rect x="20" y="18" width="4" height="4" fill="#9fd3ee"/>');
A('📦','<path d="M4 10l12-5 12 5-12 5z" fill="#ecc27a"/><path d="M4 10v14l12 5V15z" fill="#c68a42"/><path d="M28 10v14l-12 5V15z" fill="#a8702f"/><path d="M10 7.5l12 5" fill="none"/>');
A('🛠',LN('M7 26L20 13','#a8702f',3)+LN('M25 26L12 13','#9aa5b0',3)+'<rect x="17" y="5" width="10" height="6" rx="1.5" transform="rotate(45 22 8)" fill="#9aa5b0"/><circle cx="9" cy="9" r="5" fill="#cfd6dd"/><circle cx="9" cy="9" r="1.8" fill="#fff1d0"/>');
A('🏬','<rect x="4" y="4" width="24" height="25" rx="1.5" fill="#d9a55a"/><path d="M4 13h24M4 21h24" fill="none"/><rect x="7" y="6" width="5" height="6" fill="#c8452f"/><rect x="14" y="7" width="4" height="5" fill="#4a8ac8"/><circle cx="23" cy="9.5" r="2.6" fill="#f2c230"/><rect x="7" y="15" width="6" height="5" fill="#9aa5b0"/><circle cx="18" cy="17.5" r="2.7" fill="#b87333"/><rect x="22" y="15" width="4" height="5" fill="#4a9a4a"/><rect x="6" y="23" width="7" height="5" fill="#f4e3b8"/><circle cx="19" cy="25" r="2.5" fill="#ece4d0"/>');
A('⭐ 🌟','<path d="M16 3l3.8 8 8.7 1.1-6.4 6 1.7 8.7L16 22.5l-7.8 4.3 1.7-8.7-6.4-6 8.7-1.1z" fill="#f2c230"/><path d="M16 8l2 4.6" stroke="#fff6d8" fill="none"/>');
A('📈 📊','<rect x="3" y="4" width="26" height="24" rx="2" fill="#fff1d0"/><path d="M7 7v18h19" stroke-width="1.2" fill="none"/><path d="M9 22l5-6 4 3 7-9" stroke="#4a9a4a" stroke-width="2.6" fill="none"/><path d="M20 10h5v5" stroke="#4a9a4a" stroke-width="2.6" fill="none"/>');
A('🏗','<rect x="4" y="21" width="12" height="8" fill="#e4b86a"/><path d="M7 24h2M11 24h2" fill="none"/>'+LN('M23 29V6','#f2a62c',3)+LN('M11 7h19','#f2a62c',3)+'<path d="M13 7v8" stroke-width="1.2" fill="none"/><rect x="10.5" y="15" width="5" height="4" fill="#c8452f"/>');
A('📒','<path d="M7 4h17a2 2 0 0 1 2 2v21a2 2 0 0 1-2 2H7z" fill="#a04a3a"/><rect x="10" y="4" width="2" height="25" fill="#7a3428" stroke="none"/><rect x="14" y="9" width="9" height="6" fill="#f4e3b8"/><path d="M21 4v10l-2-2-2 2V4" fill="#f2c230"/>');
A('💰','<path d="M12 7l-2-3 4 1 2-2 2 2 4-1-2 3c5 4 7 8 7 13 0 4-4 6-11 6S5 24 5 20c0-5 2-9 7-13z" fill="#c8963a"/><path d="M16 13v11M19 15c-1-2.200-6-2-6 .5s6 2 6 5-5 3-6 1" stroke="#fff1d0" fill="none"/>');
A('📅 🗓','<rect x="4" y="6" width="24" height="22" rx="2" fill="#fff6e4"/><rect x="4" y="6" width="24" height="7" rx="2" fill="#c8452f"/><path d="M10 3v6M22 3v6" fill="none"/><path d="M9 18h3M15 18h3M21 18h3M9 23h3M15 23h3" stroke-width="2" fill="none"/>');
A('🕐 🕰 ⏰','<circle cx="16" cy="16" r="12" fill="#fff6e4"/><path d="M16 5v2M16 25v2M5 16h2M25 16h2" fill="none"/><path d="M16 9v7l5 3" fill="none" stroke-width="2"/>');
A('⚙',[0,45,90,135].map(a=>`<rect x="13" y="2.500" width="6" height="27" rx="1" transform="rotate(${a} 16 16)" fill="#aeb6c0"/>`).join('')+'<circle cx="16" cy="16" r="9" fill="#aeb6c0"/><circle cx="16" cy="16" r="4" fill="#fff1d0"/>');
A('🏚','<path d="M4 15L16 4l12 11z" fill="#c8452f"/><rect x="7" y="15" width="18" height="13" fill="#e0b97a"/><rect x="13" y="20" width="6" height="8" fill="#8a5a2a"/><path d="M22 15l-2 4 3 2-2 4" fill="none" stroke-width="1.2"/>');
A('🏺','<path d="M11 4h10l-1 4c5 2 7 7 6 12-1 5-5 8-10 8s-9-3-10-8c-1-5 1-10 6-12z" fill="#c8693a"/><path d="M7 15h18M8 21h16" stroke="#f4e3b8" fill="none"/>');
A('🔧',LN('M8 26L20 14','#9aa5b0',4)+'<circle cx="23" cy="9" r="6" fill="#cfd6dd"/><path d="M21 3l2 5 5-2" fill="#fff1d0" stroke-width="1.4"/>');
A('🪛','<rect x="18" y="3" width="9" height="13" rx="3" transform="rotate(45 22.500 9.500)" fill="#e0572c"/>'+LN('M17 15L7 25','#aeb6c0',2.6)+'<path d="M7 25l-3 3" fill="none"/>');
A('🔨',LN('M9 27L21 15','#a8702f',3.4)+'<rect x="15" y="4" width="15" height="8" rx="1.500" transform="rotate(45 22.500 8)" fill="#9aa5b0"/>');
A('🔎 🔍','<circle cx="13" cy="13" r="9" fill="#bfe6ff"/><path d="M8 11a6 6 0 0 1 5-4" stroke="#fff" fill="none"/>'+LN('M20 20l8 8','#8a5a2a',4));
A('🔬','<rect x="11" y="3" width="7" height="15" rx="2" transform="rotate(20 14.500 10)" fill="#aeb6c0"/><path d="M5 28h22" fill="none"/><path d="M22 26c4 0 5-9-1-13" fill="none" stroke-width="2.200"/><rect x="9" y="21" width="12" height="4" fill="#cfd6dd"/>');
A('🔥','<path d="M16 3c1 5 8 8 8 16a8 8 0 0 1-16 0c0-4 2-6 3-8 1 2 2 3 3 3 0-4 0-7 2-11z" fill="#f08a3a"/><path d="M16 15c1 3 4 4 4 8a4 4 0 0 1-8 0c0-3 3-4 4-8z" fill="#f2c230"/>');
A('🧽','<rect x="4" y="9" width="24" height="16" rx="3" fill="#f2c230"/><rect x="4" y="20" width="24" height="5" rx="2" fill="#4a9a4a"/><circle cx="10" cy="13" r="1.400" fill="#d8a020"/><circle cx="18" cy="15" r="1.200" fill="#d8a020"/><circle cx="23" cy="12" r="1.500" fill="#d8a020"/>');
A('🧰','<rect x="3" y="11" width="26" height="17" rx="2" fill="#c8452f"/><path d="M11 11V7h10v4" fill="none"/><rect x="3" y="17" width="26" height="3" fill="#9a2f20"/><rect x="14" y="16" width="4" height="6" fill="#f2c230"/>');
A('🎁','<rect x="5" y="13" width="22" height="15" fill="#e0572c"/><rect x="3" y="9" width="26" height="5" fill="#f08a3a"/><rect x="14" y="9" width="4" height="19" fill="#f2c230"/><path d="M16 9c-6-6-9 0-2 0M16 9c6-6 9 0 2 0" fill="none"/>');
A('📥','<path d="M5 19v8h22v-8" fill="#d9a55a"/><path d="M16 4v15M10 13l6 6 6-6" stroke="#4a8ac8" stroke-width="3" fill="none"/>');
A('📤','<path d="M5 19v8h22v-8" fill="#d9a55a"/><path d="M16 19V4M10 10l6-6 6 6" stroke="#c8452f" stroke-width="3" fill="none"/>');
A('💾','<path d="M5 5h19l3 3v19H5z" fill="#4a6ec8"/><rect x="9" y="5" width="12" height="8" fill="#e8e0d0"/><rect x="9" y="18" width="14" height="9" fill="#f4e3b8"/><rect x="17" y="7" width="2" height="4" fill="#2a1a0c"/>');
A('🔒','<rect x="6" y="14" width="20" height="14" rx="2" fill="#f2c230"/><path d="M10 14v-4a6 6 0 0 1 12 0v4" fill="none" stroke-width="2.400"/><circle cx="16" cy="21" r="2" fill="#2a1a0c"/>');
A('🔓','<rect x="6" y="14" width="20" height="14" rx="2" fill="#f2c230"/><path d="M10 14v-4a6 6 0 0 1 11-3" fill="none" stroke-width="2.400"/><circle cx="16" cy="21" r="2" fill="#2a1a0c"/>');
A('✅ ✔','<circle cx="16" cy="16" r="12" fill="#4a9a4a"/><path d="M9 16l5 5 9-10" stroke="#fff6d8" stroke-width="3.200" fill="none"/>');
A('⚠','<path d="M16 4L29 27H3z" fill="#f2c230"/><path d="M16 12v8" stroke-width="2.600" fill="none"/><circle cx="16" cy="23.500" r="1.500" fill="#2a1a0c"/>');
A('🚪','<rect x="7" y="3" width="18" height="26" fill="#a8702f"/><rect x="10" y="6" width="12" height="9" fill="#9fd3ee"/><rect x="10" y="18" width="12" height="8" fill="#8a5a2a"/><circle cx="21" cy="17" r="1.400" fill="#f2c230"/>');
A('🪟','<rect x="5" y="4" width="22" height="24" fill="#9fd3ee"/><path d="M16 4v24M5 16h22" fill="none" stroke-width="2"/>');
A('🛡','<path d="M16 3l11 4v9c0 7-5 11-11 13C10 27 5 23 5 16V7z" fill="#4a7ac8"/><path d="M16 8v17M9 14h14" stroke="#bfe6ff" fill="none"/>');
A('🚌','<rect x="3" y="8" width="26" height="16" rx="3" fill="#4a7ac8"/><rect x="6" y="11" width="8" height="6" fill="#bfe6ff"/><rect x="16" y="11" width="8" height="6" fill="#bfe6ff"/><circle cx="9" cy="25" r="3" fill="#555"/><circle cx="23" cy="25" r="3" fill="#555"/>');
A('🔑','<circle cx="9" cy="11" r="5.500" fill="#f2c230"/><circle cx="9" cy="11" r="1.800" fill="#fff1d0"/>'+LN('M13 15l14 12','#f2c230',3.400)+'<path d="M23 24l3-3" fill="none"/>');
A('💼','<rect x="3" y="10" width="26" height="17" rx="2" fill="#8a5a2a"/><path d="M11 10V6h10v4" fill="none"/><rect x="3" y="17" width="26" height="2" fill="#5a3a1a"/><rect x="14" y="16" width="4" height="5" fill="#f2c230"/>');
A('🏆','<path d="M9 4h14v8a7 7 0 0 1-14 0z" fill="#f2c230"/><path d="M9 7H4c0 6 3 8 6 8M23 7h5c0 6-3 8-6 8" fill="none"/><rect x="14" y="19" width="4" height="5" fill="#d8a020"/><rect x="9" y="24" width="14" height="4" fill="#8a5a2a"/>');
A('👑','<path d="M4 24L3 9l8 6 5-9 5 9 8-6-1 15z" fill="#f2c230"/><rect x="4" y="24" width="24" height="4" fill="#d8a020"/><circle cx="16" cy="6" r="2" fill="#c8452f"/>');
A('🧾','<path d="M7 3h18v26l-3-2-3 2-3-2-3 2-3-2-3 2z" fill="#fff6e4"/><path d="M11 9h10M11 14h10M11 19h6" fill="none"/>');
A('🍵','<path d="M5 12h20v6a9 9 0 0 1-9 9h-2a9 9 0 0 1-9-9z" fill="#e8f0e8"/><path d="M25 14h3a3 3 0 0 1 0 7h-4" fill="none"/><path d="M11 3c-2 3 2 4 0 7M17 3c-2 3 2 4 0 7" stroke-width="1.400" fill="none"/>');
A('📋','<rect x="6" y="5" width="20" height="24" rx="2" fill="#c8963a"/><rect x="9" y="9" width="14" height="17" fill="#fff6e4"/><rect x="12" y="3" width="8" height="5" rx="1" fill="#aeb6c0"/><path d="M12 14h8M12 18h8M12 22h5" stroke-width="1.200" fill="none"/>');
A('📝','<rect x="5" y="4" width="18" height="24" rx="2" fill="#fff6e4"/><path d="M9 10h10M9 15h10M9 20h6" stroke-width="1.200" fill="none"/><path d="M17 26l1-5 9-9 4 4-9 9z" fill="#f2c230"/>');
A('📖','<path d="M3 7c5-2 10-1 13 2 3-3 8-4 13-2v19c-5-2-10-1-13 2-3-3-8-4-13-2z" fill="#fff6e4"/><path d="M16 9v19" fill="none"/>');
A('📚','<rect x="4" y="19" width="24" height="8" fill="#4a8ac8"/><rect x="6" y="11" width="21" height="8" fill="#c8452f"/><rect x="8" y="4" width="18" height="7" fill="#4a9a4a"/>');
A('🏷','<path d="M3 15V5h10l16 16-10 10z" fill="#f2c230"/><circle cx="9" cy="10" r="2" fill="#fff1d0"/>');
A('⚖','<path d="M16 5v21M8 27h16M6 9h20" fill="none"/><path d="M6 9l-3 9h6zM26 9l-3 9h6z" fill="#f2c230"/>');
A('💎','<path d="M8 6h16l5 7-13 16L3 13z" fill="#5ab8e8"/><path d="M3 13h26M12 6l-3 7 7 16M20 6l3 7-7 16" stroke-width="1.200" fill="none"/>');
A('🏛','<path d="M3 12L16 4l13 8z" fill="#e8d8b0"/><rect x="6" y="14" width="4" height="11" fill="#f4ecd4"/><rect x="14" y="14" width="4" height="11" fill="#f4ecd4"/><rect x="22" y="14" width="4" height="11" fill="#f4ecd4"/><rect x="3" y="26" width="26" height="3" fill="#cdbb8e"/>');
A('✏','<path d="M5 27l2-7L22 5l5 5L12 25z" fill="#f2c230"/><path d="M5 27l2-7 5 5z" fill="#e8c9a0"/><path d="M20 7l5 5" fill="none"/>');
A('🔩','<path d="M10 4h12l3 4-3 4H10L7 8z" fill="#aeb6c0"/><rect x="13" y="12" width="6" height="16" fill="#cfd6dd"/><path d="M13 16h6M13 20h6M13 24h6" stroke-width="1.200" fill="none"/>');
A('📡','<path d="M5 12h6l12-6v20L11 20H5z" fill="#e0572c"/><rect x="5" y="12" width="6" height="8" fill="#f2c230"/><path d="M26 11c2 3 2 7 0 10" fill="none"/>');
A('🪑','<path d="M9 4h10l2 12H7z" fill="#c68a42"/><rect x="6" y="16" width="18" height="4" fill="#d9a55a"/><path d="M8 20l-1 9M22 20l1 9" fill="none"/>');
A('🛋','<rect x="5" y="9" width="22" height="10" rx="3" fill="#4a7ac8"/><rect x="3" y="14" width="26" height="9" rx="3" fill="#6a94d8"/><path d="M7 23v3M25 23v3" fill="none"/>');
A('🪧','<rect x="5" y="4" width="22" height="14" rx="2" fill="#e8c88a"/><path d="M16 18v10" stroke-width="3" fill="none"/><path d="M9 9h14M9 13h9" stroke-width="1.400" fill="none"/>');
A('🏪','<rect x="3" y="1.5" width="26" height="7" rx="1.5" fill="#7a2a1a"/><circle cx="11" cy="5" r="1.7" fill="#f2c230"/><circle cx="16" cy="5" r="1.7" fill="#f2c230"/><circle cx="21" cy="5" r="1.7" fill="#f2c230"/><path d="M3 9h26l-2 6H5z" fill="#c8452f"/><path d="M8 9L7 15M13 9l-1 6M19 9l1 6M24 9l1 6" stroke="#fff3d6" stroke-width="2.2" fill="none"/><rect x="5" y="15" width="22" height="13.5" fill="#e8c88a"/><rect x="13" y="18.500" width="6" height="10" fill="#8a5a2a"/><circle cx="17.500" cy="23.500" r=".9" fill="#f2c230" stroke="none"/><rect x="7" y="18" width="4.500" height="5" fill="#9fd3ee"/><rect x="20.500" y="18" width="4.500" height="5" fill="#9fd3ee"/><path d="M2 28.500h28" fill="none" stroke-width="2"/>');
A('📦','<path d="M2 13L16 4l14 9z" fill="#7a8aa0"/><path d="M7 11l9-5.500 9 5.500" stroke="#cfd6dd" stroke-width="1.100" fill="none"/><rect x="4" y="13" width="24" height="15.500" fill="#c9a46a"/><rect x="7.500" y="15.500" width="17" height="13" fill="#2a1a0c"/><rect x="10" y="22" width="6" height="6.500" fill="#c68a42"/><rect x="17" y="23.500" width="6" height="5" fill="#a8702f"/><rect x="12" y="18.500" width="5" height="3.500" fill="#d9a55a"/><rect x="7.500" y="15.500" width="17" height="4" fill="#9aa5b0"/><path d="M7.500 17.500h17" stroke-width="1" fill="none"/><path d="M2 28.500h28" fill="none" stroke-width="2"/>');
A('🛠','<rect x="21.500" y="2" width="4.500" height="10" fill="#b5523a"/><circle cx="24" cy="1.500" r="1.600" fill="#e8e8e8" stroke="none"/><path d="M3 14V8l8 6V8l8 6V8l9 6v0z" fill="#7a8aa0"/><rect x="4" y="14" width="24" height="14.500" fill="#d9a55a"/><circle cx="11" cy="21" r="5" fill="#9aa5b0"/><circle cx="11" cy="21" r="5" fill="none" stroke="#2a1a0c" stroke-width="2.400" stroke-dasharray="1.800 1.700"/><circle cx="11" cy="21" r="2" fill="#2a1a0c" stroke="none"/><rect x="19" y="18" width="7" height="10.500" fill="#8a5a2a"/><path d="M20.500 22h4M22.500 20v4" stroke="#cfd6dd" stroke-width="1.200" fill="none"/><path d="M2 28.500h28" fill="none" stroke-width="2"/>');
const MAP=`
check #4a9a4a|✅ ✔
cross #c83a3a|❌ 🚫 🗑 🔕 🔇 ⏹
warn #e0b020|⚠ ❓
warn #d04030|🚨 🔫
lock #caa040|🔒 🔓
gem #5ab8e8|💎 💍
gem #a060d0|🔮
gem #d06a9a|📿
star #f2c230|⭐ 🌟 ✨ ✦ 🎉 🎀
cup #f2c230|🏆
cup #c8c8d0|🍵 🫖
vase #c86a3a|🏺 🫙 🗿
tool #9aa0a8|🔧 🛠 🪛 🔩 🔨 🗡 🔱 ✏ 🖋 🪡 🔗
gear #8a8a90|⚙ 🌀
mag #6ab0e0|🔎 🔍 🔬 🔭 🔦 🧐
box #c8903a|📦 🧰 🎁 🧳 🪑 🛋 🧱 📥 📤 💾 🪧 🪵 🎞
house #c08050|🏠 🏚 🏬 🏪 🏛 🏗
door #8a5a2a|🚪 🪟
book #a04a3a|📒 📖 📚 📝 📋
book #c8a030|🎓 📜
paper #efe2b8|🧾 📃
cal #e8e0d0|📅 🗓
clock #e8e0d0|⏰ 🕐 🕰 ⌚
chart #4a9a4a|📈 📊
bag #8a5a30|💼
key #e0b020|🔑
bottle #5ab870|🧴
bottle #8a60d0|🧪
spool #d06a6a|🧵 🧶 🧣
cat #d0a060|🐈
cat #a06a3a|🧸
cat #c09050|🐕
cat #5ab050|🐉
fin #6a90b8|🦈
smile #f2c230|😊 😅 🎭
angry #e05a3a|😠 😡 💢 😱
sad #7ab0e0|😭 😢 💔
sad #c8c8c8|💀
note #5a8ad0|🎵 🎶 🎻 🎸 🎷
spk #8a8a90|🔊 📣 📡 📻
drop #4a90e0|💧 🚰
drop #f0802a|🔥
cloud #8a9ab0|☁ 🌧 ⛈
bolt #f2d020|⚡ 💡 🔋 🔌
crown #f2c230|👑
cam #6a6a78|📷 📹 🎬 🎨 🖼
phone #6a6a78|📱 📟 🎮 ⌨
man #c89060|🥷 🕵 💂 🏃 👋 💪 🗣 🤝 🥊 ♟ 🗿
bus #4a7ac0|🚌 🚲 🚔
shield #4a7ac0|🛡
plant #4aa050|🎄
dot #f2c230|💰 🪙 ☀ 🪔 🟡
dot #4a9a4a|🟢 💸
dot #8a5a30|🟤
dot #e8e0d0|⚪ ⚽ 🎲 🌙 🕐
dot #4a90d0|🌍 💬
dot #d04040|🎯 🏮
dot #f08a3a|🌅
dot #d8d0c0|📀
arrow #e8c860|➡ ▶ ⏭ ↩ 🔄 📤
sq #f0ead8|⬜ 🩹
sq #8a5a30|🟫
sq #c83a3a|🧧
sq #e8d8b0|🎀
sq #d0a060|🚰
`;
const SP={},EM=/(?:\p{Extended_Pictographic}|[\u23E9-\u23FF]|[\uE000-\uE07F])(?:\uFE0F|\u200D\p{Extended_Pictographic}\uFE0F?)*/gu,KEEP='★▲▼→↳';
const mk=(s,m,a)=>{const c=document.createElement('canvas');c.width=c.height=16;const x=c.getContext('2d'),p={1:m,2:'#2a1a0c',3:'#fff6d8',4:a||'#e8c860'};BM[s].split('/').forEach((r,j)=>[...r].forEach((h,i)=>{if(p[h]){x.fillStyle=p[h];x.fillRect(i*2,j*2,2,2)}}));return c};
MAP.trim().split('\n').forEach(l=>{const[k,es]=l.split('|'),[s,m]=k.trim().split(' ');es.trim().split(/\s+/).forEach(e=>{if(!SP[e])SP[e]=mk(s,m)})});
const FB=mk('sq','#b09a70'),key=e=>e.replace(/\uFE0F/g,''),spr=e=>VI(e)||SP[key(e)]||SP[[...key(e)][0]]||FB,urls=new Map(),url=e=>{const k=key(e);if(!urls.has(k))urls.set(k,(s=>s.src||s.toDataURL())(spr(e)));return urls.get(k)};
const hasE=t=>{EM.lastIndex=0;const r=EM.test(t);EM.lastIndex=0;return r&&[...t.matchAll(EM)].some(m=>!KEEP.includes(m[0]))};
document.head.insertAdjacentHTML('beforeend','<style>.ic.vi{image-rendering:auto;width:1.7em;height:1.7em;vertical-align:-.5em}.ic{width:1.3em;height:1.3em;image-rendering:pixelated;vertical-align:-.22em;display:inline-block;margin:0 .05em}</style>');
function fixText(n){const t=n.nodeValue;if(!hasE(t))return;const f=document.createDocumentFragment();let last=0;for(const m of t.matchAll(EM)){if(KEEP.includes(m[0]))continue;if(m.index>last)f.append(t.slice(last,m.index));const i=new Image();i.className='ic'+(VI(m[0])?' vi':'');i.alt='';i.src=url(m[0]);f.append(i);last=m.index+m[0].length}f.append(t.slice(last));n.replaceWith(f)}
function fix(r){if(r.nodeType==3){if(!/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/.test(r.parentNode.nodeName))fixText(r);return}if(/^(SCRIPT|STYLE|CANVAS|TEXTAREA)$/.test(r.nodeName))return;const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT),a=[];while(w.nextNode())a.push(w.currentNode);a.forEach(n=>{if(!/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/.test(n.parentNode.nodeName))fixText(n)})}
const ob=new MutationObserver(ms=>{ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.isConnected)fix(n)}));ob.takeRecords()});
ob.observe(document.body,{childList:true,subtree:true});fix(document.body);
/* canvas: vẽ hình pixel thay cho chữ emoji */
const ft=CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText=function(t,x,y,mw){t=String(t);if(!hasE(t))return ft.call(this,t,x,y,mw);const sz=parseFloat((this.font.match(/([\d.]+)px/)||[])[1])||12,al=this.textAlign,bl=this.textBaseline,parts=[];let last=0;for(const m of t.matchAll(EM)){if(m.index>last)parts.push([0,t.slice(last,m.index)]);parts.push([1,m[0]]);last=m.index+m[0].length}if(last<t.length)parts.push([0,t.slice(last)]);
this.textAlign='left';const W=p=>p[0]?sz*1.1:this.measureText(p[1]).width,tot=parts.reduce((a,p)=>a+W(p),0);let cx=al=='center'?x-tot/2:al=='right'||al=='end'?x-tot:x;const ty=bl=='middle'?y-sz/2:bl=='top'?y:bl=='bottom'?y-sz:y-sz*.84,sm=this.imageSmoothingEnabled;
parts.forEach(p=>{if(p[0]){this.imageSmoothingEnabled=!!VI(p[1]);this.drawImage(spr(p[1]),cx,ty,sz,sz);this.imageSmoothingEnabled=sm}else ft.call(this,p[1],cx,y);cx+=W(p)});this.textAlign=al};
[...(G.inv||[]),...(G.pawns||[]).map(p=>p.item),...(G.jobs||[]).map(j=>j.it)].forEach(i=>{if(i&&T[i.type])i.icon=T[i.type].i});
})();

