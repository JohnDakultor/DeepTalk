import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Typography,
  Container,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Send, VolumeUp, Mic, MicOff } from "@mui/icons-material";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ProductDrawer from "../../components/prodoctComponents/ProductDrawer";
import gpt4 from "../../api/gpt4";

export default function Talk() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      setupAudio();
    }
    if (!listening && transcript) {
      setInput(transcript);
      const id = setTimeout(() => {
        handleSendMessage();
      }, 5000); // 5 seconds of inactivity
      setTimeoutId(id);
    } else if (listening) {
      setInput(transcript);
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    }
  }, [transcript, listening]);

  const setupAudio = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    audioContextRef.current = context;

    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    analyserRef.current = analyserNode;
    analyserNode.connect(context.destination); // Connect to the context's destination (i.e., speakers)

    // Set up the canvas drawing
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const draw = () => {
        if (!analyserNode) return;

        analyserNode.getByteFrequencyData(dataArrayRef.current);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / dataArrayRef.current.length) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < dataArrayRef.current.length; i++) {
          barHeight = dataArrayRef.current[i];
          ctx.fillStyle = `rgb(0, ${barHeight + 100}, 50)`;
          ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
          x += barWidth + 1;
        }

        requestAnimationFrame(draw);
      };

      draw();
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      setInput("");

      const response = await gpt4(input);

      const updatedMessages = [
        ...newMessages,
        { role: "assistant", content: response },
      ];
      setMessages(updatedMessages);

      readAloud(response);
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const readAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleReadLastMessage = () => {
    const lastMessage = messages.findLast((msg) => msg.role === "assistant");
    if (lastMessage) {
      readAloud(lastMessage.content);
    }
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <ProductDrawer />
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This adds space for the AppBar */}
      <Container sx={{ mt: 8 }}>
        {/* Adjust the margin top to account for the AppBar height */}
        <Box
          sx={{
            height: "70vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            mt: 2,
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 2,
          }}
        >
          {messages.map((message, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                mb: 1,
                backgroundColor:
                  message.role === "user" ? "#f1f1f1" : "#e0e0e0",
                alignSelf: message.role === "user" ? "flex-start" : "flex-end",
              }}
            >
              <Typography
                component="div"
                sx={{
                  whiteSpace: "pre-wrap", // Preserve whitespace for code blocks
                }}
              >
                {message.content.includes("```") ? (
                  <Box
                    sx={{  
                      color: "black",
                      padding: "5px",
                      borderRadius: "5px",
                      overflowX: "auto",
                      fontSize: "0.75rem", // Smaller font size
                      maxWidth: "90%", // Ensure it doesn't cover the text
                      wordBreak: "break-all", // Break long words
                    }}
                  >
                    <code>{message.content.replace(/```/g, '')}</code>
                  </Box>
                ) : (
                  message.content
                )}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <canvas ref={canvasRef} width="300" height="100" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    edge="end"
                  >
                    <Send />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={handleReadLastMessage}
                    edge="end"
                    sx={{ ml: 2 }}
                  >
                    <VolumeUp />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={handleMicClick}
                    edge="end"
                    sx={{ ml: 2 }}
                  >
                    {listening ? <Mic /> : <MicOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Container>
    </>
  );
}
