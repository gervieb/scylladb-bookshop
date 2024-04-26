import { Pagination, Stack } from "@mui/material";

interface IPagination {
  page: number;
  setPage: (page: number) => void;
  count: number;
}

const PaginationComponent = ({ page, setPage, count }: IPagination) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationComponent;
