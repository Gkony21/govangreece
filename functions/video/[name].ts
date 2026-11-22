// GET /video/<clip>.mp4: the clips in public/media, served in pieces. Safari on iPhone asks for a video in byte ranges
// and plays it only when the answer is 206 Partial Content, but Cloudflare Pages answers a range with the whole
// file (200). So the clips come through here, which cuts out the piece asked for.

type Context = {
  request: Request;
  env: { ASSETS: { fetch(input: string): Promise<Response> } };
  params: { name?: string | string[] };
};

export async function onRequest({ request, env, params }: Context): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  const name = String(params.name);
  if (!/^[a-z0-9-]+\.mp4$/.test(name)) return new Response("Not found", { status: 404 });

  const file = await env.ASSETS.fetch(new URL(`/media/${name}`, request.url).toString());
  if (!file.ok) return new Response("Not found", { status: 404 });
  const body = await file.arrayBuffer();
  const size = body.byteLength;

  const headers: Record<string, string> = {
    "Content-Type": "video/mp4",
    "Accept-Ranges": "bytes",
    // The clips change only with a new build, and then the page asks again anyway.
    "Cache-Control": "public, max-age=86400",
    "X-Content-Type-Options": "nosniff",
  };
  const etag = file.headers.get("ETag");
  if (etag) headers.ETag = etag;

  // bytes=start-end, bytes=start- or bytes=-last. Anything else gets the whole file.
  const range = request.headers.get("Range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (!range || (!range[1] && !range[2])) {
    return new Response(request.method === "HEAD" ? null : body, { headers: { ...headers, "Content-Length": String(size) } });
  }
  const start = range[1] ? Number(range[1]) : Math.max(size - Number(range[2]), 0);
  const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
  if (start > end) {
    return new Response(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${size}` } });
  }
  return new Response(request.method === "HEAD" ? null : body.slice(start, end + 1), {
    status: 206,
    headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
  });
}
