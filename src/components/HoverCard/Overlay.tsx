import { AddRounded, PlayArrowRounded } from "@mui/icons-material";
import { Button, Box, Chip, IconButton, Typography } from "@mui/material";
import ScoreBadge from "./ScoreBadge";
import type { Media } from "../../types";


interface OverlayProps<T> {
    media: T;
    onPlay?: () => void;
    onAdd?: () => void;
}

export default function Overlay({
    media,
    onPlay,
    onAdd,
}: OverlayProps<Media>) {

    // derive 0–100 display score from either API score or legacy rating
    function normalizeScore(apiScore: number | null | undefined) {
        if (typeof apiScore === "number" && Number.isFinite(apiScore)) {
            return clamp(Math.round(apiScore), 0, 100);
        }
        return null;
    }

    function clamp(n: number, min: number, max: number) {
        return Math.max(min, Math.min(max, n));
    }

    // derive a 0–100 display score (prefer API's averageScore)
    const derivedScore = normalizeScore(media.score);

    return (
        <Box
            sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                p: 1.5,
                pb: "56px",
                color: "common.white",
                background:
                    "linear-gradient(180deg, rgba(0,0,0,.1) 0%, rgba(0,0,0,.65) 60%, rgba(0,0,0,.9) 100%)",
            }}
        >
            {/* top-left numeric score badge (0–100) */}
            {derivedScore !== null && (
                <ScoreBadge value={derivedScore} title={media.title} />
            )}

            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {media.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                {typeof media.year !== "undefined" && (
                    <Chip
                        size="small"
                        label={String(media.year)}
                        sx={{ bgcolor: "grey.800", color: "grey.100" }}
                    />
                )}
                <Chip
                    size="small"
                    label={
                        media.type === "tv"
                            ? media.episodes
                                ? `${media.episodes} eps`
                                : "TV"
                            : "Movie"
                    }
                    sx={{ bgcolor: "grey.800", color: "grey.100" }}
                />
            </Box>

            {media.genres && (media.genres.length > 0 && (
                <Box
                    sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                        maxHeight: 48,
                        overflow: "hidden",
                    }}
                >
                    {media?.genres?.slice(0, 3).map((g) => (
                        <Chip
                            key={g}
                            size="small"
                            label={g}
                            sx={{ bgcolor: "grey.900", color: "grey.100" }}
                        />
                    ))}
                </Box>
            ))}

            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                {media.youtubeId && (
                    <Button
                    startIcon={<PlayArrowRounded />}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onPlay?.()
                    }}
                    variant="contained"
                    size="small"
                        sx={{
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            borderRadius: 2,
                            "&:hover": { bgcolor: "primary.dark" },
                            boxShadow: 2,
                        }}
                  >
                    Trailer
                  </Button>
                )}
                <IconButton
                    disabled
                    aria-label="Add to list"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAdd?.();
                    }}
                    sx={{
                        bgcolor: "grey.800",
                        color: "grey.100",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "grey.700" },
                        boxShadow: 1,
                    }}
                >
                    <AddRounded />
                </IconButton>
                
            </Box>
        </Box>
    );
}
