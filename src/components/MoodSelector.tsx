import { motion } from "framer-motion";

interface Mood {
  id: string;
  label: string;
  icon: string;
}

interface MoodSelectorProps {
  onSelect: (mood: string) => void;
  selectedMood: string | null;
}

const moods: Mood[] = [
  { id: "happy", label: "Joyful", icon: "🌟" },
  { id: "sad", label: "Sorrowful", icon: "💭" },
  { id: "anxious", label: "Anxious", icon: "🍃" },
  { id: "grateful", label: "Grateful", icon: "✨" },
];

const MoodSelector = ({ onSelect, selectedMood }: MoodSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {moods.map((mood) => (
        <motion.button
          key={mood.id}
          onClick={() => onSelect(mood.id)}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedMood === mood.id
              ? "bg-sage text-cream shadow-lg"
              : "bg-cream text-sage border border-sage/20 hover:border-sage/40"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">{mood.icon}</span>
          {mood.label}
        </motion.button>
      ))}
    </div>
  );
};

export default MoodSelector;