import { z } from "zod";

const EnvSchema = z.object({
  awProjectUrl: z.string(),
  awProjectId: z.string(),
  awDatabaseId: z.string(),
  awExpenseCollectionId: z.string(),
  awIncomeCollectionId: z.string(),
  awExpenseCategoryCollectionId: z.string(),
  awProfilePhotoStorageId: z.string(),
});

const env = {
  awProjectUrl: process.env.NEXT_PUBLIC_AW_PROJECT_URL as string,
  awProjectId: process.env.NEXT_PUBLIC_AW_PROJECT_ID as string,
  awDatabaseId: process.env.NEXT_PUBLIC_AW_DATABASE_ID as string,
  awExpenseCollectionId: process.env.NEXT_PUBLIC_AW_EXPENSE_COLLECTION_ID as string,
  awIncomeCollectionId: process.env.NEXT_PUBLIC_AW_INCOME_COLLECTION_ID as string,
  awExpenseCategoryCollectionId: process.env .NEXT_PUBLIC_AW_EXPENSE_CATEGORY_COLLECTION_ID as string,
  awProfilePhotoStorageId: process.env.NEXT_PUBLIC_AW_PROFILE_PHOTO_STORAGE_ID as string,
};

try {
  EnvSchema.parse(env);
} catch (error: any) {
  throw new Error(`Environment variable validation error: ${error.message}`);
}

export default env;
