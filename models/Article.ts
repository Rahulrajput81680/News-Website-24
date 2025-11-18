import mongoose, { Schema, Model } from 'mongoose';

export interface IArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  videoUrl?: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  featured?: boolean;
  trending?: boolean;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
      bio: {
        type: String,
        required: true,
      },
    },
    publishedAt: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
ArticleSchema.index({ slug: 1 });
ArticleSchema.index({ category: 1 });
ArticleSchema.index({ featured: 1 });
ArticleSchema.index({ trending: 1 });
ArticleSchema.index({ publishedAt: -1 });

const Article: Model<IArticle> = mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
