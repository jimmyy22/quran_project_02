import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import MoodSelector from "../components/MoodSelector";
import VerseDisplay from "../components/VerseDisplay";
import IslamicStories from "../components/IslamicStories";
import { fetchVerseByMood } from "../utils/quranApi";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: verse, isLoading } = useQuery({
    queryKey: ['verse', selectedMood, refreshKey],
    queryFn: () => selectedMood ? fetchVerseByMood(selectedMood) : null,
    enabled: !!selectedMood && refreshKey > 0,
    staleTime: Infinity,
    gcTime: Infinity,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch the verse. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const handleGenerateNew = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setRefreshKey(1); // Initial load when mood is selected
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-cream/95 px-4 py-8">
      <IslamicStories />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-8"
      >
        <h1 className="text-4xl font-serif text-sage mb-4">The Quran Revival</h1>
        <p className="text-sage/70 text-lg">
          Find solace in divine words that resonate with your heart
        </p>
      </motion.div>

      <div className="text-center mb-4">
        <h2 className="text-lg font-medium text-sage/80">Select Your Mood</h2>
      </div>

      <MoodSelector onSelect={handleMoodSelect} selectedMood={selectedMood} />

      {isLoading && (
        <div className="mt-8 text-center text-sage">
          Loading verse...
        </div>
      )}

      {verse && (
        <div className="mt-8">
          <VerseDisplay 
            verse={verse} 
            onGenerateNew={handleGenerateNew}
            mood={selectedMood || ''}
          />
        </div>
      )}

      <footer className="text-center text-sage/60 text-sm mt-12">
        Created by Mujtaba
      </footer>
    </div>
  );
};

export default Index;