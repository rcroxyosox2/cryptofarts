import { useEffect, useState } from "react";

const useAudio = (url) => {
  const getAudioFromURL = (url) => url ? new Audio(url) : null;
  const [audio, setAudio] = useState(getAudioFromURL(url));
  const [playing, setPlaying] = useState(false);

  const toggle = (url) => {
    url && setAudio(getAudioFromURL(url));
    setPlaying(!playing);
  };

  useEffect(() => {
    playing ? audio?.play() : audio?.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio?.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio?.removeEventListener("ended", () => setPlaying(false));
    };
  }, );

  return [playing, toggle];
};

export default useAudio;
