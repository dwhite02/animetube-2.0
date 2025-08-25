import { Box } from "@mui/material";

function scoreColors(v: number) {
    // simple thresholds; tweak to taste
    if (v >= 85) return { bg: "rgba(56, 142, 60, 0.85)", fg: "#fff" }; // green
    if (v >= 70) return { bg: "rgba(76, 175, 80, 0.85)", fg: "#fff" }; // light green
    if (v >= 50) return { bg: "rgba(255, 179, 0, 0.9)", fg: "#111" };   // amber
    return { bg: "rgba(189, 189, 189, 0.9)", fg: "#111" };               // grey
}

export default function ScoreBadge({
    value,
    title,
    variant = "overlay", // "overlay" or "inline"
}: { value: number; title: string; variant?: "overlay" | "mediaDetail" }) {
    const { bg, fg } = scoreColors(value);
    return (
        <Box
            aria-label={`${title} score ${value}`}
            sx={{
                position: "absolute",
                top: 8,
                [variant === "overlay" ? "right" : "left"]: 8,
                zIndex: 3,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                px: 0.75,
                py: 0.25,
                borderRadius: 1.5,
                fontWeight: 700,
                fontSize: 12,
                lineHeight: 1,
                color: fg,
                bgcolor: bg,
                boxShadow: "0 4px 10px rgba(0,0,0,.35)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
            }}
        >
            {value}
            <Box component="span" sx={{ opacity: 0.8, fontWeight: 600 }}>
                /100
            </Box>
        </Box>
    );
}
