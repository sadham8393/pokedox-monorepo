"use client";
import { Box } from "@mui/material";
import PokemonListPage from "../components/pokemon-list";

export default function Home() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      px={2}
    >
      <PokemonListPage />
    </Box>
  );
}