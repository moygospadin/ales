import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared";

export const CreateTwit = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const httpClient = useHttpClient();
  const onTwitSend = async () => {
    await httpClient.post("/twits/", { title });
    navigate("/home");
  };
  return (
    <Container>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="title"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <Button onClick={onTwitSend}>Send twit</Button>
    </Container>
  );
};
