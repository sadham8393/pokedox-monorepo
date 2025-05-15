import * as React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export interface PokemonCardProps {
    name: string;
    imageUrl?: string;
    types?: string[];
    height: number | string;
    weight: number | string;
    baseExperience: number;
    onClick?: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
    name,
    imageUrl,
    types,
    height,
    weight,
    baseExperience,
    onClick,
}) => (
    <Card
        variant="outlined"
        sx={{
            maxWidth: 400,
            width: "100%",
            mx: "auto",
            boxShadow: 3,
            p: 2,
            cursor: onClick ? "pointer" : "default",
            background: "#fff",
        }}
        onClick={onClick}
    >
        <CardContent>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
            >
                <Typography variant="h4" gutterBottom>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                {imageUrl && (
                    <Box
                        component="img"
                        src={imageUrl}
                        alt={name}
                        sx={{ width: 160, height: 160, mb: 2 }}
                    />
                )}
                {types && (
                    <Box sx={{ color: "#666", mb: 1, display: "inline-flex" }}>
                        {types.map((t) => (
                            <h2 key={t} style={{ fontSize: 16, marginRight: 8 }}>{t}</h2>
                        ))}
                    </Box>
                )}
                <Typography variant="body1">Height: {height}</Typography>
                <Typography variant="body1">Weight: {weight}</Typography>
                {baseExperience !== undefined && (
                    <Typography variant="body1">XP: {baseExperience}</Typography>
                )}
            </Box>
        </CardContent>
    </Card>
);
