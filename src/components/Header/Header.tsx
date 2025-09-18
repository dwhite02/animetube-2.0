// src/components/Header.tsx
import { useMemo, useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    InputBase,
    Divider,
    Slide,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useScrollTrigger,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import MenuRounded from "@mui/icons-material/MenuRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { NavButton } from "./NavButton";

interface NavLinkItem { label: string; }
const navLinks: NavLinkItem[] = [
    { label: "Home" },
    // { label: "TV" },
    // { label: "Movies" },
    // { label: "My List" },
];

export default function Header({ brand = "AniFlix" }: { brand?: string }) {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState<NavLinkItem["label"]>("Home");
    const [navOpen, setNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const trigger = useScrollTrigger({ threshold: 64 });
    const year = useMemo(() => new Date().getFullYear(), []);

    // const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    //     e.preventDefault();
    //     if (query.trim()) console.log("search:", query);
    // };

    return (
        <>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar
                    position={"sticky"}
                    // elevation={0}
                    sx={(t) => ({
                        top: 0,
                        color: "text.primary",
                        // bgcolor: trigger ? alpha(t.palette.background.paper, 0.8) : "transparent",
                        // backdropFilter: trigger ? "blur(10px)" : "none",
                        // WebkitBackdropFilter: trigger ? "blur(10px)" : "none",
                        // borderBottom: `1px solid ${trigger ? alpha(t.palette.divider, 0.8) : "transparent"}`,
                        background: alpha(t.palette.background.paper, 0.8),
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        // borderBottom: `1px solid ${trigger ? alpha(t.palette.divider, 0.8) : "transparent"}`,
                        transition: "background-color 200ms ease, backdrop-filter 200ms ease, border-color 200ms ease",
                    })}
                >
                    <Toolbar sx={{ minHeight: 64, gap: 1 }}>
                        {/* Mobile: menu */}
                        <IconButton
                            aria-label="Open navigation"
                            onClick={() => setNavOpen(true)}
                            sx={{ display: { xs: "inline-flex", sm: "none" } }}
                        >
                            <MenuRounded />
                        </IconButton>

                        {/* Brand */}
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{
                                fontWeight: 800,
                                letterSpacing: 0.3,
                                userSelect: "none",
                                mr: 1,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {brand}
                            <Typography
                                component="span"
                                variant="caption"
                                sx={{ ml: 1, color: "text.secondary", display: { xs: "none", sm: "inline" } }}
                            >
                                {year}
                            </Typography>
                        </Typography>

                        {/* Nav links (desktop/tablet) */}
                        <Box
                            component="nav"
                            sx={{
                                display: { xs: "none", sm: "flex" },
                                alignItems: "center",
                                gap: 0.5,
                                mr: "auto",
                            }}
                        >
                            {navLinks.map((item) => (
                                <NavButton
                                    key={item.label}
                                    label={item.label}
                                    active={active === item.label}
                                    onClick={() => setActive(item.label)}
                                />
                            ))}
                        </Box>

                        {/* Desktop search */}
                        {/* <SearchRoot role="search" onSubmit={onSubmit} aria-label="site search">
                            <SearchRounded fontSize="small" />
                            <InputBase
                                placeholder="Search"
                                inputProps={{ "aria-label": "Search" }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                sx={{ fontSize: 14, width: 180 }}
                            />
                            <IconButton
                                size="small"
                                aria-label="Clear search"
                                onClick={() => setQuery("")}
                                sx={{
                                    p: 0.5,
                                    visibility: query ? "visible" : "hidden",
                                    pointerEvents: query ? "auto" : "none",
                                }}
                            >
                                <CloseRounded fontSize="small" />
                            </IconButton>
                        </SearchRoot> */}

                        {/* Mobile search icon */}
                        <IconButton
                            aria-label="Search"
                            sx={{ display: { xs: "inline-flex", sm: "none" } }}
                            onClick={() => setSearchOpen(true)}
                        >
                            <SearchRounded />
                        </IconButton>

                        {/* Sign in */}
                        <Button
                            disabled
                            variant="contained"
                            size="small"
                            sx={{ borderRadius: 999, ml: { xs: 0.5, sm: 1 } }}
                            onClick={() => console.log("sign in")}
                        >
                            Sign In
                        </Button>
                    </Toolbar>
                </AppBar>
            </Slide>

            {/* Mobile navigation drawer */}
            <Drawer
                anchor="left"
                open={navOpen}
                onClose={() => setNavOpen(false)}
                PaperProps={{ sx: { width: 260 } }}
            >
                <Box sx={{ px: 2, py: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {brand}
                    </Typography>
                </Box>
                <Divider />
                <List sx={{ py: 0 }}>
                    {navLinks.map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                selected={active === item.label}
                                onClick={() => {
                                    setActive(item.label);
                                    setNavOpen(false);
                                }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Mobile search drawer (top) */}
            <Drawer
                anchor="top"
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                PaperProps={{
                    sx: (t) => ({
                        bgcolor: alpha(t.palette.background.paper, 0.9),
                        backdropFilter: "blur(10px)",
                    }),
                }}
            >
                <Box
                    component="form"
                    role="search"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        if (query.trim()) console.log("search:", query);
                        setSearchOpen(false);
                    }}
                    sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                    <SearchRounded />
                    <InputBase
                        autoFocus
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        sx={{ flex: 1, fontSize: 16 }}
                    />
                    <IconButton aria-label="Close search" onClick={() => setSearchOpen(false)}>
                        <CloseRounded />
                    </IconButton>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        (Search logic will be added later)
                    </Typography>
                </Box>
            </Drawer>
        </>
    );
}
