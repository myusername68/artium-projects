export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = CLOUD_RUN_HOST;
    const headers = new Headers(request.headers);
    headers.set("X-Origin-Secret", ORIGIN_SECRET);
    return fetch(
      new Request(url, {
        method: request.method,
        headers: headers,
        body: request.body,
      })
    );
  },
};
