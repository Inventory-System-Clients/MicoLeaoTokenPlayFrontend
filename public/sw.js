// Service worker minimo: so existe para o app cumprir o criterio de
// instalabilidade (PWA "Adicionar a tela inicial"). De proposito nao faz
// cache de nada - so repassa as requisicoes pra rede, pra nunca servir uma
// versao antiga do app depois de um deploy.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
