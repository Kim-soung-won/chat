import { z } from "zod";

export const RoomByUserRequestParam = z.object({
  userId: z.string()
})
