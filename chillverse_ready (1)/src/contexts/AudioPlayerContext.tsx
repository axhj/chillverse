import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AudioBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  audioUrl: string;
}

interface AudioPlayerContextType {
  currentBook: AudioBook | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playbackRate: number;
  playBook: (book: AudioBook) => void;
  togglePlay: () => void;
  setPlaybackRate: (rate: number) => void;
  seek: (time: number) => void;
  saveBookmark: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider = ({ children }: AudioPlayerProviderProps) => {
  const [audio] = useState(new Audio());
  const [currentBook, setCurrentBook] = useState<AudioBook | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    // Load saved bookmark if exists
    const loadSavedProgress = () => {
      if (currentBook) {
        const savedProgress = localStorage.getItem(`bookmark_${currentBook.id}`);
        if (savedProgress) {
          const time = parseFloat(savedProgress);
          audio.currentTime = time;
          setCurrentTime(time);
        }
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      loadSavedProgress();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      audio.currentTime = 0;
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio, currentBook]);

  useEffect(() => {
    if (currentBook) {
      audio.src = currentBook.audioUrl;
      audio.load();
    }
  }, [audio, currentBook]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [audio, isPlaying]);

  useEffect(() => {
    audio.playbackRate = playbackRate;
  }, [audio, playbackRate]);

  // Save progress every 5 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (currentBook && isPlaying) {
        saveBookmark();
      }
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [currentBook, isPlaying]);

  const playBook = (book: AudioBook) => {
    setCurrentBook(book);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const saveBookmark = () => {
    if (currentBook) {
      localStorage.setItem(`bookmark_${currentBook.id}`, audio.currentTime.toString());
    }
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentBook,
        isPlaying,
        duration,
        currentTime,
        playbackRate,
        playBook,
        togglePlay,
        setPlaybackRate,
        seek,
        saveBookmark,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};