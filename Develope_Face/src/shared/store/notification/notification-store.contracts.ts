import { z } from 'zod';

export const NotificationTypeSchema = z.enum(['info', 'success', 'warning', 'error']);

export const TopNotificationSchema = z.object({
  message: z.string(),
  type: NotificationTypeSchema,
  active: z.boolean(),
});