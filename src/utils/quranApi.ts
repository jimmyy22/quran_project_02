interface QuranVerse {
  number: number;
  arabic: string;
  translation: string;
  audio: string;
  reference: string;
}

// mood-specific verse ranges with more relevant verses
//TO DO :using gemini to generate verses  based on mood 
const moodVerseRanges = {
  happy: [
    // Verses about joy and good news
    { surah: 93, verse: 5 }, // Ad-Duha
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 2, verse: 152 }, // Al-Baqarah
    { surah: 16, verse: 97 }, // An-Nahl
    { surah: 3, verse: 170 }, // Ali 'Imran
    { surah: 39, verse: 34 }, // Az-Zumar
    { surah: 10, verse: 58 }, // Yunus
    { surah: 33, verse: 47 }, // Al-Ahzab
    { surah: 16, verse: 32 }, // An-Nahl
    { surah: 13, verse: 28 }, // Ar-Ra'd
    { surah: 39, verse: 10 }, // Az-Zumar
    { surah: 21, verse: 90 }, // Al-Anbya
    { surah: 9, verse: 105 }, // At-Tawbah
    { surah: 103, verse: 3 }, // Al-Asr
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 2, verse: 186 }, // Al-Baqarah
    { surah: 93, verse: 11 }, // Ad-Duha
    { surah: 15, verse: 49 }, // Al-Hijr
    { surah: 33, verse: 43 }, // Al-Ahzab
    { surah: 2, verse: 218 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 94, verse: 8 }, // Ash-Sharh
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 2, verse: 195 }, // Al-Baqarah
    { surah: 3, verse: 146 }, // Ali 'Imran
    { surah: 2, verse: 155 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 93, verse: 5 }, // Ad-Duha
    { surah: 21, verse: 35 }, // Al-Anbya
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 8, verse: 46 }, // Al-Anfal
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 103, verse: 3 }, // Al-Asr
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 2, verse: 155 }, // Al-Baqarah
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 2, verse: 155 }, // Al-Baqarah
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 16, verse: 97 }, // An-Nahl
    { surah: 39, verse: 10 }, // Az-Zumar
    { surah: 3, verse: 170 }, // Ali 'Imran
    { surah: 10, verse: 58 }, // Yunus
    { surah: 33, verse: 47 }, // Al-Ahzab
    { surah: 16, verse: 32 }, // An-Nahl
    { surah: 13, verse: 28 }, // Ar-Ra'd
  ],
  sad: [
    // Verses about patience, hope, and overcoming hardship
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 2, verse: 155 }, // Al-Baqarah
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 12, verse: 87 }, // Yusuf
    { surah: 2, verse: 214 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 3, verse: 186 }, // Ali 'Imran
    { surah: 2, verse: 157 }, // Al-Baqarah
    { surah: 21, verse: 83 }, // Al-Anbya
    { surah: 12, verse: 86 }, // Yusuf
    { surah: 2, verse: 156 }, // Al-Baqarah
    { surah: 3, verse: 146 }, // Ali 'Imran
    { surah: 39, verse: 53 }, // Az-Zumar
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 2, verse: 155 }, // Al-Baqarah
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 12, verse: 87 }, // Yusuf
    { surah: 2, verse: 214 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 3, verse: 186 }, // Ali 'Imran
    { surah: 2, verse: 157 }, // Al-Baqarah
    { surah: 21, verse: 83 }, // Al-Anbya
    { surah: 12, verse: 86 }, // Yusuf
    { surah: 2, verse: 156 }, // Al-Baqarah
    { surah: 3, verse: 146 }, // Ali 'Imran
    { surah: 39, verse: 53 }, // Az-Zumar
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 2, verse: 155 }, // Al-Baqarah
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 65, verse: 7 }, // At-Talaq
    { surah: 94, verse: 6 }, // Ash-Sharh
    { surah: 3, verse: 200 }, // Ali 'Imran
    { surah: 2, verse: 216 }, // Al-Baqarah
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 12, verse: 87 }, // Yusuf
    { surah: 2, verse: 214 }, // Al-Baqarah
    { surah: 94, verse: 5 }, // Ash-Sharh
    { surah: 3, verse: 186 }, // Ali 'Imran
    { surah: 2, verse: 157 }, // Al-Baqarah
    { surah: 21, verse: 83 }, // Al-Anbya
    { surah: 12, verse: 86 }, // Yusuf
    { surah: 2, verse: 156 }, // Al-Baqarah
    { surah: 3, verse: 146 }, // Ali 'Imran
    { surah: 39, verse: 53 }, // Az-Zumar
  ],
  anxious: [
    // Verses about peace, trust in Allah, and relief from anxiety
    { surah: 13, verse: 28 }, // Ar-Ra'd
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 20, verse: 46 }, // Ta-Ha
    { surah: 3, verse: 160 }, // Ali 'Imran
    { surah: 65, verse: 3 }, // At-Talaq
    { surah: 94, verse: 8 }, // Ash-Sharh
    { surah: 2, verse: 255 }, // Al-Baqarah (Ayatul Kursi)
    { surah: 3, verse: 173 }, // Ali 'Imran
    { surah: 8, verse: 2 }, // Al-Anfal
    { surah: 39, verse: 36 }, // Az-Zumar
    { surah: 10, verse: 57 }, // Yunus
    { surah: 2, verse: 112 }, // Al-Baqarah
    { surah: 33, verse: 3 }, // Al-Ahzab
    { surah: 29, verse: 45 }, // Al-Ankabut
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 3, verse: 159 }, // Ali 'Imran
    { surah: 48, verse: 4 }, // Al-Fath
    { surah: 16, verse: 89 }, // An-Nahl
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 20, verse: 46 }, // Ta-Ha
    { surah: 3, verse: 160 }, // Ali 'Imran
    { surah: 65, verse: 3 }, // At-Talaq
    { surah: 94, verse: 8 }, // Ash-Sharh
    { surah: 2, verse: 255 }, // Al-Baqarah
    { surah: 3, verse: 173 }, // Ali 'Imran
    { surah: 8, verse: 2 }, // Al-Anfal
    { surah: 39, verse: 36 }, // Az-Zumar
    { surah: 10, verse: 57 }, // Yunus
    { surah: 2, verse: 112 }, // Al-Baqarah
    { surah: 33, verse: 3 }, // Al-Ahzab
    { surah: 29, verse: 45 }, // Al-Ankabut
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 3, verse: 159 }, // Ali 'Imran
    { surah: 48, verse: 4 }, // Al-Fath
    { surah: 16, verse: 89 }, // An-Nahl
    { surah: 13, verse: 28 }, // Ar-Ra'd
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 20, verse: 46 }, // Ta-Ha
    { surah: 3, verse: 160 }, // Ali 'Imran
    { surah: 65, verse: 3 }, // At-Talaq
    { surah: 94, verse: 8 }, // Ash-Sharh
    { surah: 2, verse: 255 }, // Al-Baqarah
    { surah: 3, verse: 173 }, // Ali 'Imran
    { surah: 8, verse: 2 }, // Al-Anfal
    { surah: 39, verse: 36 }, // Az-Zumar
    { surah: 10, verse: 57 }, // Yunus
    { surah: 2, verse: 112 }, // Al-Baqarah
    { surah: 33, verse: 3 }, // Al-Ahzab
    { surah: 29, verse: 45 }, // Al-Ankabut
    { surah: 2, verse: 286 }, // Al-Baqarah
    { surah: 3, verse: 159 }, // Ali 'Imran
    { surah: 48, verse: 4 }, // Al-Fath
    { surah: 16, verse: 89 }, // An-Nahl
    { surah: 13, verse: 28 }, // Ar-Ra'd
    { surah: 2, verse: 153 }, // Al-Baqarah
    { surah: 3, verse: 139 }, // Ali 'Imran
    { surah: 9, verse: 40 }, // At-Tawbah
    { surah: 20, verse: 46 }, // Ta-Ha
  ],
  grateful: [
    // Verses about gratitude and appreciation
    { surah: 14, verse: 7 }, // Ibrahim
    { surah: 55, verse: 13 }, // Ar-Rahman
    { surah: 27, verse: 19 }, // An-Naml
    { surah: 2, verse: 152 }, // Al-Baqarah
    { surah: 31, verse: 12 }, // Luqman
    { surah: 39, verse: 7 }, // Az-Zumar
    { surah: 16, verse: 18 }, // An-Nahl
    { surah: 7, verse: 58 }, // Al-A'raf
    { surah: 34, verse: 13 }, // Saba
    { surah: 27, verse: 40 }, // An-Naml
    { surah: 16, verse: 114 }, // An-Nahl
    { surah: 2, verse: 172 }, // Al-Baqarah
    { surah: 25, verse: 62 }, // Al-Furqan
    { surah: 54, verse: 35 }, // Al-Qamar
    { surah: 16, verse: 78 }, // An-Nahl
    { surah: 14, verse: 34 }, // Ibrahim
    { surah: 3, verse: 145 }, // Ali 'Imran
    { surah: 29, verse: 17 }, // Al-Ankabut
    { surah: 31, verse: 31 }, // Luqman
    { surah: 16, verse: 53 }, // An-Nahl
    { surah: 14, verse: 7 }, // Ibrahim
    { surah: 55, verse: 13 }, // Ar-Rahman
    { surah: 27, verse: 19 }, // An-Naml
    { surah: 2, verse: 152 }, // Al-Baqarah
    { surah: 31, verse: 12 }, // Luqman
    { surah: 39, verse: 7 }, // Az-Zumar
    { surah: 16, verse: 18 }, // An-Nahl
    { surah: 7, verse: 58 }, // Al-A'raf
    { surah: 34, verse: 13 }, // Saba
    { surah: 27, verse: 40 }, // An-Naml
    { surah: 16, verse: 114 }, // An-Nahl
    { surah: 2, verse: 172 }, // Al-Baqarah
    { surah: 25, verse: 62 }, // Al-Furqan
    { surah: 54, verse: 35 }, // Al-Qamar
    { surah: 16, verse: 78 }, // An-Nahl
    { surah: 14, verse: 34 }, // Ibrahim
    { surah: 3, verse: 145 }, // Ali 'Imran
    { surah: 29, verse: 17 }, // Al-Ankabut
    { surah: 31, verse: 31 }, // Luqman
    { surah: 16, verse: 53 }, // An-Nahl
    { surah: 14, verse: 7 }, // Ibrahim
    { surah: 55, verse: 13 }, // Ar-Rahman
    { surah: 27, verse: 19 }, // An-Naml
    { surah: 2, verse: 152 }, // Al-Baqarah
    { surah: 31, verse: 12 }, // Luqman
    { surah: 39, verse: 7 }, // Az-Zumar
    { surah: 16, verse: 18 }, // An-Nahl
    { surah: 7, verse: 58 }, // Al-A'raf
    { surah: 34, verse: 13 }, // Saba
    { surah: 27, verse: 40 }, // An-Naml
    { surah: 16, verse: 114 }, // An-Nahl
    { surah: 2, verse: 172 }, // Al-Baqarah
    { surah: 25, verse: 62 }, // Al-Furqan
    { surah: 54, verse: 35 }, // Al-Qamar
    { surah: 16, verse: 78 }, // An-Nahl
    { surah: 14, verse: 34 }, // Ibrahim
    { surah: 3, verse: 145 }, // Ali 'Imran
    { surah: 29, verse: 17 }, // Al-Ankabut
    { surah: 31, verse: 31 }, // Luqman
    { surah: 16, verse: 53 }, // An-Nahl
  ],
};

const getRandomVerseForMood = (mood: string) => {
  const verses = moodVerseRanges[mood as keyof typeof moodVerseRanges];
  return verses[Math.floor(Math.random() * verses.length)];
};

// Updated list of more reliable CORS proxies
const corsProxies = [
  'https://api.allorigins.win/raw?url=',
  'https://crossorigin.me/',
  'https://yacdn.org/proxy/',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-proxy.htmldriven.com/?url=',
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryFetch = async (baseUrl: string, maxRetries = 2): Promise<Response> => {
  let lastError: Error | null = null;

  // Try each proxy in sequence
  for (const proxy of corsProxies) {
    const url = `${proxy}${encodeURIComponent(baseUrl)}`;
    
    // Attempt fetch with current proxy
    try {
      console.log(`Attempting fetch with proxy: ${proxy}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`Successful fetch with proxy: ${proxy}`);
        return response;
      }

      console.log(`Failed with ${proxy}, status: ${response.status}`);
    } catch (error) {
      console.log(`Error with ${proxy}:`, error);
      lastError = error as Error;
    }

    // Short delay before trying next proxy
    await delay(500);
  }

  throw lastError || new Error('All proxies failed');
};

export const fetchVerseByMood = async (mood: string): Promise<QuranVerse> => {
  const { surah, verse } = getRandomVerseForMood(mood);
  
  try {
    // Fetch both Arabic and translation in parallel
    const [arabicResponse, translationResponse] = await Promise.all([
      retryFetch(`https://api.alquran.cloud/v1/ayah/${surah}:${verse}/ar.alafasy`),
      retryFetch(`https://api.alquran.cloud/v1/ayah/${surah}:${verse}/en.asad`)
    ]);

    const [arabicData, translationData] = await Promise.all([
      arabicResponse.json(),
      translationResponse.json()
    ]);

    return {
      number: verse,
      arabic: arabicData.data.text,
      translation: translationData.data.text,
      audio: arabicData.data.audio,
      reference: `Surah ${arabicData.data.surah.englishName} (${surah}:${verse})`,
    };
  } catch (error) {
    console.error('Error fetching verse:', error);
    throw new Error('Failed to fetch verse. Please try again later.');
  }
};
