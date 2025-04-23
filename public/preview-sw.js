let currentHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Loading</title>
  <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
  <div class='flex h-screen w-screen items-center justify-center'>
      <span class='loading loading-spinner loading-xl text-primary'></span>
    </div>
</body>
</html>`;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('message', async e => {
  if (e.data?.type === 'UPDATE_PREVIEW') {
    currentHtml = e.data.html;
    const clients = (await self.clients.matchAll({ type: 'window' })).filter(client =>
      client.url.endsWith('/preview.html')
    );

    clients.forEach(client => {
      const clientUrl = new URL(client.url);
      if (clientUrl.pathname === '/preview.html') {
        client.navigate(client.url);
      }
    });
  }
});

self.addEventListener('fetch', e => {
  const { pathname } = new URL(e.request.url);
  if (pathname === '/preview.html') {
    e.respondWith(
      new Response(currentHtml, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      })
    );
  }
});
