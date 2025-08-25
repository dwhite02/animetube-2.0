// src/components/MediaDetailsPanel.tsx
import {
    Box,
    Button,
    Chip,
    Drawer,
    IconButton,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import ShareRounded from "@mui/icons-material/ShareRounded";
import type { Media } from "../types";
import ScoreBadge from "./HoverCard/ScoreBadge";

interface MediaDetailsPanelProps {
    open: boolean;
    onClose: () => void;
    media?: Media;
    onPlayTrailer?: (m: Media) => void; // Optional hook to reuse your VideoModal logic later
};

export default function MediaDetailsPanel({ open, onClose, media, onPlayTrailer }: MediaDetailsPanelProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const title = media?.title ?? "";
    const banner = media?.posterUrl || "";
    const score = typeof media?.score === "number" ? Math.round(media!.score) : null;

    const metaType = media?.type === "tv"
        ? (media?.episodes ? `${media.episodes} eps` : "TV")
        : "Movie";

    // Keep trailer play available only if we have a YouTube id
    const canPlay = Boolean(media?.youtubeId);

    // Soft gradient for readability
    const heroOverlay = "linear-gradient(to top, rgba(0,0,0,.65) 0%, rgba(0,0,0,.15) 60%, rgba(0,0,0,0) 100%)";

    console.log(media)
    return (
        <Drawer
            anchor={isMobile ? "bottom" : "right"}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: isMobile ? "100%" : 520,
                    maxWidth: "100vw",
                    height: isMobile ? "90vh" : "100%",
                    bgcolor: "background.default",
                    borderTopLeftRadius: isMobile ? 16 : 0,
                    borderTopRightRadius: isMobile ? 16 : 0,
                    overflow: "hidden",
                },
            }}
            ModalProps={{ keepMounted: false }}
        >
            {/* HERO */}
            <Box sx={{ position: "relative", minHeight: 220, bgcolor: "grey.900" }}>
                {/* Banner */}
                {banner && (
                    <Box
                        aria-hidden
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${banner})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "saturate(115%) brightness(0.9)",
                        }}
                    />
                )}
                {/* Overlay for readability */}
                <Box sx={{ position: "absolute", inset: 0, background: heroOverlay }} />

                {/* Close button */}
                <IconButton
                    aria-label="Close details"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 9,
                        bgcolor: "rgba(0,0,0,0.35)",
                        color: "common.white",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
                        borderRadius: 2,
                    }}
                >
                    <CloseRounded />
                </IconButton>

                {/* Foreground content */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        height: "100%",
                        p: 2,
                        pt: 7,
                        gap: 1,
                    }}
                >
                    {typeof score === "number" && (
                        <ScoreBadge value={score} title={title ?? "Media"} variant="mediaDetail" />
                    )}
                    
                    {title && (
                        <Typography
                            variant="h6"
                            sx={{ color: "common.white", fontWeight: 800, lineHeight: 1.15 }}
                            title={`${title} — Details`}
                        >
                            {title}
                        </Typography>
                    )}

                    {/* Meta chips:  year / type / score / top genres */}
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                
                        {typeof media?.year !== "undefined" && (
                            <Chip size="small" label={String(media.year)} sx={{ bgcolor: "rgba(255,255,255,.14)", color: "grey.100" }} />
                        )}
                        {media?.type && (
                            <Chip size="small" label={metaType} sx={{ bgcolor: "rgba(255,255,255,.14)", color: "grey.100" }} />
                        )}
                    </Stack>

                    {/* Primary actions */}
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            size="small"
                            startIcon={<PlayArrowRounded />}
                            onClick={() => media && onPlayTrailer?.(media)}
                            disabled={!canPlay}
                            aria-disabled={!canPlay}
                            sx={{ borderRadius: 999 }}
                        >
                            Play trailer
                        </Button>
                        
                        <Button disabled color="inherit" variant="outlined" size="small" startIcon={<AddRounded />} sx={{ borderRadius: 999 }}>
                            Add to List
                        </Button>
                        <IconButton disabled aria-label="Share" size="small">
                            <ShareRounded />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>

            {/* BODY */}
            <Box
                sx={{
                    px: 2,
                    py: 2,
                    overflowY: "auto",
                    height: "100%",
                    "&::-webkit-scrollbar": { width: 10 },
                    "&::-webkit-scrollbar-thumb": { backgroundColor: "action.hover", borderRadius: 8 },
                }}
            >
                {/* Description */}
                {media?.description && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                        }}
                        dangerouslySetInnerHTML={{ __html: media.description }}
                    >
                    </Typography>
                )}

                {/* Facts grid */}
                <Box
                    sx={{
                        mt: 2,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 1.25,
                    }}
                >
                    {media?.genres && <Fact label="Genres" value={media.genres.slice(0,3).join(", ")}/>}
                    {media?.status && <Fact label="Status" value={media.status} />}
                    {media?.season && <Fact label="Season" value={media.season} />}
                    {typeof media?.episodes === "number" && media.episodes > 0 && (
                        <Fact label="Episodes" value={String(media.episodes)} />
                    )}
                    {typeof media?.year !== "undefined" && <Fact label="Year" value={String(media.year)} />}
                    {typeof media?.duration === "number" && <Fact label="Runtime" value={`${media.duration} min`} />}
                    {media?.type && <Fact label="Type" value={media.type === "tv" ? "TV" : "Movie"} />}

                </Box>
            </Box>
        </Drawer>
    );
}

function Fact({ label, value }: { label: string; value: string }) {
    return (
        <Box sx={{ minWidth: 0 }}>
            <Typography variant="caption" sx={{ color: "text.disabled", letterSpacing: 0.3 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                {value}
            </Typography>
        </Box>
    );
}

// AniList descriptions can include HTML; quick sanitize for display-only
// function stripTags(s?: string) {
//     if (!s) return "";
//     return s.replace(/<[^>]*>/g, "");
// }
