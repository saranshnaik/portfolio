import Database from "better-sqlite3";
import path from "path";

/**
 * Seed the database with Saransh's portfolio data.
 * Edit this file to change your portfolio content, then re-run:
 *   npx tsx src/lib/db/seed.ts
 */

const DB_PATH = path.join(process.cwd(), "sqlite.db");
const sqlite = new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");

// ─── Clear existing data ────────────────────────────────────────────
sqlite.exec(`
  DELETE FROM projects;
  DELETE FROM experiences;
  DELETE FROM profile;
  DELETE FROM social_links;
`);

// ─── Profile ─────────────────────────────────────────────────────────
sqlite
  .prepare(
    `INSERT INTO profile (name, title, tagline, bio, email, phone, resume_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  .run(
    "Saransh Sarang Naik",
    "B.Tech CSE Student • AI/ML & Software Systems",
    "I build things that work; and I think hard about why they should.",
    "Passionate about coding with a solid foundation built through years of hands-on experience. Enthusiastic about space and neural technology. Currently pursuing a BTech degree at IIIT Vadodara, with an aim to contribute meaningfully to technological advancements in the future.",
    "saransh.naik14@gmail.com",
    "+91 75591 84040",
    null
  );

// ─── Social Links ────────────────────────────────────────────────────
const insertLink = sqlite.prepare(
  `INSERT INTO social_links (platform, label, url, icon, display_index)
   VALUES (?, ?, ?, ?, ?)`
);

insertLink.run("github", "GitHub", "https://github.com/saranshnaik", "github", 0);
insertLink.run("linkedin", "LinkedIn", "https://linkedin.com/in/saranshnaik14", "linkedin", 1);
insertLink.run("leetcode", "LeetCode [1537]", "https://leetcode.com/u/saranshh14/", "leetcode", 2);

// ─── Projects ────────────────────────────────────────────────────────
const insertProject = sqlite.prepare(
  `INSERT INTO projects (title, slug, tagline, description, tech_stack, live_url, github_url, image_url, display_index, featured, created_at, updated_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))`
);

// Featured projects (the ones with real depth and impact)

insertProject.run(
  "Meeting Summarizer",
  "meeting-summarizer",
  "AI-powered meeting summarization & action-item extraction system",
  "Built an end-to-end AI-powered meeting summarization system during my internship at InfoBeans Technologies. The system processes recordings from links or uploaded files into structured summaries and actionable items using FastAPI, Ollama, and Next.js. Implemented an optimistic UI with real-time WebSocket status updates and an admin dashboard for prompt versioning, cutting review time by 50%. Built an LLM-agent validation layer to verify extracted action items before execution, reducing incorrect execution rate significantly.",
  JSON.stringify(["TypeScript", "Next.js", "FastAPI", "Ollama", "WebSocket", "LLM Agents"]),
  null,
  "https://github.com/saranshnaik/MeetingSummarizer",
  null,
  0,
  1
);

insertProject.run(
  "Banking Chatbot — Accidental Data Leakage Prevention",
  "banking-chatbot-adlp",
  "Preventing sensitive data leakage in banking chatbots using fine-tuned T5-small",
  "Manuscript based on this work accepted for publication at ETTIS 2026, with formal publication expected January 2027. Detected sensitive keywords with 89.9% accuracy across 500+ test queries using a fine-tuned T5-small model. Built a real-time query filtering and sanitization pipeline to reduce sensitive data leakage before response generation. Rephrased flagged user queries automatically to preserve intent while stripping sensitive content.",
  JSON.stringify(["Python", "T5-small", "NLP", "Transformers", "PyTorch"]),
  null,
  "https://github.com/saranshnaik/sem5-design-project",
  null,
  1,
  1
);

insertProject.run(
  "MiniDocker",
  "minidocker",
  "A lightweight container runtime built from scratch in C",
  "Built a container runtime from scratch supporting 5+ core Docker-like commands (build, run, images, etc.). Used Linux namespaces and filesystem management (chroot, pivot_root) for process and filesystem isolation. Supported up to 3 concurrent container execution with isolated resource management. Demonstrates deep understanding of operating systems, process isolation, and Linux internals.",
  JSON.stringify(["C", "Linux", "Namespaces", "chroot", "Process Isolation"]),
  null,
  "https://github.com/saranshnaik/sem5-os-project",
  null,
  2,
  1
);

insertProject.run(
  "RAG-Powered Document Q&A System",
  "rag-document-qa",
  "Retrieval-Augmented Generation pipeline for querying PDF documents",
  "Built an end-to-end Retrieval-Augmented Generation pipeline for querying PDF documents, covering ingestion, chunking, embedding, and vector storage across 5+ documents. Developed a retrieval-based QA chain in LangChain. Designed a modular ingestion/retrieval/generation architecture for independent component testing and reuse.",
  JSON.stringify(["Python", "LangChain", "Ollama", "ChromaDB", "RAG"]),
  null,
  "https://github.com/saranshnaik/ragproject",
  null,
  3,
  1
);

insertProject.run(
  "PresenceAI",
  "presenceai",
  "Phubbing detection and alerting utility — HackCrux 2026 Top 10",
  "A phubbing detecting and alerting utility, built as a prototype for HackCrux 2026 hackathon where we ranked in the Top 10 out of 300+ teams. Context-aware detection system built in 36 hours.",
  JSON.stringify(["Kotlin", "Android", "ML", "Computer Vision"]),
  null,
  "https://github.com/saranshnaik/presenceai",
  null,
  4,
  1
);

// Other projects

insertProject.run(
  "Alumni Connect Network",
  "alumni-connect",
  "Full-stack social platform for alumni-student networking with real-time messaging",
  "Built a full-stack social platform connecting alumni and current students for networking and mentorship with real-time messaging, posts, and user profiles. Implemented real-time messaging using WebSockets, supporting up to 10 tested concurrent users. Privacy-first design with all alumni data fetched and verified directly from the Institute records.",
  JSON.stringify(["Next.js", "SQL", "FastAPI", "WebSockets"]),
  null,
  "https://github.com/saranshnaik/sem4-se-project",
  null,
  5,
  0
);

insertProject.run(
  "Tiny-NeRF Simulation",
  "tiny-nerf",
  "Neural Radiance Field simulation on consumer hardware",
  "Simulated a small-scale Neural Radiance Field (Tiny-NeRF) on a regular-user system as part of a semester AI project. Explored 3D scene representation using neural networks.",
  JSON.stringify(["Python", "PyTorch", "Neural Radiance Fields", "Computer Vision"]),
  null,
  "https://github.com/saranshnaik/sem5-ai-project",
  null,
  6,
  0
);

insertProject.run(
  "Synapse³ AI Labs",
  "synapse3-ai-labs",
  "CS367 Artificial Intelligence laboratory assignments",
  "AI laboratory assignments covering search algorithms, constraint satisfaction, game playing, probabilistic reasoning, and machine learning fundamentals.",
  JSON.stringify(["Python", "Artificial Intelligence", "Search Algorithms", "ML"]),
  null,
  "https://github.com/saranshnaik/Synapse3-AI-labs",
  null,
  7,
  0
);

insertProject.run(
  "TutorConnect",
  "tutorconnect",
  "Session tracking platform for tutors and students",
  "A way for Tutors and Students to track their scheduled sessions. Built as part of a DBMS course project, demonstrating database design, normalization, and query optimization.",
  JSON.stringify(["JavaScript", "SQL", "DBMS", "Node.js"]),
  null,
  "https://github.com/saranshnaik/sem4-dbms-project",
  null,
  8,
  0
);

insertProject.run(
  "Zira — Voice Assistant",
  "zira-voice-assistant",
  "A voice assistant demonstrating major OOP concepts",
  "Voice assistant with various functionalities built using Python, showcasing Object-Oriented Programming principles including encapsulation, inheritance, polymorphism, and abstraction.",
  JSON.stringify(["Python", "OOP", "Speech Recognition", "NLP"]),
  null,
  "https://github.com/saranshnaik/sem3-oops-project",
  null,
  9,
  0
);

insertProject.run(
  "Terminal File Manager",
  "terminal-file-manager",
  "File management system within the terminal / terminal emulator",
  "A file management system built entirely in C, operating within the terminal. Supports core file operations, directory navigation, and a terminal emulator interface.",
  JSON.stringify(["C", "Linux", "Systems Programming"]),
  null,
  "https://github.com/saranshnaik/sem2-it-project",
  null,
  10,
  0
);

insertProject.run(
  "Employee Management System",
  "employee-management",
  "CLI-based employee management system in C",
  "An employee management system built in C as a first-semester project. Covers CRUD operations, file I/O, and structured programming fundamentals.",
  JSON.stringify(["C", "File I/O", "CLI"]),
  null,
  "https://github.com/saranshnaik/sem1-it-project",
  null,
  11,
  0
);

// ─── Experiences ─────────────────────────────────────────────────────
const insertExp = sqlite.prepare(
  `INSERT INTO experiences (role, company, company_url, duration, description, tech_stack, display_index)
   VALUES (?, ?, ?, ?, ?, ?, ?)`
);

insertExp.run(
  "Python — AI/ML Intern",
  "InfoBeans Technologies Ltd.",
  "https://www.infobeans.com",
  "May 2026 – Jun 2026",
  "Built an AI-powered meeting summarization and action-item extraction system end-to-end using FastAPI, Ollama, and Next.js. Implemented an optimistic UI with real-time WebSocket status updates and an admin dashboard for prompt versioning, cutting review time by 50%. Built an LLM-agent validation layer to verify extracted action items end-to-end before execution, reducing incorrect execution rate significantly.",
  JSON.stringify(["Python", "FastAPI", "Next.js", "Ollama", "WebSocket", "LLM Agents"]),
  0
);

insertExp.run(
  "Teaching Assistant — Basic Electronics II & Digital Logic Design",
  "IIIT Vadodara",
  "https://iiitvadodara.ac.in",
  "Jan 2026 – Present",
  "Assisted 130+ students during electronics lab sessions with circuit analysis, debugging, and experiments.",
  JSON.stringify(["Electronics", "Digital Logic", "Teaching"]),
  1
);

console.log("✅ Database seeded successfully!");
console.log("   - 1 profile (Saransh Sarang Naik)");
console.log("   - 3 social links (GitHub, LinkedIn, LeetCode)");
console.log("   - 12 projects (5 featured, 7 others)");
console.log("   - 2 experiences");

sqlite.close();
