/** @jsx h */
import { h, useState, useEffect, useCallback } from "../deps.ts";

interface Message {
	text: string;
}

export default function Home() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [text, setText] = useState("")

	const getMessages = useCallback(async ()=>{
		const res = await fetch('https://deno-chat.deno.dev/messages');
		const data = await res.json();
		setMessages(data)
	},[])

	useEffect(()=>{
		getMessages()
	},[]);

	const onSendMessage = useCallback(async ()=>{
		await fetch('https://deno-chat.deno.dev/messages',{
			method: 'POST',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				text, 
			})
		});
		setText("");
		getMessages();
	}, [text])

	const removeMessage = useCallback(async (index)=>{
		await fetch('https://deno-chat.deno.dev/messages',{
			method: 'DELETE',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({
				index,
			})
		});
		setText("");
		getMessages();
	}, [text])

  return (
    <div>
			<ul>{messages.map((message, index)=>(
				<li>
					<button onClick={()=>removeMessage(index)}>Remove</button>
					&nbsp;
					{message.text}
				</li>
			))}
			</ul>
      <input type="text" value={text} onChange={(evt)=>setText(evt.target.value)} />
			<button onClick={onSendMessage}>Add</button>
    </div>
  );
}

