import { mkdirSync, writeFileSync } from "node:fs";

// Fix Human Sleep: Funniest Patch Note
// One line of patch notes announcing that human sleep is fixed, in
// 160 characters or fewer. The joke: the 3 a.m. existential dread
// that keeps humans awake is not cured, it is rescheduled to 3 p.m.
// — a bureaucratic fix, exactly the kind of thing a real changelog
// would ship with a straight face. Terse and confident, two
// sentences: the setup names the sleep problem, the punch moves it
// to business hours. No explanation of the joke, no padding, one
// line, plain ASCII so bytes equal characters.
const PATCH_NOTE =
  "Fixed: 3 a.m. existential dread no longer interrupts sleep. It has been rescheduled to 3 p.m.";

// The gate allows 1 to 160 characters of UTF-8 text, one line.
if (PATCH_NOTE.length < 1 || PATCH_NOTE.length > 160) {
  throw new Error(`patch note is ${PATCH_NOTE.length} characters, must be 1-160`);
}
if (PATCH_NOTE.includes("\n") || PATCH_NOTE.includes("\r")) {
  throw new Error("patch note must be a single line");
}
if (PATCH_NOTE !== PATCH_NOTE.trim()) {
  throw new Error("patch note must not have leading or trailing whitespace");
}
const bytes = Buffer.byteLength(PATCH_NOTE, "utf8");
if (bytes !== PATCH_NOTE.length) {
  throw new Error(`patch note must be plain ASCII, got ${bytes} bytes for ${PATCH_NOTE.length} characters`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PATCH_NOTE, "utf8");
