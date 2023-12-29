import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { ITwit } from "../../routes";
import { useHttpClient } from "../../shared";
import "./EditTwit.css";
interface IProps {
  twit: ITwit | null;
  isOpen: boolean;
  close: () => void;
}
export const EditTwit = ({ twit, isOpen, close }: IProps) => {
  const [title, setTitle] = useState("");

  const httpClient = useHttpClient();
  const handleSubmit = async () => {
    await httpClient.put(`/twits/${twit?.id}/`, { title });
    close();
  };
  return (
    <Modal open={isOpen} className="modalContainer">
      <div>
        <Button className="closeBtn" onClick={close}>
          x
        </Button>
        <p>Old title: {twit?.title}</p>

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
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </Modal>
  );
};
