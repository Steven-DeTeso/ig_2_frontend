import React from "react";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const CustomLink = styled(Box)(({ theme }) => ({
  color: "black",
  cursor: "pointer",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
}));

export default function NavButton({
  iconComponent: Icon,
  label,
  href,
  onClick,
  className,
}) {
  return (
    <CustomLink href={href} component="a" aria-label={label} onClick={onClick}>
      <Icon />
      <p>{label}</p>
    </CustomLink>
  );
}
