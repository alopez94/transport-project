import React, { useState, useEffect } from 'react';

const SLIDESHOW_INTERVAL = 5000; // Interval duration in milliseconds

export default function Slideshow({ videos }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (videos.length === 0) {
      console.error('No videos provided for the slideshow.');
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, SLIDESHOW_INTERVAL);

    return () => clearInterval(intervalId);
  }, [videos.length]);

  if (!videos[currentSlideIndex]) {
    console.error(`Invalid video index: ${currentSlideIndex}`);
    return null;
  }

  return (
    <video
      autoPlay
      controls
      className="slide"
      onEnded={() => setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % videos.length)}
    >
      <source src={videos[currentSlideIndex]} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
