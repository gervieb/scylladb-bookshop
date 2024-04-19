import { TextField } from "@mui/material";

interface ISearchbar {
  placeholder?: string;
}

const Searchbar = ({ placeholder }: ISearchbar) => {
  return (
    <TextField
      variant="standard"
      fullWidth
      placeholder={placeholder}
      sx={{ outline: "none" }}
    />
  );
};

export default Searchbar;
