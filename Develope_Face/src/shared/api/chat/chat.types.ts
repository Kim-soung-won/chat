import { z } from "zod";
import { RoomByUserRequestParam } from "./chat.contracts";

export type RoomByUserRequest = z.infer<typeof RoomByUserRequestParam>;
