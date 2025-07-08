import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UrlRedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const storedLinks =
      JSON.parse(localStorage.getItem("shortenedLinks")) || [];

    const match = storedLinks.find((item) =>
      item.shortUrl.endsWith(`/${shortcode}`)
    );

    if (match) {
      // Simulate logging click stats here (e.g., timestamp, source, location)
      window.location.href = match.longUrl;
    } else {
      alert("Short URL not found or expired.");
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
}
