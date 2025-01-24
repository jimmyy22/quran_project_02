import { motion } from "framer-motion";
import { Play, Pause, RefreshCw, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { getAIVerseInsights } from "../utils/verseInsights";
import { useToast } from "./ui/use-toast";

interface VerseDisplayProps {
  verse: {
    arabic: string;
    translation: string;
    audio: string;
    reference: string;
  };
  onGenerateNew: () => void;
  mood: string;
}

const VerseDisplay = ({ verse, onGenerateNew, mood }: VerseDisplayProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(verse.audio));
  const [lesson, setLesson] = useState('Loading insights...');
  const [context, setContext] = useState('Loading context...');
  const { toast } = useToast();

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const insights = await getAIVerseInsights(verse, mood);
        setLesson(insights.lesson);
        setContext(insights.context);
      } catch (error) {
        console.error('Error fetching AI insights:', error);
        toast({
          title: "Couldn't fetch AI insights",
          description: "Using standard insights instead.",
          variant: "destructive",
        });
      }
    };

    fetchInsights();
  }, [verse, mood]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  audio.onended = () => setIsPlaying(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-xl mx-auto p-4 sm:p-6 rounded-2xl bg-cream/50 backdrop-blur-sm"
    >
      <div className="text-right mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-arabic text-sage leading-relaxed">{verse.arabic}</h2>
      </div>
      
      <div className="mb-6 sm:mb-8">
        <p className="text-sm sm:text-base md:text-lg text-sage/80 leading-relaxed">{verse.translation}</p>
      </div>

      <div className="mb-6 p-4 sm:p-5 bg-sage/10 rounded-lg border border-sage/20 shadow-sm">
        <h3 className="text-sm font-medium text-sage mb-3 uppercase tracking-wide">Lesson Learned:</h3>
        <p className="text-sm sm:text-base text-sage/90 leading-relaxed font-serif italic">{lesson}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-6 sm:mt-8">
        <span className="text-xs text-sage/60 w-full sm:w-auto">{verse.reference}</span>
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
          <Button
            onClick={onGenerateNew}
            variant="outline"
            size="sm"
            className="text-sage hover:text-sage/90 border-sage/20 w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Another
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-sage hover:text-sage/90 border-sage/20 w-full sm:w-auto"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                View Context
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-cream max-w-[90vw] md:max-w-lg mx-auto">
              <DialogHeader>
                <DialogTitle className="text-sage">Historical Context</DialogTitle>
                <DialogDescription className="text-sage/80">
                  {context}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <motion.button
            onClick={toggleAudio}
            className="p-3 rounded-full bg-sage text-cream hover:bg-sage/90 transition-colors ml-auto sm:ml-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VerseDisplay;