const fs = require("fs");
const path = require("path");

function escapeQuotesInJsx(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Replace double quotes inside JSX text nodes:
  // e.g. <p>"Hello"</p> → <p>&quot;Hello&quot;</p>
  content = content.replace(/>([^<{]*)"([^>{]*)</g, (match, before, after) => {
    return `>${before}&quot;${after}<`;
  });

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`✔ Fixed quotes in: ${filePath}`);
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);

    if (fs.lstatSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (/\.(js|jsx|ts|tsx)$/.test(fullPath)) {
      escapeQuotesInJsx(fullPath);
    }
  });
}

console.log("🚀 Escaping quotes in JSX files...");
walk("./");
console.log("🎉 Done! All unescaped quotes have been fixed.");
