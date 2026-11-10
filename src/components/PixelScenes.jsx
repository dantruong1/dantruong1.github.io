import React from 'react';

// Original vector sprites on an integer grid, rendered with crisp pixel edges.
const ink = '#625044', wood = '#ac805c', cream = '#f3dfbc', sage = '#8d9c70';
function Plant({ x = 0, y = 0 }) {
  return <g transform={`translate(${x} ${y})`}><path fill={sage} d="M8 2h4v8h6v4h-6v8H8V12H2V8h6z"/><path fill="#b4bf8e" d="M12 6h8v4h-8zM2 4h6v4H2z"/><path fill="#be8268" d="M4 20h14v4H6v12h10V24H4z"/><path fill="#93624f" d="M6 32h10v4H6z"/></g>;
}
function Books({ x = 0, y = 0 }) {
  return <g transform={`translate(${x} ${y})`}><path fill={sage} d="M0 4h8v28H0z"/><path fill="#bf826b" d="M10 0h8v32h-8z"/><path fill="#d4ad70" d="M20 8h10v24H20z"/><path fill={cream} d="M2 8h4v2H2zM12 4h4v2h-4zM22 12h6v2h-6zM2 26h4v2H2z"/></g>;
}
function Lamp({ x = 0, y = 0 }) {
  return <g transform={`translate(${x} ${y})`}><path className="sprite-lamp-glow" fill="#efcc80" d="M14 12h18l12 30H0z"/><path fill={ink} d="M22 10h4v34h14v4H10v-4h12z"/><path fill="#c59c65" d="M14 0h20v4h4v10H10V4h4z"/><path fill="#f1d49c" d="M14 10h20v4H14z"/></g>;
}
function OpenBook() {
  return <g className="sprite-book"><path fill={ink} d="M35 36h32l5 4 5-4h32v38H77l-5 4-5-4H35z"/><path fill={cream} d="M39 32h26l7 5 7-5h26v36H79l-7 5-7-5H39z"/><path fill="#d3bb96" d="M70 38h4v32h-4zM44 42h18v2H44zM44 48h20v2H44zM82 42h18v2H82zM82 48h18v2H82zM44 54h16v2H44zM82 54h14v2H82z"/></g>;
}
export function CardScene({ kind }) {
  return <svg className={`card-pixel-scene scene-${kind}`} viewBox="0 0 144 90" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <path className="sprite-ground" fill="#d6c7ae" d="M14 78h116v2H14z"/>
    {kind === 'about' && <><path fill="#d5bc96" d="M24 38h92v38H24z"/><path fill={ink} d="M20 34h100v6H20zM32 48h8v28h-8zM50 48h8v28h-8zM82 48h8v28h-8zM100 48h8v28h-8z"/><path fill="#be9470" d="M66 14h12v62H66zM62 10h20v6H62z"/><path fill={cream} d="M68 24h8v8h-8z"/><path className="sprite-flag" fill={sage} d="M78 10V2h18v8z"/></>}
    {kind === 'products' && <><path fill="#b5bc99" d="M25 46h66v28H25zM21 52h10v24H21zM85 52h10v24H85z"/><path fill="#d8ddc3" d="M32 40h24v22H32zM60 40h24v22H60z"/><path fill={ink} d="M28 74h6v5h-6zM82 74h6v5h-6z"/><Lamp x={95} y={28}/></>}
    {kind === 'wishlist' && <><path fill={wood} d="M26 73h94v5H26z"/><Books x={34} y={39}/><g className="sprite-gift"><path fill="#c79075" d="M74 48h32v25H74zM70 44h40v8H70z"/><path fill={cream} d="M87 44h6v29h-6zM79 36h8v4h6v-4h8v8H79z"/></g></>}
    {kind === 'recommendations' && <><Books x={24} y={44}/><OpenBook/><path className="sprite-bookmark" fill="#b77c63" d="M92 32h6v20l-3-3-3 3z"/></>}
    {kind === 'creations' && <><path fill={wood} d="M22 66h104v6H22zM28 72h4v8h-4zM116 72h4v8h-4z"/><path fill={ink} d="M34 27h57v35H34zM57 62h10v4H57z"/><path fill="#aab6a2" d="M38 31h49v27H38z"/><path fill="#f2e5ca" d="M44 38h20v3H44zM44 44h30v3H44z"/><path className="sprite-cursor" fill={ink} d="M44 50h4v4h-4z"/><Lamp x={91} y={18}/></>}
    {kind === 'quotes' && <><OpenBook/><g className="sprite-sprig"><Plant x={109} y={42}/></g></>}
  </svg>;
}
export function CafeScene({ isPlaying }) {
  return <svg className={`cafe-pixel-scene ${isPlaying ? 'is-playing' : ''}`} viewBox="0 0 240 110" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <path className="cafe-wall" fill="#e9dfcb" d="M0 0h240v110H0z"/>
    <path fill={wood} d="M16 10h98v69H16z"/><path className="cafe-sky" fill="#c7d5ca" d="M20 14h90v61H20z"/>
    <path className="cafe-moon" fill="#f5deb0" d="M87 22h10v4h4v10H87z"/>
    <path fill="#8a9a7b" d="M20 61h12v-8h12v12h14V53h14v8h16v-8h22v22H20z"/>
    <path fill={wood} d="M62 14h4v61h-4zM20 43h90v4H20zM12 75h106v5H12z"/>
    <Plant x={127} y={44}/><Books x={177} y={45}/>
    <path fill="#b48662" d="M0 84h240v8H0z"/><path fill="#8b664e" d="M0 92h240v18H0z"/>
    <path fill="#d0ae7b" d="M28 76h64v22H28z"/><path fill={ink} d="M34 79h37v15H34z"/>
    <g className="cafe-record"><path fill="#3f3833" d="M40 77h24v4h5v10h-5v4H40v-4h-5V81h5z"/><path fill="#b8a184" d="M47 81h10v10H47z"/><path fill="#e4c38c" d="M50 84h4v4h-4z"/><path fill="#817366" d="M40 81h4v3h-4z"/></g>
    <path fill="#e0cba5" d="M78 79h4v10h-4zM70 87h12v3H70z"/>
    <path fill={cream} d="M157 69h17v14h-17zM174 71h6v9h-6v-3h3v-3h-3zM153 84h26v3h-26z"/>
    <g className="cafe-steam" fill="#fff5dc"><path d="M160 56h3v4h-3zM163 50h3v5h-3zM169 54h3v6h-3z"/></g>
  </svg>;
}
export function FooterScene() {
  return <svg className="footer-pixel-scene" viewBox="0 0 320 100" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
    <path fill="#b2b894" d="M32 86h256v2H32z"/>
    <Plant x={57} y={50}/><Plant x={246} y={50}/>
    <path fill={wood} d="M109 55h88v6h-88zM109 64h88v6h-88zM105 74h96v6h-96z"/>
    <path fill={ink} d="M114 80h5v8h-5zM187 80h5v8h-5zM114 54h4v20h-4zM188 54h4v20h-4z"/>
    <path className="footer-lamp-glow" fill="#e8c77e" d="M223 26h12l24 60h-60z"/>
    <path fill={ink} d="M227 29h4v57h7v2h-18v-2h7zM219 14h20v4h-20zM223 10h12v4h-12zM219 18h3v14h-3zM236 18h3v14h-3zM219 32h20v3h-20z"/>
    <path className="footer-lamp-light" fill="#c9bea1" d="M222 18h14v14h-14z"/>
    <g className="footer-leaf" fill="#be9470"><path d="M88 38h6v3h-6zM94 35h3v3h-3z"/></g>
    <path fill="#bd9a70" d="M91 83h7v2h-7zM175 85h7v2h-7z"/>
  </svg>;
}
