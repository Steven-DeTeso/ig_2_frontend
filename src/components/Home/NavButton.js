import React from "react";
import Link from "next/link";
import { styled } from "@mui/system";
import { Box } from "@mui/material";

const CustomLink = styled(Box)(({ theme }) => ({
  color: "black",
  cursor: "pointer",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "your-custom-hover-text-decoration",
  },
}));

export default function NavButton({ iconComponent: Icon, label, href }) {
  return (
    <CustomLink href={href} component="a" aria-label={label}>
      <Icon />
      <p>{label}</p>
    </CustomLink>
  );
}
