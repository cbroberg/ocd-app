import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database(process.env.DATABASE_URL || "./sqlite.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

const systemExercises = [
  {
    title: "Touch a Doorknob",
    description:
      "Touch a public doorknob and resist the urge to wash hands for 30 minutes.",
    category: "contamination",
    difficulty: 2,
    estimatedMinutes: 35,
    instructions:
      "1. Find a public doorknob.\n2. Touch it with your full hand.\n3. Set a timer for 30 minutes.\n4. Resist washing or sanitizing.\n5. Rate your anxiety every 5 minutes.\n6. Notice how anxiety naturally decreases.",
  },
  {
    title: "Delay Handwashing",
    description:
      "After touching something that triggers contamination fears, delay washing by 15 minutes.",
    category: "contamination",
    difficulty: 1,
    estimatedMinutes: 20,
    instructions:
      "1. Identify a contamination trigger.\n2. Touch the trigger item.\n3. Start a 15-minute timer.\n4. Sit with the discomfort.\n5. Notice your anxiety levels changing over time.",
  },
  {
    title: "Use a Public Restroom",
    description:
      "Use a public restroom and only wash hands once, briefly.",
    category: "contamination",
    difficulty: 3,
    estimatedMinutes: 20,
    instructions:
      "1. Find a public restroom.\n2. Use it normally.\n3. Wash hands once for 20 seconds only.\n4. Leave without re-washing.\n5. Resist sanitizer for 30 minutes after.",
  },
  {
    title: "Leave the House Without Checking",
    description:
      "Leave your home without going back to check locks, stove, or appliances.",
    category: "checking",
    difficulty: 2,
    estimatedMinutes: 10,
    instructions:
      "1. Prepare to leave your home.\n2. Lock the door once.\n3. Walk away without turning back.\n4. Resist calling anyone to check.\n5. Notice the anxiety rise and then fall naturally.",
  },
  {
    title: "Send an Email Without Re-reading",
    description:
      "Write and send an email without re-reading it more than once.",
    category: "checking",
    difficulty: 1,
    estimatedMinutes: 10,
    instructions:
      "1. Compose an email.\n2. Read it through once.\n3. Press send.\n4. Do not check your sent folder.\n5. Notice your urge to verify and let it pass.",
  },
  {
    title: "Lock the Door Once",
    description:
      "Lock the door only once and walk away. No pulling the handle to verify.",
    category: "checking",
    difficulty: 2,
    estimatedMinutes: 5,
    instructions:
      "1. Turn the key or knob once.\n2. Walk away immediately.\n3. Do not turn around.\n4. Rate your anxiety after 5 minutes.",
  },
  {
    title: "Asymmetric Desk Arrangement",
    description:
      "Deliberately arrange your desk items asymmetrically and keep them that way for 2 hours.",
    category: "symmetry",
    difficulty: 2,
    estimatedMinutes: 125,
    instructions:
      "1. Place items on your desk at odd angles.\n2. Make spacing uneven.\n3. Set a 2-hour timer.\n4. Resist the urge to straighten anything.\n5. Rate anxiety every 30 minutes.",
  },
  {
    title: "Wear Mismatched Socks",
    description:
      "Wear noticeably different socks for an entire day.",
    category: "symmetry",
    difficulty: 1,
    estimatedMinutes: 480,
    instructions:
      "1. Choose two visibly different socks.\n2. Wear them for the entire day.\n3. Notice when the urge to change arises.\n4. Acknowledge the discomfort and continue your day.",
  },
  {
    title: "Crooked Picture Frame",
    description:
      "Tilt a picture frame slightly off-center and leave it for 24 hours.",
    category: "symmetry",
    difficulty: 3,
    estimatedMinutes: 15,
    instructions:
      "1. Pick a visible picture frame.\n2. Tilt it 5-10 degrees.\n3. Leave the room.\n4. Each time you see it, note your anxiety level.\n5. Do not fix it for 24 hours.",
  },
  {
    title: "Thought Defusion Exercise",
    description:
      "When an intrusive thought appears, say it aloud in a funny voice to reduce its power.",
    category: "intrusive-thoughts",
    difficulty: 1,
    estimatedMinutes: 10,
    instructions:
      "1. Notice an intrusive thought.\n2. Repeat it in a cartoon or silly voice.\n3. Say it faster, then slower.\n4. Notice how the thought loses intensity.\n5. Practice this for 10 minutes.",
  },
  {
    title: "Write Down Intrusive Thoughts",
    description:
      "Write your intrusive thought on paper and carry it with you for the day.",
    category: "intrusive-thoughts",
    difficulty: 2,
    estimatedMinutes: 15,
    instructions:
      "1. Write the intrusive thought on a card.\n2. Put it in your pocket.\n3. Carry it throughout the day.\n4. When the thought arises, touch the card and acknowledge it.\n5. Do not perform any mental rituals.",
  },
  {
    title: "Imaginal Exposure Script",
    description:
      "Write a short story about your worst fear and read it aloud repeatedly until anxiety decreases.",
    category: "intrusive-thoughts",
    difficulty: 4,
    estimatedMinutes: 45,
    instructions:
      "1. Write a brief scenario about your feared outcome.\n2. Read it aloud.\n3. Re-read it 5-10 times.\n4. Rate your anxiety after each reading.\n5. Notice the habituation curve.",
  },
  {
    title: "5-Minute Mindful Breathing",
    description:
      "Practice 5 minutes of focused breathing to build distress tolerance.",
    category: "general",
    difficulty: 1,
    estimatedMinutes: 5,
    instructions:
      "1. Sit comfortably.\n2. Close your eyes.\n3. Breathe in for 4 seconds.\n4. Hold for 4 seconds.\n5. Exhale for 6 seconds.\n6. Repeat for 5 minutes.",
  },
  {
    title: "Progressive Muscle Relaxation",
    description:
      "Systematically tense and relax muscle groups to reduce physical anxiety symptoms.",
    category: "general",
    difficulty: 1,
    estimatedMinutes: 15,
    instructions:
      "1. Start with your feet - tense for 5 seconds, then relax.\n2. Move to calves, thighs, abdomen, chest, arms, hands, neck, face.\n3. Hold tension 5 seconds each.\n4. Notice the difference between tension and relaxation.\n5. End with 2 minutes of still breathing.",
  },
  {
    title: "Delay Ritual by 10 Minutes",
    description:
      "When an urge to perform a ritual arises, delay acting on it by 10 minutes.",
    category: "general",
    difficulty: 2,
    estimatedMinutes: 15,
    instructions:
      "1. Notice the urge to perform a ritual.\n2. Set a 10-minute timer.\n3. Do something else during the wait.\n4. After 10 minutes, reassess the urge.\n5. If still present, delay another 10 minutes.\n6. Many urges pass naturally with time.",
  },
];

async function seed() {
  console.log("Seeding exercises...");

  for (const exercise of systemExercises) {
    db.insert(schema.exercises)
      .values({
        ...exercise,
        userId: null,
        isSystemExercise: true,
        createdAt: new Date().toISOString(),
      })
      .run();
  }

  console.log(`Seeded ${systemExercises.length} exercises.`);
  process.exit(0);
}

seed();
