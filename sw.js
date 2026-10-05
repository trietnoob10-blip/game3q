// Service worker: ưu tiên tải bản mới nhất từ mạng, mất mạng thì dùng bản đã lưu. Không lưu video.
const V="3q-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","index.html","manifest.json","icon-192.png","icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=="GET"||u.origin!==location.origin||u.pathname.indexOf("/video/")>=0)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match("index.html"))))});
