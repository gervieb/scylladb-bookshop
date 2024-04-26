import { ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface ISearchbar {
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Searchbar = ({ placeholder, onChange }: ISearchbar) => {
  return (
    <TextField
      variant="standard"
      fullWidth
      placeholder={placeholder}
      onChange={onChange}
      sx={{ outline: "none" }}
    />
  );
};

export default Searchbar;
