# Fix Text Color in LatestNews Component

## Information Gathered

- The LatestNews component has hardcoded `text-white` class for the excerpt text, which makes it invisible in light mode.
- Similar issue exists in CategorySection component.
- The text should be visible in both light and dark modes.

## Plan

- Update LatestNews.tsx: Change `text-white` to `text-gray-600 dark:text-text-secondary` for proper contrast.
- Update CategorySection.tsx: Same change for consistency.

## Dependent Files to be edited

- components/LatestNews.tsx
- components/CategorySection.tsx

## Followup steps

- Test the changes in both light and dark modes.
- Verify text is readable on the main page background.

## Completed Tasks

- [x] Updated LatestNews.tsx: Changed `text-white` to `text-gray-600 dark:text-text-secondary`
- [x] Updated CategorySection.tsx: Changed `text-white` to `text-gray-600 dark:text-text-secondary`
- [x] Verified changes are applied correctly
