
'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type Note = {
  note: string;
  frequency: number;
  isSharp: boolean;
  key: string;
};

const NOTES: Note[] = [
  { note: 'C4', frequency: 261.63, isSharp: false, key: 'a' },
  { note: 'C#4', frequency: 277.18, isSharp: true, key: 'w' },
  { note: 'D4', frequency: 293.66, isSharp: false, key: 's' },
  { note: 'D#4', frequency: 311.13, isSharp: true, key: 'e' },
  { note: 'E4', frequency: 329.63, isSharp: false, key: 'd' },
  { note: 'F4', frequency: 349.23, isSharp: false, key: 'f' },
  { note: 'F#4', frequency: 369.99, isSharp: true, key: 't' },
  { note: 'G4', frequency: 392.00, isSharp: false, key: 'g' },
  { note: 'G#4', frequency: 415.30, isSharp: true, key: 'y' },
  { note: 'A4', frequency: 440.00, isSharp: false, key: 'h' },
  { note: 'A#4', frequency: 466.16, isSharp: true, key: 'u' },
  { note: 'B4', frequency: 493.88, isSharp: false, key: 'j' },
  { note: 'C5', frequency: 523.25, isSharp: false, key: 'k' },
];

let audioContext: AudioContext | null = null;

export default function PianoSynth() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const activeNotesRef = useRef(new Set<string>());

  useEffect(() => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const note = NOTES.find(n => n.key === e.key.toLowerCase());
      if (note && !activeNotesRef.current.has(note.note)) {
        playNote(note.frequency);
        setActiveNotes(prev => {
          const next = new Set(prev);
          next.add(note.note);
          activeNotesRef.current = next;
          return next;
        });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = NOTES.find(n => n.key === e.key.toLowerCase());
      if (note) {
        setActiveNotes(prev => {
          const next = new Set(prev);
          next.delete(note.note);
          activeNotesRef.current = next;
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const playNote = (frequency: number) => {
    try {
      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.error("Error playing note:", error);
    }
  };

  const handleNoteClick = (note: Note) => {
    if (!audioContext) {
      audioContext = new AudioContext();
    }
    playNote(note.frequency);
    setActiveNotes(prev => {
      const next = new Set(prev);
      next.add(note.note);
      activeNotesRef.current = next;
      return next;
    });
    setTimeout(() => {
      setActiveNotes(prev => {
        const next = new Set(prev);
        next.delete(note.note);
        activeNotesRef.current = next;
        return next;
      });
    }, 200);
  };

  return (
    <div className="relative w-full max-w-4xl">
      <div className="flex justify-center relative">
        {NOTES.map((note) => (
          <div
            key={note.note}
            className={cn(
              'relative',
              note.isSharp ? 'w-10 mr-[-1rem] z-10' : 'w-14'
            )}
          >
            <button
              onClick={() => handleNoteClick(note)}
              className={cn(
                'transition-colors duration-100 border border-gray-300',
                note.isSharp
                  ? 'bg-gray-800 hover:bg-gray-700 active:bg-gray-600 h-32 w-full'
                  : 'bg-white hover:bg-gray-100 active:bg-gray-200 h-48 w-full',
                activeNotes.has(note.note) && (note.isSharp ? 'bg-gray-600' : 'bg-gray-200'),
                note.isSharp ? 'rounded-b-md' : 'rounded-b-lg'
              )}
              aria-label={note.note}
            />
            <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
              {note.key}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-300">
        <p>Use your keyboard to play! Keys are mapped as shown on the piano.</p>
      </div>
    </div>
  );
}
