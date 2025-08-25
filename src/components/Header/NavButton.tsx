import { Button } from "@mui/material";

export const NavButton =({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) => {
    return (
        <Button
            onClick={onClick}
            size="small"
            disableRipple
            aria-current={active ? "page" : undefined}
            sx={{
                position: "relative",
                px: 1.25,
                color: active ? "text.primary" : "text.secondary",
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { color: "text.primary", background: "transparent" },
                "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 8,
                    right: 8,
                    bottom: 4,
                    height: 2,
                    borderRadius: 1,
                    backgroundColor: "primary.main",
                    transform: active ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 200ms ease",
                },
                // hover underline animation for non-active
                "&:hover::after": { transform: "scaleX(1)" },
            }}
        >
            {label}
        </Button>
    );
}