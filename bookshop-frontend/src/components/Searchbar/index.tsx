import { TextField } from "@mui/material";

interface ISearchbar {
  placeholder?: string;
}

const Searchbar = ({ placeholder }: ISearchbar) => {
  return <TextField variant="standard" placeholder={placeholder} />;
};

export default Searchbar;
