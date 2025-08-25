// src/components/HeroBanner.tsx
import { Box, Button, Chip, Container, Stack, Typography, useTheme } from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import AddRounded from "@mui/icons-material/AddRounded";
import useFetchData from "../hooks/useFetchData";
import { queryPage } from "../data";
import type { Media, PageData } from "../types";

interface HeroBannerProps {
    onPlay?: (media: Media) => void;
}

export default function HeroBanner({ onPlay }: HeroBannerProps) {
    const theme = useTheme();
    const { data, loading, error } = useFetchData<PageData>(queryPage, {
        page: 1,
        perPage: 1,
        sort: "TRENDING_DESC",
        season: "SUMMER",
    });

    if (loading) return <Box sx={{ height: { xs: "52vh", md: "64vh" } }} />;
    if (error) return <Box sx={{ color: "error.main", p: 2 }}>Couldn’t load hero.</Box>;

    const m = data?.Page?.media?.[0];
    if (!m) return null;

    const media: Media = {
        id: String(m.id),
        title: m.title?.english || "",
        posterUrl: m.coverImage?.extraLarge ?? m.coverImage?.large ?? "",
        youtubeId: m.trailer?.id,
        score: m.averageScore ?? null,
        year: m.seasonYear ?? undefined,
        type: (m?.format ?? "").toLowerCase() === "movie" ? "movie" : "tv",
        episodes: m?.episodes ?? 0,
        genres: m?.genres ?? [],
    };

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                overflow: "hidden",
                minHeight: { xs: "52vh", md: "64vh" },
                display: "flex",
                alignItems: "center",
                // Clean, image-less backdrop
                background: `linear-gradient(
          180deg,
          ${theme.palette.background.default} 0%,
          ${theme.palette.background.paper} 100%
        )`,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    // mixBlendMode: "screen",
                    inset: 0,
                    // opacity: .5,
                    backgroundImage: `url(${media.posterUrl})`,
                    maskImage: "linear-gradient(225deg, black 0%, transparent 90%)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(15px) saturate(1.5) contrast(1.5)",
                    transform: "scale(1.02)",
                },
            }}
        >
            {/* Subtle accent wash (no photo) */}
            {/* <Box
                aria-hidden
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(60% 70% at 80% 40%, color-mix(in oklab, ${accent}, transparent 80%) 0%, transparent 60%)`,
                    pointerEvents: "none",
                }}
            /> */}

            {/* Fine grid pattern (SVG) */}
            <Box
                aria-hidden
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.32,
                    maskImage: "linear-gradient(180deg, black 0%, transparent 80%)",
                    pointerEvents: "none",
                    "& svg": { width: "100%", height: "100%", display: "block" },
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M32 0H0V32" fill="none" stroke="currentColor" strokeWidth="0.7" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </Box>

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: { xs: 4, md: 8 } }}>
                <Stack spacing={1.75} sx={{ maxWidth: 760 }}>
                    <Typography variant="overline" sx={{ letterSpacing: 1, color: "text.secondary" }}>
                        Now Trending
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{ fontWeight: 900, lineHeight: 1.1, letterSpacing: 0.2 }}
                    >
                        {media.title}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {typeof media.score === "number" && (
                            <Chip size="small" label={`Score ${media.score}`} />
                        )}
                        {media.year && <Chip size="small" label={media.year} />}
                        <Chip
                            size="small"
                            label={media.type === "tv" ? (media.episodes ? `${media.episodes} eps` : "TV") : "Movie"}
                        />
                        {media.genres?.slice(0, 2).map((g) => <Chip key={g} size="small" label={g} />)}
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
                        <Button
                            variant="contained"
                            startIcon={<PlayArrowRounded />}
                            onClick={() => onPlay?.(media)}
                            sx={{ borderRadius: 999, px: 3 }}
                        >
                            Play Trailer
                        </Button>
                        <Button
                            variant="outlined"
                            disabled
                            startIcon={<AddRounded />}
                            onClick={() => console.log("Add to list:", media.id)}
                            sx={{ borderRadius: 999, px: 2.5 }}
                        >
                            My List
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
