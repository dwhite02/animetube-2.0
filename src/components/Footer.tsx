// src/components/Footer.tsx
import { useMemo, useState } from "react";
import type { SvgIconComponent } from "@mui/icons-material";
import {
    Box,
    Container,
    Grid,
    Typography,
    Link as MuiLink,
    IconButton,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

// Interfaces

interface FooterLink { label: string; href: string };
interface FooterSection { title: string; links: FooterLink[] };
interface SocialLink {
    label: string
    href: string;
    Icon: SvgIconComponent;
}
interface FooterProps {
    brand?: { name: string; tagline?: string; logoSrc?: string };
    sections?: FooterSection[];
    social?: SocialLink[];
    onSubscribe?: (email: string) => void;
};

// Footer Data

const defaultSections: FooterSection[] = [
    {
        title: "Browse",
        links: [
            { label: "Trending", href: "#" },
            { label: "New Releases", href: "#" },
            { label: "Top Rated", href: "#" },
            { label: "Genres", href: "#" },
        ],
    },
    {
        title: "Anime",
        links: [
            { label: "Action", href: "#" },
            { label: "Slice of Life", href: "#" },
            { label: "Romance", href: "#" },
            { label: "Sports", href: "#" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Help Center", href: "#" },
            { label: "Account", href: "#" },
            { label: "Contact Us", href: "#" },
            { label: "Status", href: "#" },
        ],
    },
];

const defaultSocial: SocialLink[] = [
    { label: "YouTube", href: "#", Icon: YouTubeIcon },
    { label: "Twitter", href: "#", Icon: TwitterIcon },
    { label: "Instagram", href: "#", Icon: InstagramIcon },
    { label: "GitHub", href: "#", Icon: GitHubIcon },
];

export default function Footer({
    brand = { name: "AniFlix", tagline: "Your anime, on tap." },
    sections = defaultSections,
    social = defaultSocial,
    onSubscribe,
}: FooterProps) {
    const [email, setEmail] = useState("");
    const year = useMemo(() => new Date().getFullYear(), []);

    const handleSubscribe = () => {
        if (!email.trim()) return;
        onSubscribe?.(email.trim());
        setEmail("");
    };

    return (
        <Box component="footer" sx={{ bgcolor: "background.paper", borderTop: 1, borderColor: "divider" }}>
            {/* Top divider with subtle gradient feel */}
            <Divider />

            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Brand + Newsletter */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {brand.logoSrc && (
                                    <Box
                                        component="img"
                                        src={brand.logoSrc}
                                        alt={`${brand.name} logo`}
                                        sx={{ width: 32, height: 32, borderRadius: 1 }}
                                    />
                                )}
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                    {brand.name}
                                </Typography>
                            </Box>
                            {brand.tagline && (
                                <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                                    {brand.tagline}
                                </Typography>
                            )}

                            {/* Newsletter (mock) */}
                            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                                <TextField
                                    size="small"
                                    placeholder="Email for updates"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                                    sx={{ flex: 1 }}
                                />
                                <Button variant="contained" size="small" onClick={handleSubscribe}>
                                    Subscribe
                                </Button>
                            </Box>

                            {/* Social */}
                            <Box sx={{ mt: 2, display: "flex", gap: 0.5 }}>
                                {social.map(({ label, href, Icon }) => (
                                    <IconButton
                                        key={label}
                                        component="a"
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        size="small"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        <Icon />
                                    </IconButton>
                                ))}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Link columns */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid container spacing={2}>
                            {sections.map((sec, i) => (
                                <Grid size={{ xs: 12, md: 4 }} key={i}>
                                    <Box>
                                        <Typography variant="overline" sx={{ color: "text.secondary", letterSpacing: 1 }}>
                                            {sec.title}
                                        </Typography>
                                        <Box component="nav" aria-label={sec.title}>
                                            {sec.links.map((l, j) => (
                                                <Box key={j} sx={{ mt: 0.75 }}>
                                                    <MuiLink
                                                        href={l.href}
                                                        underline="hover"
                                                        color="text.primary"
                                                        sx={{ "&:hover": { color: "primary.main" } }}
                                                    >
                                                        {l.label}
                                                    </MuiLink>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            {/* Bottom bar */}
            <Box sx={{ borderTop: 1, borderColor: "divider" }}>
                <Container maxWidth="xl"
                    sx={{
                        py: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        justifyContent: { xs: "center", sm: "space-between" },
                        flexWrap: "wrap",
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        © {year} {brand.name}. All rights reserved.
                    </Typography>

                    <Box >
                        <IconButton
                            aria-label="Back to top"
                            onClick={() => {
                                if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            size="small"
                            sx={{ ml: 1 }}
                        >
                            <ArrowUpwardIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
