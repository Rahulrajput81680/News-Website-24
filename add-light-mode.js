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
  // Background colors - add light mode support
  ["bg-background ", "bg-white dark:bg-background "],
  ['bg-background"', 'bg-white dark:bg-background"'],
  ["bg-background-card ", "bg-white dark:bg-background-card "],
  ['bg-background-card"', 'bg-white dark:bg-background-card"'],

  // Text colors - add light mode support
  ["text-text-primary ", "text-black dark:text-text-primary "],
  ['text-text-primary"', 'text-black dark:text-text-primary"'],
  ["text-text-secondary ", "text-gray-600 dark:text-text-secondary "],
  ['text-text-secondary"', 'text-gray-600 dark:text-text-secondary"'],
  ["text-text-muted ", "text-gray-500 dark:text-text-muted "],
  ['text-text-muted"', 'text-gray-500 dark:text-text-muted"'],

  // Border colors - add light mode support
  ["border-border ", "border-gray-200 dark:border-border "],
  ['border-border"', 'border-gray-200 dark:border-border"'],

  // Hover states
  [
    "hover:bg-background-card ",
    "hover:bg-gray-100 dark:hover:bg-background-card ",
  ],
  [
    'hover:bg-background-card"',
    'hover:bg-gray-100 dark:hover:bg-background-card"',
  ],
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

console.log(
  `\n✓ Light/Dark mode support added! Total changes: ${totalChanges}`
);
console.log("\n💡 Now supports:");
console.log("   Light Mode: White background, Black text");
console.log("   Dark Mode: Black background (#0A0A0A), White text");
console.log("   Toggle using theme button in header");
