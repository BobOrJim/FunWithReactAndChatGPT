import { Message } from "./App";
import { API_KEY } from "./myAPIKey";

type ApiRequestBody = {
  model: string;
  messages: Message[];
};

export const fetchChatGPT = async (messages: Message[]): Promise<Message> => {
  const apiRequestBody: ApiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: messages,
  };

  const response: Response = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    },
  );
  const data: any = await response.json();

  console.log("ApiRequestBody=", apiRequestBody);
  console.log("Data=", data);

  const newMessage: Message = {
    role: "assistant",
    content: data.choices[0].message.content,
  };
  return newMessage;
};
