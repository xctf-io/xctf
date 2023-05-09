import { useState } from "react";

type Challenge = {
  name: string;
  value: number;
};

export const [challenges, setChallenges] = useState<Challenge[] | null>(null);