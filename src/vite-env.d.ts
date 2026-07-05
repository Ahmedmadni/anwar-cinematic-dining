/// <reference types="vite/client" />

// vite-imagetools single-output query imports return the URL string.
declare module "*&format=webp" {
  const src: string;
  export default src;
}
declare module "*&format=avif" {
  const src: string;
  export default src;
}
declare module "*&format=jpg" {
  const src: string;
  export default src;
}