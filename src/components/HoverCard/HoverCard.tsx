import { useState } from "react";
import { Card, CardActionArea, Box, Typography, Skeleton} from "@mui/material";
import Overlay from "./Overlay";
import type { Media } from "../../types";

interface VideoCardProps<T> {
    media: T;
    onPlay?: () => void;
    onMediaSelected?: () => void;
    onAdd?: (id: string) => void;
    loading?: boolean;
    size?: "sm" | "md" | "lg";
    aspect?: "2/3" | "16/9";
}

export default function HoverCard({
    media,
    onPlay,
    onMediaSelected,
    // onAdd,
    loading = false,
    size = "md",
    aspect = "2/3",
}: VideoCardProps<Media>) {
    const [hovered, setHovered] = useState(false);
    const [focusWithin, setFocusWithin] = useState(false);

    const widthMap = { sm: 160, md: 200, lg: 240 };
    const width = widthMap[size];
    const paddingTop = aspect === "16/9" ? "56.25%" : "150%";

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);
    const handleFocusCapture: React.FocusEventHandler<HTMLDivElement> = () =>
        setFocusWithin(true);
    const handleBlurCapture: React.FocusEventHandler<HTMLDivElement> = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setFocusWithin(false);
        }
    };

    const visible = hovered || focusWithin;

    return (
        <Card
            elevation={0}
            sx={{
                width,
                bgcolor: "transparent",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <CardActionArea
                component="div" // avoid nested <button>
                onClick={onMediaSelected}
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
                onFocusCapture={handleFocusCapture}
                onBlurCapture={handleBlurCapture}
                sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    outline: "none",
                    ":focus-visible": {
                        boxShadow: (t) => `0 0 0 3px ${t.palette.primary.main}55`,
                    },
                }}
            >
                <Box sx={{ position: "relative", width: "100%" }}>
                    <Box sx={{ width: "100%", pt: paddingTop }} />
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "action.hover",
                            backgroundImage: loading ? "none" : `url(${media.posterUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transition: "transform 200ms ease",
                            transform: hovered ? "scale(1.02)" : "scale(1)",
                            borderRadius: 3,
                        }}
                    >
                        {loading && (
                            <Skeleton
                                variant="rectangular"
                                sx={{ width: "100%", height: "100%" }}
                            />
                        )}
                    </Box>

                    {/* Title footer */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            p: 1,
                            zIndex: 2,
                            backdropFilter: "blur(8px) saturate(120%)",
                            WebkitBackdropFilter: "blur(8px) saturate(120%)",
                            backgroundColor: "rgba(10, 10, 12, 0.35)",
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            // "@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
                            //     background:
                            //         "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.7) 100%)",
                            // },
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{
                                color: "common.white",
                                textShadow: "0 1px 2px rgba(0,0,0,.6)",
                            }}
                            title={media.title}
                        >
                            {media.title}
                        </Typography>
                    </Box>

                    {visible && (
                        <Overlay
                            media={media}
                            onPlay={() => onPlay?.()}
                            // onAdd={() => onAdd?.(media.id)}
                        />
                    )}
                </Box>
            </CardActionArea>
        </Card>
    );
}