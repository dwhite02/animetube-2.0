// src/components/MediaList.tsx
import { useEffect, useMemo, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import { Box, Container, Typography, useTheme, Skeleton, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import HoverCard from "../HoverCard";
import type { Media, PageData } from "../../types";
import { queryPage } from "../../data";
import "./MedialList.scss";
import {
    Navigation,
    Pagination,
    A11y,
    Keyboard,
    Mousewheel,
    FreeMode,
    EffectCoverflow,
    Parallax,
    Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface MediaListProps {
    headline: string;
    sliderId?: number
    apiVariables?: object;
    onPlay?: (media: Media) => void;
    onMediaSelected?: (media: Media) => void;
}

export default function MediaList({ sliderId, headline, apiVariables = {}, onPlay, onMediaSelected }: MediaListProps) {
    const { data, loading, error } = useFetchData<PageData>(queryPage, apiVariables);
    const theme = useTheme();

    const mediaPage = useMemo(() => data?.Page?.media ?? [], [data]);
    const [accent, setAccent] = useState<string>(theme.palette.primary.main);

    // set initial accent once data loads
    useEffect(() => {
        if (mediaPage.length) {
            const c = mediaPage[0]?.coverImage?.color || theme.palette.primary.main;
            setAccent(c);
        }
    }, [mediaPage, theme.palette.primary.main]);

    return (
        <Container
            maxWidth="xl"
            component="section"
            sx={{
                py: 5,
                "--accent": accent,
                "--swiper-theme-color": accent,
                "--swiper-navigation-color": theme.palette.text.primary,
                "--swiper-pagination-bullet-inactive-color": theme.palette.text.secondary,
                "--swiper-pagination-bullet-inactive-opacity": 0.45,
                "--swiper-pagination-bullet-size": "8px",
            }}
        >
            {/* Sleek loading state */}
            {loading && (
                <Box
                    aria-live="polite"
                    sx={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridAutoColumns: {
                            xs: "calc((100% - 48px) / 2.2)",
                            sm: "calc((100% - 64px) / 3.2)",
                            md: "calc((100% - 96px) / 4.4)",
                            lg: "calc((100% - 120px) / 5.2)",
                            xl: "232px",
                        },
                        gap: { xs: 1.5, sm: 2 },
                        overflowX: "hidden",
                        pb: 2,
                    }}
                >
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton
                            key={i}
                            variant="rounded"
                            sx={{
                                width: "100%",
                                aspectRatio: "2 / 3",
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.text.primary, 0.06),
                            }}
                        />
                    ))}
                </Box>
            )}

            {mediaPage && (
                <>
                    <Box sx={{ position: "relative", mb: 3 }}>
                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.2,
                                letterSpacing: "0.02em",
                                position: "relative",
                                pr: 0.5,
                                // Minimal, youthful accent underline using --accent
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    bottom: -6,
                                    height: 3,
                                    width: 56,
                                    maxWidth: "35%",
                                    borderRadius: 999,
                                    background: "linear-gradient(90deg, var(--accent), transparent)",
                                },
                            }}
                        >
                            {headline}
                        </Typography>

                        {/* External Pagination */}
                        <Box
                            sx={{
                                left: "unset !important",
                                transform: "unset !important",
                                right: 0,
                                // Dots with pop
                                "& .swiper-pagination-bullet": {
                                    opacity: 0.55,
                                    transition: "transform 150ms ease, opacity 150ms ease",
                                },
                                "& .swiper-pagination-bullet-active": {
                                    opacity: 1,
                                    transform: "scale(1.35)",
                                    background: "var(--accent)",
                                    boxShadow: "0 0 0 3px color-mix(in oklab, var(--accent), transparent 70%)",
                                },
                            }}
                            className={`swiper-pagination`}
                            id={`swiper-pagination${sliderId}`}
                        ></Box>
                    </Box>

                    <Box
                        sx={{
                            position: "relative",
                            pb: 2,

                            // Neon ribbon backdrop (subtle)
                            // "&::before": {
                            //     content: '""',
                            //     position: "absolute",
                            //     inset: { xs: "auto 0 58px 0", sm: "auto 0 60px 0" },
                            //     height: 110,
                            //     margin: "0 auto",
                            //     filter: "blur(40px)",
                            //     background:
                            //         "radial-gradient(80% 120% at 50% 50%, color-mix(in oklab, var(--accent), transparent 70%) 0%, transparent 70%)",
                            //     pointerEvents: "none",
                            //     zIndex: 0,
                            // },

                            // Edge fades for premium feel
                            "& .swiper": {
                                position: "relative",
                                overflow: "hidden",
                                zIndex: 1,
                            },
                            "& .swiper::before, & .swiper::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                bottom: 36,
                                width: { xs: 28, sm: 40 },
                                zIndex: 3,
                                pointerEvents: "none",
                            },
                            "& .swiper::before": {
                                left: 0,
                                background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, transparent 100%)`,
                            },
                            "& .swiper::after": {
                                right: 0,
                                background: `linear-gradient(270deg, ${theme.palette.background.default} 0%, transparent 100%)`,
                            },

                            // Slide cards
                            "& .swiper-slide": {
                                transition: "transform 220ms ease, box-shadow 220ms ease, filter 220ms ease",
                                transformOrigin: "center",
                                borderRadius: 14,
                                overflow: "visible",
                                willChange: "transform",
                                // subtle lift on hover
                                "&:hover": { transform: "translateY(-6px)" },
                            },

                            // Active slide: accent ring + glow
                            // "& .swiper-slide-active": {
                            //     boxShadow: "0 10px 40px rgba(0,0,0,.35), 0 0 0 2px var(--accent)",
                            //     filter: "saturate(1.05)",
                            //     "& .card-sheen::after": {
                            //         opacity: 0.22,
                            //         transform: "translateX(140%)",
                            //     },
                            // },

                            // Sheen overlay for trendy pop
                            "& .card-sheen": {
                                position: "relative",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(75deg, transparent 30%, rgba(255,255,255,.18) 45%, transparent 60%)",
                                    transform: "translateX(-120%)",
                                    transition: "transform 800ms cubic-bezier(.2,.7,.2,1), opacity 240ms ease",
                                    opacity: 0,
                                    pointerEvents: "none",
                                    borderRadius: 14,
                                },
                                "&:hover::after": {
                                    opacity: 0.18,
                                    transform: "translateX(120%)",
                                },
                            },

                            "& .swiper-button-prev, & .swiper-button-next": {
                                width: 42,
                                height: 42,
                                borderRadius: 12,
                                color: "#fff",
                                backgroundColor: "rgba(255,255,255,0.08)", // fallback
                                border: "1px solid rgba(255,255,255,0.16)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter: "blur(10px)",
                                transition: "transform .15s ease, box-shadow .15s ease, background .15s ease",
                                boxShadow: "0 6px 20px rgba(0,0,0,.25)",
                                // Colorful hover/focus using the slide accent:
                                background: "linear-gradient(180deg, color-mix(in oklab, var(--accent), transparent 82%), transparent)",
                                "&:hover, &:focus-visible": {
                                    background: "linear-gradient(180deg, var(--accent), color-mix(in oklab, var(--accent), transparent 40%))",
                                    boxShadow: "0 8px 28px color-mix(in oklab, var(--accent), transparent 55%), 0 0 0 2px color-mix(in oklab, var(--accent), transparent 60%) inset",
                                    transform: "scale(1.05)",
                                },
                                "&::after": { fontSize: 18, fontWeight: 800 },
                            },
                            "& .swiper-button-disabled": { opacity: 0.35 },
                        }}
                    >
                        <Swiper
                            modules={[
                                Navigation,
                                Pagination,
                                A11y,
                                Keyboard,
                                Mousewheel,
                                FreeMode,
                                EffectCoverflow,
                                Parallax,
                                Autoplay,
                            ]}
                            // effect="coverflow"
                            // coverflowEffect={{
                            //     // rotate: 24,
                            //     // stretch: -10,
                            //     // depth: 140,
                            //     // modifier: 1,
                            //     // slideShadows: false,
                            // }}
                            loop={true}
                            parallax
                            freeMode={{ enabled: true, momentumRatio: 0.25 }}
                            grabCursor
                            mousewheel={{ forceToAxis: true, sensitivity: 0.7 }}
                            keyboard={{ enabled: true }}
                            navigation
                            pagination={{ el: `#swiper-pagination${sliderId}`, clickable: true, dynamicBullets: true }}
                            // autoplay={{ delay: 4500, disableOnInteraction: true, pauseOnMouseEnter: true }}
                            // Responsive + slight peeking
                            breakpoints={{
                                0: { slidesPerView: 2.2, spaceBetween: 12 },
                                480: { slidesPerView: 2.8, spaceBetween: 12 },
                                640: { slidesPerView: 3.4, spaceBetween: 12 },
                                900: { slidesPerView: 4.4, spaceBetween: 14 },
                                1200: { slidesPerView: 5.2, spaceBetween: 16 },
                                1536: { slidesPerView: 6.2, spaceBetween: 16 },
                            }}
                            onSlideChange={(swiper) => {
                                const i = swiper.realIndex ?? swiper.activeIndex ?? 0;
                                const c = mediaPage[i]?.coverImage?.color || theme.palette.primary.main;
                                setAccent(c);
                            }}
                        >
                            {mediaPage.map((m) => {
                                const media: Media = {
                                    id: String(m?.id),
                                    title: m ? m.title.english : "",
                                    posterUrl: m?.coverImage?.extraLarge ?? m?.coverImage?.large ?? "",
                                    score: m?.averageScore ?? null,
                                    year: m?.seasonYear ?? undefined,
                                    type: (m?.format ?? "").toLowerCase() === "movie" ? "movie" : "tv",
                                    episodes: m?.episodes ?? 0,
                                    genres: m?.genres ?? [],
                                    youtubeId: m?.trailer?.id,
                                    description: m?.description,
                                    season: m?.season,
                                    duration: m?.duration,
                                    status: m?.status,
                                };

                                return (
                                    <SwiperSlide key={m?.id}>
                                        {/* parallax wrapper + sheen */}
                                        <Box className="card-sheen" data-swiper-parallax="-24">
                                            <HoverCard media={media} onPlay={() => onPlay?.(media)} onMediaSelected={() => onMediaSelected?.(media)} size="md" aspect="2/3" />
                                        </Box>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </Box>
                </>
            )}

            {/* Design-forward error banner */}
            {error && (
                <Box
                    role="alert"
                    sx={{
                        mt: 2,
                        position: "relative",
                        p: 2,
                        pr: 2.5,
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.error.main, 0.12),
                        border: `1px solid ${alpha(theme.palette.error.main, 0.35)}`,
                        boxShadow: "0 6px 24px rgba(0,0,0,.25)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        overflow: "hidden",
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            left: -40,
                            top: -40,
                            width: 160,
                            height: 160,
                            borderRadius: "50%",
                            background: `radial-gradient(120px circle at center, ${alpha(
                                theme.palette.error.main,
                                0.25
                            )}, transparent 70%)`,
                            pointerEvents: "none",
                        },
                    }}
                >
                    <WarningAmberRoundedIcon
                        sx={{ color: theme.palette.error.main, fontSize: 28, flexShrink: 0 }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ mb: 0.25, color: theme.palette.error.main, fontWeight: 700 }}
                        >
                            Something went wrong
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.text.secondary,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                            title={error.message}
                        >
                            {error.message}
                        </Typography>
                    </Box>
                    <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => window.location.reload()}
                        sx={{
                            borderColor: alpha(theme.palette.error.main, 0.5),
                            "&:hover": { borderColor: theme.palette.error.main },
                        }}
                    >
                        Retry
                    </Button>
                </Box>
            )}
        </Container>
    );
}
