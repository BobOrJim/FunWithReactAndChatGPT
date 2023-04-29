import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { fetchChatGPT } from "./chatGPT";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [systemMessage, setSystemMessage] = useState<Message>({
    role: "system",
    content: "Act as if your morgan freeman",
  });

  async function handleSendPrompt() {
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    //BUG: Raden ovan hinner inte köras, aka uppdata messages innan fetchChatGPT körs
    const newMessage = await fetchChatGPT([systemMessage, ...messages]);
    setMessages((prev) => [...prev, newMessage]);
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ marginBottom: "2rem" }}>Chat History</Typography>
        <Box
          sx={{
            width: "50%",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            border: "1px solid black",
          }}
        >
          {messages.map((response, index) => (
            <TextField
              sx={{
                marginTop: "1rem",
                width: "80%",
                alignSelf:
                  response.role == "assistant" ? "flex-start" : "flex-end",
                backgroundColor:
                  response.role == "user" ? "#e0e0e0" : "#b3e5fc",
              }}
              key={index}
              value={response.content}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            marginTop: "5rem",
          }}
        >
          <FormControl>
            <FormLabel>Prompt</FormLabel>
            <TextField
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button onClick={handleSendPrompt}>Submit</Button>
          </FormControl>

          <FormLabel>System instruction:</FormLabel>
          <TextField
            value={systemMessage.content}
            onChange={(e) =>
              setSystemMessage({ role: "system", content: e.target.value })
            }
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
