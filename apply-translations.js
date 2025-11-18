const fs = require("fs");
const path = require("path");

console.log("🌐 Starting language translation updates...\n");

const updates = [
  // Footer Component
  {
    file: "components/Footer.tsx",
    replacements: [
      { old: '"Quick Links"', new: "{t('quickLinks')}" },
      { old: '"Privacy Policy"', new: "{t('privacyPolicy')}" },
      { old: '"Terms of Service"', new: "{t('termsOfService')}" },
      { old: '"About"', new: "{t('about')}" },
      { old: '"Contact"', new: "{t('contact')}" },
      { old: '"Follow Us"', new: "{t('followUs')}" },
      {
        old: "`© ${new Date().getFullYear()} Trendhandy. All rights reserved.`",
        new: "`© ${new Date().getFullYear()} Trendhandy. ${t('allRightsReserved')}`",
      },
    ],
    addImport: 'import { useLanguage } from "@/contexts/LanguageContext";',
    addHook: "const { t } = useLanguage();",
  },
  // Latest News Component
  {
    file: "components/LatestNews.tsx",
    replacements: [
      { old: '"Latest News"', new: "{t('latestNews')}" },
      { old: '"Read More"', new: "{t('readMore')}" },
    ],
    addImport: 'import { useLanguage } from "@/contexts/LanguageContext";',
    addHook: "const { t } = useLanguage();",
  },
  // Trending News Component
  {
    file: "components/TrendingNews.tsx",
    replacements: [{ old: '"Trending News"', new: "{t('trending')}" }],
    addImport: 'import { useLanguage } from "@/contexts/LanguageContext";',
    addHook: "const { t } = useLanguage();",
  },
  // Category Section Component
  {
    file: "components/CategorySection.tsx",
    replacements: [{ old: '"View All"', new: "{t('viewAll')}" }],
    addImport: 'import { useLanguage } from "@/contexts/LanguageContext";',
    addHook: "const { t } = useLanguage();",
  },
];

let totalChanges = 0;

updates.forEach(({ file, replacements, addImport, addHook }) => {
  const filePath = path.join(__dirname, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");
  let changes = 0;

  // Add import if not exists
  if (addImport && !content.includes("useLanguage")) {
    const importMatch = content.match(/import.*from.*['"](react|next)['"];?\n/);
    if (importMatch) {
      const insertPos = content.indexOf(importMatch[0]) + importMatch[0].length;
      content =
        content.slice(0, insertPos) +
        addImport +
        "\n" +
        content.slice(insertPos);
      changes++;
    }
  }

  // Add hook if not exists
  if (addHook && !content.includes("const { t } = useLanguage()")) {
    // Find the component function and add the hook
    const funcMatch = content.match(/export default function \w+\([^)]*\) \{/);
    if (funcMatch) {
      const insertPos = content.indexOf(funcMatch[0]) + funcMatch[0].length;
      content =
        content.slice(0, insertPos) +
        "\n  " +
        addHook +
        content.slice(insertPos);
      changes++;
    }
  }

  // Apply replacements
  replacements.forEach(({ old, new: newValue }) => {
    const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newValue);
      changes += matches.length;
    }
  });

  if (changes > 0) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ ${file}: ${changes} changes`);
    totalChanges += changes;
  } else {
    console.log(`⚪ ${file}: No changes needed`);
  }
});

console.log(
  `\n🎉 Translation updates complete! Total changes: ${totalChanges}`
);
console.log("\n📝 Next steps:");
console.log("1. Run: npm run dev");
console.log("2. Click the language toggle button (EN/HI) in the header");
console.log("3. The entire website will switch between English and Hindi\n");
