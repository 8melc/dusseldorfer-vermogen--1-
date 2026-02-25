import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  User,
  Clock,
  SkipForward,
  SkipBack,
  Star,
  Download,
  MessageSquare,
  Headphones,
  Share2,
  Bell,
} from "lucide-react";
import { ShareDropdown } from "components/ShareDropdown";
import { Avatar } from "@/components/ui/avatar";

export interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  voiceGender: "male" | "female" | "neutral";
  onSave?: () => void;
  articleText: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  title,
  voiceGender,
  onSave,
  articleText
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(60); // Default 60 seconds for Express format
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("express");
  const [playbackRate, setPlaybackRate] = useState(1.0);

  // Formate für die Audio-Wiedergabe
  const formats = [
    { id: "express", title: "Express", icon: "⚡", duration: "60 Sek.", available: true },
    { id: "full", title: "Volle Länge", icon: "🎧", duration: "3-5 Min.", available: false },
    { id: "podcast", title: "Podcast", icon: "🎙️", duration: "15+ Min.", available: false }
  ];

  // Effect to set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    // Cleanup
    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Effect to handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Effect to handle playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const handleRateChange = (value: number[]) => {
    setPlaybackRate(value[0]);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const [urlToShare, setUrlToShare] = useState("");

  useEffect(() => {
    // Stellt sicher, dass der Code nur auf dem Client ausgeführt wird, wo 'window' verfügbar ist
    if (typeof window !== "undefined") {
      setUrlToShare(window.location.href);
    }
  }, []);

  return (
    <div className="w-full rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header mit Premium-Badge */}
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col">
          <h3 className="font-bold text-xl text-gray-800 flex items-center">
            <Headphones className="w-5 h-5 mr-2 text-[#C8A96F]" />
            Market Insight in 60 Sekunden
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Sparen Sie Zeit mit unserer Audio-Zusammenfassung
          </p>
        </div>
        <div className="bg-[#C8A96F] text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 mr-1" />
          <span>PREMIUM</span>
        </div>
      </div>

      {/* Format-Auswahl */}
      <div className="p-4 sm:px-6 border-b border-gray-100">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          Wählen Sie Ihr bevorzugtes Format:
        </p>
        <div className="flex flex-wrap gap-2">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => format.available && setSelectedFormat(format.id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm ${
                selectedFormat === format.id
                  ? "bg-[#C8A96F] text-white"
                  : format.available
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
              }`}
              disabled={!format.available}
            >
              <span className="font-medium">
                {format.icon} {format.title}
              </span>
              <span className="text-xs ml-1">({format.duration})</span>
              {!format.available && (
                <span className="text-xs bg-gray-200 text-gray-500 px-1 rounded ml-1">
                  Bald
                </span>
              )}
            </button>
          ))}
        </div>
        {selectedFormat === "express" && (
          <p className="text-xs text-gray-500 mt-2">
            Ideal für unterwegs - die wichtigsten Erkenntnisse in nur 60 Sekunden
          </p>
        )}
      </div>

      {/* Stimmen-Auswahl */}
      <div className="p-4 sm:px-6 border-b border-gray-100">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          Wählen Sie eine Stimme:
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() =>
              voiceGender === "male" || voiceGender === "female" ? null : null
            }
            className={`px-4 py-2 rounded-md flex items-center ${
              voiceGender === "male"
                ? "bg-[#C8A96F] text-white ring-1 ring-[#C8A96F]/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-sm font-medium text-gray-700">C</span>
            </div>
            <span className="font-medium">Christian (männlich)</span>
          </button>
          <button
            onClick={() =>
              voiceGender === "male" || voiceGender === "female" ? null : null
            }
            className={`px-4 py-2 rounded-md flex items-center ${
              voiceGender === "female"
                ? "bg-[#C8A96F] text-white ring-1 ring-[#C8A96F]/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-sm font-medium text-gray-700">A</span>
            </div>
            <span className="font-medium">Anna (weiblich)</span>
          </button>
          <button
            className="px-4 py-2 rounded-md flex items-center bg-gray-100 text-gray-400 cursor-not-allowed opacity-60"
            disabled
          >
            <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
              <span className="text-sm font-medium text-gray-400">X</span>
            </div>
            <span className="font-medium">Alex (neutral)</span>
            <span className="text-xs bg-gray-200 text-gray-500 px-1 rounded ml-2">
              Demnächst
            </span>
          </button>
        </div>
      </div>

      {/* Tempo-Steuerung */}
      <div className="p-4 sm:px-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">Tempo:</p>
          <span className="text-sm font-medium text-gray-700">
            {playbackRate.toFixed(1)}x
          </span>
        </div>
        <Slider
          value={[playbackRate]}
          min={0.8}
          max={1.5}
          step={0.1}
          onValueChange={handleRateChange}
          className="w-full mt-2"
          aria-label="Wiedergabegeschwindigkeit"
        />
      </div>

      {/* Player-Interface */}
      <div className="p-4 sm:p-6 bg-gray-50">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="w-4 h-4 mr-1" />
          <span>
            {voiceGender === "male" ? "Männliche" : "Weibliche"} Stimme •{" "}
            {formats.find((f) => f.id === selectedFormat)?.duration}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>

        {/* Progress Bar */}
        <Slider
          value={[currentTime]}
          max={duration || 100}
          step={1}
          onValueChange={handleProgressChange}
          className="w-full mb-4"
          aria-label="Audio-Fortschritt"
        />

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button
              size="lg"
              className="rounded-full h-12 w-12 mr-4 transition-transform hover:scale-105"
              style={{ backgroundColor: "#C8A96F" }}
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Abspielen"}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white pl-0.5" />
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Ton an" : "Stummschalten"}
                className="hover:bg-gray-200"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-5 w-5 text-gray-600" />
                ) : (
                  <Volume2 className="h-5 w-5 text-gray-600" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
                aria-label="Lautstärkeregler"
              />
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                disabled
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-200"
                disabled
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#C8A96F] hover:text-[#B69960] hover:bg-gray-200"
            >
              <Download className="w-5 h-5" />
            </Button>
            <ShareDropdown
              urlToShare={urlToShare}
              titleToShare={title}
              onSave={onSave}
            />
          </div>
        </div>
      </div>

      {/* War diese Zusammenfassung hilfreich? */}
      <div className="p-4 sm:px-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">
          War diese Zusammenfassung hilfreich?
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-gray-600">
            <span className="mr-1">👍</span> Ja
          </Button>
          <Button variant="outline" size="sm" className="text-gray-600">
            <span className="mr-1">👎</span> Nein
          </Button>
        </div>
      </div>

      {/* Finanzkompass-Link */}
      <div className="p-4 sm:px-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700">
          <b>Haben Sie Fragen? Nutzen Sie unseren FinanzKompass</b> – präzise
          Antworten auf komplexe Fragen zu Ihrer individuellen Vermögensstrategie.
        </p>
        <Button
          variant="ghost"
          className="mt-2 text-[#C8A96F] hover:text-[#B69960] p-0 h-auto"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          <span className="font-medium">FinanzKompass starten</span>
        </Button>
      </div>

      {/* "Coming Soon"-Feature */}
      <div className="p-4 sm:px-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700">
          <b>Von Snippet zum tiefgehenden Podcast</b> – bald verfügbar
        </p>
        <div className="flex mt-2">
          <Button
            variant="ghost"
            className="text-gray-400 cursor-not-allowed p-0 h-auto"
            disabled
          >
            <Headphones className="w-4 h-4 mr-1" />
            <span className="font-medium">Bald verfügbar</span>
          </Button>
          <Button
            variant="ghost"
            className="ml-4 text-[#C8A96F] hover:text-[#B69960] p-0 h-auto"
          >
            <Bell className="w-4 h-4 mr-1" />
            <span className="font-medium">Benachrichtigen</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
