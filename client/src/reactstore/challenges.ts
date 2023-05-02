import { useState } from "react";

type Challenge = {
  name: string;
  description: string;
  value: number;
};

export const challenges = useState<Challenge[] | null>(null);