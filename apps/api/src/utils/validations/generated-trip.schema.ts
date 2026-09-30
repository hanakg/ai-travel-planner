import { ActivityType, BudgetCategory } from 'generated/prisma/enums';
import { z } from 'zod';

export const generatedTripSchema = z.object({
  days: z.array(
    z.object({
      dayNumber: z.number().int().positive(),
      date: z.string(),

      activities: z.array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          startTime: z.string().optional(),
          durationMin: z.number().int().positive().optional(),

          type: z.enum(ActivityType),

          estimatedCost: z.number().nonnegative().optional(),
        }),
      ),
    }),
  ),

  budgetItems: z.array(
    z.object({
      category: z.enum(BudgetCategory),
      description: z.string().optional(),
      amount: z.number().nonnegative(),
    }),
  ),
});
