"use client";
import * as React from "react";
import { useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppState, AppDispatch } from "../store";
import { fetchPokemonList, setPage } from "../slices/pokemonListSlice";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", flex: 1 },
];

export default function PokemonListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { results, count, loading, error, page, pageSize } = useSelector((state: AppState) => state.pokemonList);

  useEffect(() => {
    dispatch(fetchPokemonList({ page, pageSize }));
  }, [dispatch, page, pageSize]);

  return (
    <div style={{ height: 500, width: "100%", margin: "2rem auto", cursor: "pointer" }}>
      <h2>Pokémon List</h2>
      <DataGrid
        rows={results.map((p, i) => ({ id: i, ...p }))}
        columns={columns}
        rowCount={count}
        paginationModel={{ page, pageSize }}
        pagination
        paginationMode="server"
        loading={loading}
        onPaginationModelChange={(model) => dispatch(setPage(model.page))}
        onRowClick={(params) => router.push(`/pokemon/${results[Number(params.id)].name}`)}
        disableRowSelectionOnClick
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
