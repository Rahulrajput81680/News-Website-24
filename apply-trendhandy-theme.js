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
  // Background Colors - TrendHandy Theme
  ["bg-background-secondary", "bg-background-card"],
  ["bg-background-elevated", "bg-background-card"],
  ["bg-background dark", "bg-background"],

  // Text Colors
  ["text-accent-blue", "text-primary"],
  ["hover:text-accent-blue", "hover:text-primary"],
  ["group-hover:text-accent-blue", "group-hover:text-primary"],

  // Border Colors
  ["border-border-card", "border-border"],

  // Hover States
  ["hover:bg-background-elevated", "hover:bg-background-card"],
  ["hover:bg-background-elevated/50", "hover:bg-background-card/50"],

  // Special Accent Colors
  ["bg-accent-blue", "bg-primary"],
  ["text-accent-softBlue", "text-primary-light"],
  ["text-accent-red", "text-primary"],
  ["bg-accent-red", "bg-primary"],

  // Ring/Focus States
  ["ring-accent-blue", "ring-primary"],
  ["focus:ring-accent-blue", "focus:ring-primary"],
  ["border-accent-blue", "border-primary"],

  // Specific patterns for primary color in forms/buttons
  [
    "bg-primary/10 text-accent-blue dark:bg-primary/20",
    "bg-primary/10 text-primary",
  ],
  ["bg-primary text-text-primary", "bg-primary text-white"],
  ["bg-primary text-white", "bg-primary text-white"], // Keep this one as-is
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
  `\n✓ TrendHandy theme update complete! Total changes: ${totalChanges}`
);
console.log("\n🎨 TrendHandy Color Theme Applied:");
console.log("   Primary Red: #E50914 (Breaking news, highlights, buttons)");
console.log("   Deep Black: #0A0A0A (Main background)");
console.log("   Card Black: #1A1A1A (Card backgrounds)");
console.log("   Pure White: #FFFFFF (Text on dark)");
console.log("   Muted Gray: #BFBFBF (Metadata)");
