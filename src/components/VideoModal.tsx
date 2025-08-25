import { useMemo } from "react";
import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    Chip,
    Typography,
    Stack,
} from "@mui/material";
import { CloseRounded, StarRounded } from "@mui/icons-material";
import type { Media } from "../types";

interface VideoModalProps<T> {
    open: boolean;
    onClose: () => void;
    media?: T
    autoplay?: boolean;
}

export default function VideoModal({
    open,
    onClose,
    media,
    autoplay = true,
}: VideoModalProps<Media>) {

    const src = useMemo(() => {
        const params = new URLSearchParams({
            rel: "0",
            modestbranding: "1",
            playsinline: "1",
            enablejsapi: "1",
            ...((autoplay && open) ? { autoplay: "1" } : { autoplay: "0" }),
            ...(media?.start ? { start: String(media?.start) } : {}),
        });
        return `https://www.youtube.com/embed/${media?.youtubeId}?${params.toString()}`;
    }, [media?.youtubeId, autoplay, open, media?.start]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            aria-labelledby="video-modal-title"
            keepMounted={false}
            PaperProps={{
                sx: { overflow: "hidden", borderRadius: 3, bgcolor: "black" },
            }}
        >
            {media?.posterUrl && (
                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${media.posterUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(16px) saturate(120%) brightness(0.5)",
                        transform: "scale(1.05)",
                    }}
                />
            )}

            {/* Header row */}
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 2, sm: 3 },
                    pt: { xs: 1.25, sm: 1.5 },
                    zIndex: 1,
                }}
            >
                <Box>
                    {media?.title && (
                        <Typography
                            id="video-modal-title"
                            variant="h6"
                            sx={{ color: "common.white", fontWeight: 700, lineHeight: 1.2 }}
                            title={`${media.title} — Trailer`}              // ✅ title attr says trailer
                            noWrap
                        >
                            {media.title}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} sx={{ mt: 0.75, flexWrap: "wrap" }}>
                        {/* NEW: explicit Trailer chip */}
                        <Chip
                            size="small"
                            label="Trailer"                                  // ✅ immediate visual cue
                            sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
                        />

                        {typeof media?.year !== "undefined" && (
                            <Chip size="small" label={String(media.year)} sx={{ bgcolor: "grey.900", color: "grey.100" }} />
                        )}
                        {media?.type && (
                            <Chip
                                size="small"
                                label={media.type === "tv" ? (media.episodes ? `${media.episodes} eps` : "TV") : "Movie"}
                                sx={{ bgcolor: "grey.900", color: "grey.100" }}
                            />
                        )}
                        {typeof media?.score === "number" && (
                            <Chip
                                size="small"
                                icon={<StarRounded sx={{ color: "gold" }} />}
                                label={`${media.score}`}
                                sx={{ bgcolor: "grey.900", color: "grey.100", fontWeight: 600 }}
                            />
                        )}
                        {media?.genres?.slice(0, 3).map((g) => (
                            <Chip key={g} size="small" label={g} sx={{ bgcolor: "grey.900", color: "grey.100" }} />
                        ))}
                    </Stack>
                </Box>

                <IconButton
                    aria-label="Close trailer"
                    title="Close trailer"
                    onClick={onClose}
                    sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        color: "grey.100",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                        borderRadius: 2,
                    }}
                >
                    <CloseRounded />
                </IconButton>
            </Box>

            {/* Video area */}
            <DialogContent sx={{ pt: 1.5, pb: 2, px: { xs: 1.5, sm: 2.5 }, position: "relative", zIndex: 1 }}>
                <Box sx={{ position: "relative", width: "100%" }}>
                    <Box sx={{ width: "100%", pt: "56.25%" }} />
                    {open && (
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: 2,
                                overflow: "hidden",
                                boxShadow: 3,
                                backgroundColor: "black",
                            }}
                        >
                            <iframe
                                title={media?.title ? `${media.title} trailer` : "Video trailer"}  // ✅ accessible title
                                src={src}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                frameBorder={0}
                                style={{ width: "100%", height: "100%", display: "block" }}
                            />
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
}