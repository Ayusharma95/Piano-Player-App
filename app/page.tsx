import PianoSynth from '@/components/PianoSynth';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Piano Synthesizer</h1>
      <PianoSynth />
    </main>
  );
}