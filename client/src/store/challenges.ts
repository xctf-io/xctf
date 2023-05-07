import { useState } from "react";

type Challenge = {
  name: string;
  category: string;
  value: number;
  solved: boolean;
};

export const [challenges, setChallenges] = useState<Challenge[] | null>(null);