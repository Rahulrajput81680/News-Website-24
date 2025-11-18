const fs = require("fs");
const path = require("path");

const files = [
  "components/Header.tsx",
  "components/Footer.tsx",
  "components/HeroSection.tsx",
  "components/LatestNews.tsx",
  "components/CategorySection.tsx",
  "components/TrendingNews.tsx",
  "components/PageLoader.tsx",
  "app/page.tsx",
  "app/category/[slug]/page.tsx",
  "app/article/[slug]/ArticleClient.tsx",
  "app/admin/page.tsx",
  "app/admin/create/page.tsx",
  "app/admin/edit/[id]/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/search/page.tsx",
  "app/not-found.tsx",
];

const replacements = [
  // Remove duplicate old classes that weren't removed
  ["border-gray-300 border-border-card", "border-border-card"],
  ["border-gray-200 border-border", "border-border"],
  ["text-gray-500 text-text-secondary", "text-text-secondary"],
  ["text-gray-500 text-text-muted", "text-text-muted"],
  ["text-gray-600 text-text-secondary", "text-text-secondary"],
  ["bg-gray-50 bg-background-elevated", "bg-background-elevated"],
  ["bg-gray-100 bg-background-elevated", "bg-background-elevated"],
  ["bg-gray-200 bg-background-elevated", "bg-background-elevated"],
  [
    "hover:bg-gray-100 hover:bg-background-elevated",
    "hover:bg-background-elevated",
  ],
  [
    "hover:bg-gray-50 hover:bg-background-elevated",
    "hover:bg-background-elevated",
  ],

  // Remaining single old classes
  ["text-gray-900", "text-text-primary"],
  ["text-gray-800", "text-text-primary"],
  ["text-gray-700", "text-text-secondary"],
  ["text-gray-600", "text-text-secondary"],
  ["text-gray-500", "text-text-muted"],
  ["text-gray-400", "text-text-muted"],
  ["text-gray-300", "text-text-secondary"],
  ["text-gray-200", "text-text-primary"],

  ["bg-gray-900", "bg-background"],
  ["bg-gray-800", "bg-background-secondary"],
  ["bg-gray-700", "bg-background-elevated"],
  ["bg-gray-600", "bg-background-elevated"],
  ["bg-gray-500", "bg-background-elevated"],
  ["bg-gray-400", "bg-background-elevated"],
  ["bg-gray-300", "bg-background-elevated"],
  ["bg-gray-200", "bg-background-elevated"],
  ["bg-gray-100", "bg-background-elevated"],
  ["bg-gray-50", "bg-background-elevated"],

  ["border-gray-900", "border-border"],
  ["border-gray-800", "border-border"],
  ["border-gray-700", "border-border"],
  ["border-gray-600", "border-border-card"],
  ["border-gray-500", "border-border"],
  ["border-gray-400", "border-border"],
  ["border-gray-300", "border-border-card"],
  ["border-gray-200", "border-border"],
  ["border-gray-100", "border-border"],

  ["hover:bg-gray-100", "hover:bg-background-elevated"],
  ["hover:bg-gray-200", "hover:bg-background-elevated"],
  ["hover:bg-gray-300", "hover:bg-background-elevated"],
  ["hover:bg-gray-50", "hover:bg-background-elevated"],
  ["hover:bg-gray-700", "hover:bg-background-elevated"],
  ["hover:bg-gray-600", "hover:bg-background-elevated"],

  // Special cases
  ["bg-primary text-white", "bg-accent-blue text-text-primary"],
];

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
      console.log(`✓ Cleaned ${file} (${fileChanges} changes)`);
    } else {
      console.log(`  ${file} - No changes needed`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✓ Cleanup complete! Total changes: ${totalChanges}`);
