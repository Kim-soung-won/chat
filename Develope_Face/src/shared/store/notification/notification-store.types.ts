import { z } from "zod";
import { NotificationTypeSchema, TopNotificationSchema } from "./notification-store.contracts";

export type TopNotification = z.infer<typeof TopNotificationSchema>;
export type NotificationType = z.infer<typeof NotificationTypeSchema>;