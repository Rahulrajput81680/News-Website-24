const fs = require("fs");
const path = require("path");

const files = [
  "app/category/[slug]/page.tsx",
  "app/admin/create/page.tsx",
  "app/admin/edit/[id]/page.tsx",
];

const replacements = [["bg-white bg-background-card", "bg-background-card"]];

let totalChanges = 0;

files.forEach((file) => {
  const filePath = path.join(__dirname, file);

  try {
    let content = fs.readFileSync(filePath, "utf8");
    let fileChanges = 0;

    replacements.forEach(([oldText, newText]) => {
      const regex = new RegExp(
        oldText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newText);
        fileChanges += matches.length;
        totalChanges += matches.length;
      }
    });

    if (fileChanges > 0) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✓ Fixed ${file} (${fileChanges} duplicates removed)`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✓ Cleanup complete! Total duplicates removed: ${totalChanges}`);
