import { useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export const useAutoplay = (emblaApi: EmblaCarouselType | undefined) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return;

    const handleReInit = () => {
      autoplay.play();
      setAutoplayIsPlaying(true);
    };

    autoplay.play(); // Start autoplay immediately
    setAutoplayIsPlaying(true);

    emblaApi.on("reInit", () => {
      autoplay.play(); // Restart on re-init
      setAutoplayIsPlaying(true);
    });

    return () => {
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi]);

  return { autoplayIsPlaying };
};
