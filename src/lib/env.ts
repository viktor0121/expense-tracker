import { z } from "zod";

const EnvSchema = z.object({
  awProjectUrl: z.string(),
  awProjectId: z.string(),
  awDatabaseId: z.string(),
  awExpenseCollectionId: z.string(),
  awIncomeCollectionId: z.string(),
  awExpenseCategoryCollectionId: z.string(),
  awGoalCollectionId: z.string(),
  awGoalListCollectionId: z.string(),
  awProfilePhotoStorageId: z.string(),
  awGoalPhotoStorageId: z.string(),
});

export const env = {
  awProjectUrl: process.env.NEXT_PUBLIC_AW_PROJECT_URL as string,
  awProjectId: process.env.NEXT_PUBLIC_AW_PROJECT_ID as string,
  awDatabaseId: process.env.NEXT_PUBLIC_AW_DATABASE_ID as string,
  awExpenseCollectionId: process.env.NEXT_PUBLIC_AW_EXPENSE_COLLECTION_ID as string,
  awIncomeCollectionId: process.env.NEXT_PUBLIC_AW_INCOME_COLLECTION_ID as string,
  awExpenseCategoryCollectionId: process.env.NEXT_PUBLIC_AW_EXPENSE_CATEGORY_COLLECTION_ID as string,
  awGoalCollectionId: process.env.NEXT_PUBLIC_AW_GOAL_COLLECTION_ID as string,
  awGoalListCollectionId: process.env.NEXT_PUBLIC_AW_GOAL_LIST_COLLECTION_ID as string,
  awProfilePhotoStorageId: process.env.NEXT_PUBLIC_AW_PROFILE_PHOTO_STORAGE_ID as string,
  awGoalPhotoStorageId: process.env.NEXT_PUBLIC_AW_GOAL_PHOTO_STORAGE_ID as string,
};

try {
  EnvSchema.parse(env);
} catch (error: any) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}
