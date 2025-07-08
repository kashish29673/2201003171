// src/components/StatsPage.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function StatsPage() {
  const storedLinks = JSON.parse(localStorage.getItem("shortenedLinks")) || [];

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        URL Stats
      </Typography>
      {storedLinks.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        storedLinks.map((link, i) => (
          <Paper key={i} sx={{ p: 2, my: 2 }}>
            <Typography>
              <strong>Original URL:</strong> {link.longUrl}
            </Typography>
            <Typography>
              <strong>Short URL:</strong>{" "}
              <a href={link.shortUrl}>{link.shortUrl}</a>
            </Typography>
            <Typography>
              <strong>Expires At:</strong> {link.expiresAt}
            </Typography>
            <Typography>
              <strong>Total Clicks:</strong> {link.clicks?.length || 0}
            </Typography>
            {link.clicks &&
              link.clicks.map((click, j) => (
                <Typography key={j} sx={{ pl: 2 }}>
                  - {click.timestamp} from {click.source || "unknown"} at{" "}
                  {click.location || "unknown"}
                </Typography>
              ))}
          </Paper>
        ))
      )}
    </Box>
  );
}
