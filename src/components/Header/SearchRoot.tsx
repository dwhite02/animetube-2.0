import { alpha, styled } from "@mui/material/styles";

export const SearchRoot = styled("form")(({ theme }) => ({
    position: "relative",
    borderRadius: 999,
    backgroundColor: alpha(theme.palette.common.white, 0.06),
    border: `1px solid ${alpha(theme.palette.common.white, 0.12)}`,
    display: "none", // hidden on xs; shown from sm+
    alignItems: "center",
    gap: 6,
    padding: "2px 8px",
    width: 200,
    transition: theme.transitions.create(["width", "background-color", "border-color"], { duration: 200 }),
    [theme.breakpoints.up("sm")]: { display: "flex" },
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.10) },
    "&:focus-within": {
        width: 320,
        backgroundColor: alpha(theme.palette.common.white, 0.12),
        borderColor: alpha(theme.palette.common.white, 0.2),
    },
}));