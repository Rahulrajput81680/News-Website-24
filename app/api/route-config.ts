// This file prevents Next.js from trying to prerender API routes during build
export const config = {
  runtime: 'nodejs',
};
