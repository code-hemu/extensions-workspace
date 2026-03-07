const fs = require("fs");
const path = require("path");

const localesDir = path.join(__dirname, "_locales");
const outputDir = path.join(__dirname, "output", "_locales");

fs.mkdirSync(outputDir, { recursive: true });

console.log("Output directory ready.");

const languages = fs.readdirSync(localesDir);

languages.forEach((lang) => {
  const messagesPath = path.join(localesDir, lang, "messages.json");

  if (!fs.existsSync(messagesPath)) return;

  const input = JSON.parse(fs.readFileSync(messagesPath, "utf8"));

  let output = "";

  for (const key in input) {
    output += `@${key}\n`;
    output += `${input[key].message}\n\n`;
  }

  const outputPath = path.join(outputDir, `${lang}.i18n`);
  fs.writeFileSync(outputPath, output);

  console.log(`${lang}.i18n created`);
});

console.log("All conversions completed.");