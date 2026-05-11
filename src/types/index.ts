export type ResponsePayload<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type RepeatType = "daily" | "weekly" | "monthly" | "yearly";
