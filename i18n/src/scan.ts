// Quelltext-Scanner für den Katalog-Test (D-113): t("…")-Aufrufe und Texte ohne t().
export interface Finding { file: string; line: number; text: string }

const CALL = /\bt\(\s*(["'])((?:\\.|(?!\1).)*)\1/g;
// Text zwischen Tags bzw. zwischen {…}-Ausdrücken in JSX
const JSX_TEXT = /[>}]([^<>{}]*)(?=[<{])/g;
const ATTR = /\b(?:title|placeholder|aria-label|label|alt)=(["'])([^"']*[A-Za-zÄÖÜäöüß][^"']*)\1/g;
const CODEISH = /=>|&&|\|\||[;=()"'`?$]|^\W+$|^[a-z_$][\w.$]*$/;
const LETTERS = /[A-Za-zÄÖÜäöüß]{2}/;
const KEYWORD = /^[\w.-]*\/[\w./-]*$|^[:,.\]\[]|\b(const|let|export|interface|type|function|return|import|extends)\b|^\w+px\b/;

function withoutStrings(code: string): string {
  // Inhalt von "…", '…' und `…` ausblenden – JSX-Text steht nie in ASCII-Anführungszeichen
  return code.replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g, (m) => m.replace(/[^\n]/g, " "));
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

function unescape(text: string): string {
  return text.replace(/\\(["'\\])/g, "$1").replace(/\\n/g, "\n");
}

/** Erste Argumente aller t("…")-Aufrufe. */
export function calls(file: string, source: string): Finding[] {
  return [...source.matchAll(CALL)].map((m) => ({ file, line: lineOf(source, m.index), text: unescape(m[2] ?? "") }));
}

function withoutComments(source: string): string {
  // Kommentare durch Leerzeichen ersetzen (Zeilennummern bleiben)
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`])\/\/.*$/gm, (m, p: string) => p + " ".repeat(m.length - p.length));
}

/** Sichtbare Texte in .tsx ohne t() – JSX-Text und Text-Attribute. */
export function untranslated(file: string, source: string): Finding[] {
  if (!file.endsWith(".tsx")) return [];
  const code = withoutComments(source);
  const out: Finding[] = [];
  const bare = withoutStrings(code);
  for (const m of bare.matchAll(JSX_TEXT)) {
    const text = (m[1] ?? "").trim();
    if (!text || !LETTERS.test(text) || CODEISH.test(text) || KEYWORD.test(text) || KEEP.has(text)) continue;
    out.push({ file, line: lineOf(code, m.index), text });
  }
  for (const m of code.matchAll(ATTR)) {
    const text = m[2] ?? "";
    if (!text.startsWith("${")) out.push({ file, line: lineOf(code, m.index), text }); // Vorlage = Code
  }
  return out.filter((f) => !KEEP.has(f.text));
}

/** Texte, die in beiden Sprachen gleich bleiben (Produktnamen, Formate, Kürzel). */
export const KEEP = new Set([
  "Kyubi", "Kyubi-ETL", "KyubiDagDesigner", "KyubiControl", "KyubiMapper", "KyubiMetaDataWarehouse", "KyubiHUB", "KyubiREPO", "KyubiSERVICE", "YAML",
  "Python", "JSON", "CSV", "Parquet", "SQL", "OK", "ID", "Deutsch", "English", "SLA", "NAME",
   "KyubiHUB", "⌂ KyubiHUB", "Port", "Schema", "*", "?",
  // TypeScript-Typen in Generics (Promise<…>), keine sichtbaren Texte
  "Promise", "Record", "Map", "Set", "Array", "Partial", "Readonly",
]);
