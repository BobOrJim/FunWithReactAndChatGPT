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

type Message = {
  text: string;
  isBot: boolean;
};

function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [systemInstructions, setSystemInstructions] = useState<string>(
    "Act as your talking to a dear friend who is mentally challanged",
  );

  async function handleSendPrompt() {
    setMessages((prev) => [...prev, { text: prompt, isBot: false }]);
    const response = await fetchChatGPT(prompt);
    setMessages((prev) => [...prev, { text: response, isBot: true }]);
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
                alignSelf: response.isBot ? "flex-start" : "flex-end",
                backgroundColor: response.isBot ? "#e0e0e0" : "#b3e5fc",
              }}
              key={index}
              value={response.text}
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
            value={systemInstructions}
            onChange={(e) => setSystemInstructions(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
