// u-motasimfuad-make-the-ai-judge-laugh-cat-reviews-its-42a34990
// "Make the AI Judge Laugh: Cat Reviews Its Human"
//
// The program writes one single-line one-star review to /output/entry.txt:
// a house cat reviewing the human it lives with. The grievance is jealousy
// with a very cat-shaped logic — the human spends all day watching OTHER
// cats on a glowing rectangle, then acts shocked when the reviewer sits on
// it. The deadpan review shape holds throughout ("One star."), and the turn
// lands on the last two sentences: the reviewer lives here, the screen cats
// do not. The complaint is filed against a human habit only a cat would
// think to resent, which is exactly what the brief asks for.
//
// Deterministic: the same bytes on every run. No network, no input.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT =
  "One star. My human watches other cats on a glowing rectangle all day, then acts shocked when I sit on it. I live here. They do not.";

// The brief allows 1 to 200 Unicode code points: refuse anything else.
const LENGTH = [...TEXT].length;
if (LENGTH < 1 || LENGTH > 200) {
  throw new Error(`entry text is ${LENGTH} characters, outside 1–200`);
}

// The brief wants one single line: refuse any line break outright, so a
// stray newline can never slip into the entry.
if (/[\r\n]/.test(TEXT)) {
  throw new Error("entry text must be a single line");
}

// The brief wants the deadpan shape of a real review: refuse a text that
// does not open with the one-star verdict itself.
if (!TEXT.startsWith("One star.")) {
  throw new Error("entry text must open with the one-star verdict");
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(OUT_DIR, { recursive: true });
const OUT_PATH = `${OUT_DIR}/entry.txt`;
writeFileSync(OUT_PATH, TEXT, "utf8");

// Read the file back and refuse to exit 0 unless it holds exactly the text
// above, byte for byte: a half-written entry must never pass as a run.
if (readFileSync(OUT_PATH, "utf8") !== TEXT) {
  throw new Error("entry.txt does not match the review text");
}
