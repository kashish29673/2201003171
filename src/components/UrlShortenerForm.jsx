import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import {
  generateShortcode,
  validateUrl,
  validateMinutes,
} from "../utils/helper";

export default function UrlShortenerForm() {
  const [urlInputs, setUrlInputs] = useState([
    { longUrl: "", expiry: "", shortcode: "" },
  ]);

  const [results, setResults] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updated = [...urlInputs];
    updated[index][field] = value;
    setUrlInputs(updated);
  };

  const handleAddRow = () => {
    if (urlInputs.length < 5) {
      setUrlInputs([...urlInputs, { longUrl: "", expiry: "", shortcode: "" }]);
    }
  };

  const handleShorten = () => {
    const newResults = [];

    urlInputs.forEach((input, index) => {
      const { longUrl, expiry, shortcode } = input;

      if (!validateUrl(longUrl))
        return alert(`Invalid URL at row ${index + 1}`);
      if (expiry && !validateMinutes(expiry))
        return alert(`Invalid expiry time at row ${index + 1}`);

      const code = shortcode || generateShortcode();
      const expiresAt = expiry
        ? Date.now() + parseInt(expiry) * 60000
        : Date.now() + 1800000;

      newResults.push({
        longUrl,
        shortUrl: `http://localhost:3000/${code}`,
        code, //
        expiresAt,
        clicks: [],
      });
    });

    //Save to localStorage
    localStorage.setItem("shortenedLinks", JSON.stringify(newResults));

    setResults(newResults);

    console.log("Shortened URLs:", newResults);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Shorten URLs (Up to 5)
      </Typography>
      {urlInputs.map((input, i) => (
        <Paper key={i} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Long URL"
                value={input.longUrl}
                onChange={(e) =>
                  handleInputChange(i, "longUrl", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Expiry (mins)"
                value={input.expiry}
                onChange={(e) => handleInputChange(i, "expiry", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Custom Shortcode (optional)"
                value={input.shortcode}
                onChange={(e) =>
                  handleInputChange(i, "shortcode", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box mb={2}>
        <Button
          variant="outlined"
          onClick={handleAddRow}
          disabled={urlInputs.length >= 5}
        >
          + Add More
        </Button>
      </Box>

      <Button variant="contained" onClick={handleShorten}>
        Shorten All
      </Button>

      {results.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">Shortened URLs:</Typography>
          {results.map((res, i) => (
            <Paper key={i} sx={{ p: 2, my: 1 }}>
              <Typography>
                <strong>Original:</strong> {res.longUrl}
              </Typography>
              <Typography>
                <strong>Short:</strong>{" "}
                <a href={res.shortUrl}>{res.shortUrl}</a>
              </Typography>
              <Typography>
                <strong>Expires At::</strong> {res.expiresAt}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
