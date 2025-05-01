import React, { useState, useRef } from 'react';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Menu } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const { 
    currentBook,
    isPlaying,
    duration,
    currentTime,
    playbackRate,
    togglePlay,
    setPlaybackRate,
    seek,
  } = useAudioPlayer();

  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const progressRef = useRef<HTMLDivElement>(null);

  if (!currentBook) return null;

  // Format time in mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle click on progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-indigo-900/95 backdrop-blur-md text-white z-40 transition-all duration-300 ${
        isExpanded ? 'h-auto py-4' : 'h-16 sm:h-20'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Expanded View Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 py-1 px-4 rounded-t-lg text-white"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Book Cover & Info */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <img 
              src={currentBook.coverUrl}
              alt={currentBook.title}
              className="h-12 w-12 object-cover rounded-md"
            />
            <div className="truncate max-w-[150px] sm:max-w-[200px]">
              <h4 className="font-medium text-sm sm:text-base truncate">{currentBook.title}</h4>
              <p className="text-xs text-indigo-200 truncate">{currentBook.author.name}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex-grow flex flex-col items-center">
            {/* Main Controls */}
            <div className="flex items-center gap-4">
              <button className="text-indigo-200 hover:text-white transition-colors">
                <SkipBack className="h-5 w-5" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="bg-purple-500 hover:bg-purple-600 rounded-full p-2 transition-colors transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              
              <button className="text-indigo-200 hover:text-white transition-colors">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-2 px-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-indigo-200">{formatTime(currentTime)}</span>
                <div 
                  ref={progressRef}
                  className="flex-grow h-2 bg-indigo-700 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="absolute h-full bg-purple-500 transition-all duration-100"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                <span className="text-indigo-200">{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Volume & Playback Rate Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMute}
              className="text-indigo-200 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>

            {/* Playback Rate Dropdown (only show in expanded view) */}
            {isExpanded && (
              <select
                value={playbackRate}
                onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                className="bg-indigo-800 border border-indigo-600 rounded text-sm py-1 px-2"
              >
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            )}
          </div>
        </div>

        {/* Extended Controls (Visible only when expanded) */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-indigo-700">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Speed:</span>
                <div className="flex bg-indigo-800 rounded overflow-hidden">
                  {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setPlaybackRate(rate)}
                      className={`px-3 py-1 text-sm transition-colors ${
                        playbackRate === rate ? 'bg-purple-600 text-white' : 'text-indigo-200 hover:bg-indigo-700'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm">Volume:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setVolume(val);
                    if (val === 0) {
                      setIsMuted(true);
                    } else if (isMuted) {
                      setIsMuted(false);
                    }
                  }}
                  className="w-24 accent-purple-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;