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
];

const replacements = [
  // Background Colors - Order matters! More specific first
  ["bg-white dark:bg-gray-900", "bg-background"],
  ["bg-gray-50 dark:bg-gray-800", "bg-background-elevated"],
  ["bg-gray-100 dark:bg-gray-800", "bg-background-elevated"],
  ["bg-gray-100 dark:bg-gray-700", "bg-background-elevated"],
  ["bg-gray-200 dark:bg-gray-800", "bg-background-elevated"],
  ["bg-gray-200 dark:bg-gray-700", "bg-background-elevated"],
  ["bg-gray-300 dark:bg-gray-700", "bg-background-elevated"],
  ["dark:bg-gray-900", "bg-background"],
  ["dark:bg-gray-800", "bg-background-secondary"],
  ["dark:bg-gray-700", "bg-background-elevated"],
  ["dark:bg-gray-600", "bg-background-elevated"],
  ["bg-gray-900", "bg-background"],

  // Text Colors
  ["text-gray-900 dark:text-gray-100", "text-text-primary"],
  ["dark:text-gray-100", "text-text-primary"],
  ["text-gray-700 dark:text-gray-300", "text-text-secondary"],
  ["text-gray-600 dark:text-gray-400", "text-text-secondary"],
  ["text-gray-600 dark:text-gray-300", "text-text-secondary"],
  ["dark:text-gray-400", "text-text-secondary"],
  ["dark:text-gray-300", "text-text-secondary"],
  ["text-gray-500 dark:text-gray-400", "text-text-muted"],

  // Border Colors
  ["border-gray-200 dark:border-gray-800", "border-border"],
  ["border-gray-200 dark:border-gray-700", "border-border"],
  ["border-gray-300 dark:border-gray-700", "border-border"],
  ["dark:border-gray-800", "border-border"],
  ["dark:border-gray-700", "border-border"],
  ["dark:border-gray-600", "border-border-card"],

  // Hover States
  ["hover:bg-gray-100 dark:hover:bg-gray-800", "hover:bg-background-elevated"],
  ["hover:bg-gray-100 dark:hover:bg-gray-700", "hover:bg-background-elevated"],
  ["hover:bg-gray-200 dark:hover:bg-gray-700", "hover:bg-background-elevated"],
  ["hover:bg-gray-300 dark:hover:bg-gray-700", "hover:bg-background-elevated"],
  ["hover:bg-gray-300 dark:hover:bg-gray-600", "hover:bg-background-elevated"],
  ["dark:hover:bg-gray-800", "hover:bg-background-elevated"],
  ["dark:hover:bg-gray-700", "hover:bg-background-elevated"],
  ["dark:hover:bg-gray-600", "hover:bg-background-elevated"],
  [
    "hover:bg-gray-50 dark:hover:bg-gray-700/50",
    "hover:bg-background-elevated/50",
  ],

  // Special Colors
  ["text-primary", "text-accent-blue"],
  ["hover:text-primary", "hover:text-accent-blue"],
  ["focus:ring-primary", "focus:ring-accent-blue"],
  ["border-primary", "border-accent-blue"],
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
      console.log(`✓ Updated ${file} (${fileChanges} changes)`);
    } else {
      console.log(`  ${file} - No changes needed`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✓ Theme color update complete! Total changes: ${totalChanges}`);
