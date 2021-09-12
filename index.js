import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from 'https://deno.land/x/cors/mod.ts';

const messages = [];

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Chat server!";
  })
  .get("/messages", (context) => {
    context.response.body = messages;
  })
  .post("/messages", async (context) => {
		const message = await context.request.body().value;
		messages.push(message);
    context.response.body = messages;
  })
  .delete("/messages", async (context) => {
		const res = await context.request.body().value;
		if(res.index != null && messages[res.index]){
			if(messages.length > 1)
				for(let i=res.index;i<messages.length-1;i++)
					messages[i] = messages[i+1];
			messages.length--;
		}
		
    context.response.body = messages;
  });

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());