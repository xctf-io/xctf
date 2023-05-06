import React from "react";

type Page = {
  route: string;
  title: string;
  content: string;
};

export const usePages = (): [Page[] | null, (p: Page[] | null) => void] => {
  const [pages, setPages] = React.useState<Page[] | null>(null);
  
  return [pages, setPages];
};