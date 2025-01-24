import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Book } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const storyCategories = [
  {
    title: "Prophets' Stories",
    stories: [
      {
        title: "Prophet Ibrahim's Sacrifice",
        summary: "The story of Prophet Ibrahim's unwavering faith and his willingness to sacrifice his son...",
        fullStory: `
          <div class="space-y-4">
            <p>Prophet Ibrahim (peace be upon him) is known as the father of the Prophets and a model of pure faith in Allah. This profound story demonstrates the ultimate test of his devotion.</p>
            
            <p>After years of longing for a child, Allah blessed Ibrahim with his son Ismail. However, Ibrahim was then commanded in a dream to sacrifice this beloved son. Without hesitation, Ibrahim prepared to fulfill Allah's command, and his son Ismail, displaying remarkable faith, willingly accepted his fate.</p>
            
            <p>As Ibrahim was about to carry out the sacrifice, Allah stopped him and replaced Ismail with a ram from Paradise. This was never about the sacrifice itself, but rather about demonstrating complete submission to Allah's will.</p>
            
            <p>This story teaches us several profound lessons:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>True faith means submitting to Allah's will, even when it challenges our hearts deeply</li>
              <li>Allah never intends to harm us but tests our faith to elevate our spiritual status</li>
              <li>When we show complete trust in Allah, He provides ways out of difficult situations</li>
              <li>The importance of parent-child relationships built on faith and mutual trust</li>
            </ul>
            
            <p>Today, we commemorate this event during Eid al-Adha, reminding us of the importance of sacrifice and submission to Allah's will in our lives.</p>
          </div>
        `,
      },
      {
        title: "Prophet Yusuf's Patience",
        summary: "The inspiring story of Prophet Yusuf's journey from slavery to leadership...",
        fullStory: `
          <div class="space-y-4">
            <p>The story of Prophet Yusuf (peace be upon him) is unique in the Quran, described as "the most beautiful of stories." It's a comprehensive narrative about patience, faith, and moral excellence.</p>
            
            <p>Yusuf's journey began with betrayal by his own brothers, who threw him into a well out of jealousy. This led to him being sold into slavery in Egypt, where he faced further trials including false accusations and imprisonment.</p>
            
            <p>Throughout these hardships, Yusuf maintained his faith and moral character. His patience and trust in Allah's plan never wavered. Eventually, Allah elevated him to a position of authority in Egypt, where he managed the country's resources with wisdom during a severe drought.</p>
            
            <p>Key lessons from his story include:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>Patience in adversity leads to beautiful outcomes</li>
              <li>Maintaining moral excellence even in difficult situations</li>
              <li>The importance of forgiveness, as demonstrated when he forgave his brothers</li>
              <li>Trust in Allah's plan, even when we can't see the wisdom behind our trials</li>
            </ul>
            
            <p>The story concludes with a beautiful reunion of his family and the fulfillment of his childhood dream, showing how Allah's plan comes to fruition in the most perfect way.</p>
          </div>
        `,
      },
    ],
  },
  {
    title: "Companions' Stories",
    stories: [
      {
        title: "Bilal's Steadfastness",
        summary: "The story of Bilal ibn Rabah's conversion to Islam and his unwavering faith...",
        fullStory: `
          <div class="space-y-4">
            <p>Bilal ibn Rabah (may Allah be pleased with him) was an African slave in Makkah who became one of Islam's most revered early converts and the first muezzin (caller to prayer) in Islamic history.</p>
            
            <p>Upon accepting Islam, Bilal faced severe persecution from his master, Umayyah ibn Khalaf. He was dragged through the streets of Makkah and tortured under the scorching sun with heavy rocks placed on his chest. Yet, even under this extreme torture, Bilal's response remained unchanged: "Ahad! Ahad!" (One! One!) affirming Allah's oneness.</p>
            
            <p>Abu Bakr (may Allah be pleased with him) eventually purchased and freed Bilal, who then devoted his life to serving Islam. The Prophet Muhammad ﷺ appointed him as the first muezzin, choosing him for his beautiful voice and strong faith.</p>
            
            <p>This story teaches us:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>True faith remains strong regardless of physical torture or social pressure</li>
              <li>Islam's stance against racism and social inequality</li>
              <li>The honor of serving Islam is based on piety, not social status</li>
              <li>The importance of standing firm in our beliefs despite adversity</li>
            </ul>
            
            <p>Bilal's story continues to inspire millions, showing how faith can elevate a person from slavery to one of the most honored positions in Islamic history.</p>
          </div>
        `,
      },
      {
        title: "Abu Bakr's Loyalty",
        summary: "The story of Abu Bakr's unwavering support and friendship to the Prophet...",
        fullStory: `
          <div class="space-y-4">
            <p>Abu Bakr As-Siddiq (may Allah be pleased with him) was the closest companion of Prophet Muhammad ﷺ and the first adult male to accept Islam. His title "As-Siddiq" (The Truthful) was earned when he immediately believed in the Prophet's night journey (Isra and Mi'raj).</p>
            
            <p>When others hesitated, Abu Bakr spent his wealth supporting the early Muslim community and freeing Muslim slaves. During the migration to Medina, he accompanied the Prophet ﷺ in the cave of Thawr, demonstrating unwavering trust when he said, "Do not grieve, indeed Allah is with us."</p>
            
            <p>After the Prophet's passing, Abu Bakr's strong leadership kept the Muslim community united during a critical period. His brief caliphate was marked by decisive action and dedication to continuing the Prophet's mission.</p>
            
            <p>Lessons from his life include:</p>
            <ul class="list-disc pl-6 space-y-2">
              <li>The value of immediate and complete faith in truth</li>
              <li>The importance of supporting good causes with both wealth and action</li>
              <li>True friendship means standing by someone in all circumstances</li>
              <li>Leadership requires wisdom, decisiveness, and strong faith</li>
            </ul>
            
            <p>Abu Bakr's example shows us how faith, when combined with action and sincerity, can create lasting positive change in the world.</p>
          </div>
        `,
      },
    ],
  },
];

const IslamicStories = () => {
  const [selectedCategory, setSelectedCategory] = useState(storyCategories[0]);
  const [selectedStory, setSelectedStory] = useState<null | {
    title: string;
    fullStory: string;
  }>(null);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="fixed top-4 right-4 z-50 text-sage hover:text-sage/90 bg-cream/80 backdrop-blur-sm"
          >
            <Book className="w-4 h-4 mr-2" />
            Islamic Stories
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] bg-cream">
          <SheetHeader>
            <SheetTitle className="text-sage">Islamic Stories</SheetTitle>
            <SheetDescription className="text-sage/70">
              Explore inspiring stories from Islamic history
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <div className="flex gap-2 mb-4">
              {storyCategories.map((category) => (
                <Button
                  key={category.title}
                  variant={selectedCategory.title === category.title ? "default" : "outline"}
                  size="sm"
                  className="text-sage"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.title}
                </Button>
              ))}
            </div>
            <div className="space-y-4">
              {selectedCategory.stories.map((story) => (
                <Dialog key={story.title}>
                  <DialogTrigger asChild>
                    <div
                      className="p-4 rounded-lg bg-sage/5 border border-sage/10 cursor-pointer hover:bg-sage/10 transition-colors"
                      onClick={() => setSelectedStory(story)}
                    >
                      <h3 className="font-medium text-sage mb-2">{story.title}</h3>
                      <p className="text-sage/70 text-sm">{story.summary}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-cream max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-sage text-xl">{story.title}</DialogTitle>
                    </DialogHeader>
                    <div 
                      className="text-sage/80 prose prose-sage max-w-none"
                      dangerouslySetInnerHTML={{ __html: story.fullStory }}
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default IslamicStories;