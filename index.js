addEventListener("fetch", (event) => {
	const response = new Response("Hello World 2.0!", {
		headers: { "content-type": "text/plain" },
	});
	event.respondWith(response);
})