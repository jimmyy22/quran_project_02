interface VerseInsight {
  context: string;
  lesson: string;
}

export const getAIVerseInsights = async (verse: { arabic: string; translation: string; reference: string }, mood: string): Promise<VerseInsight> => {
  const API_KEY = 'API key'; // Empty key will trigger fallback content

  try {
    if (!API_KEY) {
      console.log('No API key provided, using fallback content');
      return getFallbackInsights(verse, mood);
    }

    const prompt = `
      Analyze this Quranic verse in detail:
      Reference: ${verse.reference}
      Translation: ${verse.translation}
      Current mood: ${mood}

      Provide two things:
      1. Historical Context (max 50 words): Explain when and why this verse was revealed, including the specific circumstances, time period, and significance during the Prophet's ﷺ life.
      2. Personal Reflection (max 40 words): Provide a creative, mood-specific lesson that connects this verse to the reader's current emotional state (${mood}). Make it practical and relatable to modern life while maintaining Islamic authenticity.very accurate and short
      
      Format your response exactly as:
      Context: [historical context]
      Lesson: [personal reflection]
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      console.error('Failed to get AI insights, status:', response.status);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      return getFallbackInsights(verse, mood);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    const parts = content.split('Lesson:');
    if (parts.length < 2) {
      console.log('Invalid AI response format, using fallback content');
      return getFallbackInsights(verse, mood);
    }

    return {
      context: parts[0].replace('Context:', '').trim(),
      lesson: parts[1].trim()
    };
  } catch (error) {
    console.error('Error getting AI insights:', error);
    return getFallbackInsights(verse, mood);
  }
};

const getFallbackInsights = (verse: { reference: string }, mood: string): VerseInsight => ({
  context: getVerseContext(verse.reference),
  lesson: getLessonLearned(verse, mood)
});
//default lessons
const getLessonLearned = (verse: { reference: string }, mood: string): string => {
  const lessons = {
    happy: {
      "Surah Ad-Duha": "This verse reminds us that true happiness comes from divine guidance and gratitude.",
      "Surah An-Nahl": "Good deeds and faith lead to lasting contentment in this life and the next.",
      "Surah Ali 'Imran": "Joy comes from following Allah's path and seeking His pleasure.",
      default: "Find happiness through connection with Allah and serving others."
    },
    sad: {
      "Surah Al-Baqarah": "Every difficulty is a test that strengthens our faith and character.",
      "Surah Ali 'Imran": "Hardships are temporary; maintain hope and trust in Allah's plan.",
      default: "Every trial is an opportunity for spiritual growth and closer connection to Allah."
    },
    anxious: {
      "Surah Ar-Ra'd": "True peace comes through remembrance of Allah and trust in His plan.",
      "Surah Al-Baqarah": "Prayer and patience are our shields against worry and fear.",
      default: "Anxiety diminishes through spiritual connection and trust in Allah."
    },
    grateful: {
      "Surah Ibrahim": "Gratitude increases Allah's blessings and deepens our faith.",
      "Surah Ar-Rahman": "Recognizing Allah's endless favors leads to more blessings.",
      default: "Gratitude opens doors to more blessings and spiritual awareness."
    }
  };

  const surahName = verse.reference.split(" (")[0];
  const moodLessons = lessons[mood as keyof typeof lessons];
  return moodLessons[surahName as keyof typeof moodLessons] || moodLessons.default;
};

const getVerseContext = (reference: string): string => {
  const contexts = {
    "Surah Ad-Duha": "Revealed during a period when divine revelation had paused, bringing comfort to the Prophet ﷺ.",
    "Surah Al-Baqarah": "The longest surah, providing guidance for the newly formed Muslim community in Madinah.",
    "Surah Ar-Ra'd": "Discusses signs of Allah in creation and human consciousness.",
    "Surah Ibrahim": "Emphasizes gratitude versus ingratitude through Prophet Ibrahim's example.",
    "Surah An-Nahl": "Points to Allah's perfect creation and numerous blessings.",
    "Surah Ali 'Imran": "Addresses the Muslim community after the Battle of Uhud.",
    default: "This verse provides timeless wisdom and guidance for humanity."
  };

  const surahName = reference.split(" (")[0];
  return contexts[surahName as keyof typeof contexts] || contexts.default;
};
