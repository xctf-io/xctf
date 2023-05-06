import { useState } from "react";

type Evidence = {
  name: string;
};

export const evidence = useState<Evidence[] | null>(null);