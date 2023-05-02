import React from "react";

type Page = {
  route: string;
  title: string;
  content: string;
};

export const PagesContext = React.createContext<Page[] | null>(null); 
export const usePages = () => React.useContext(PagesContext);

const PagesProvider: React.FC = ({ children }) => {
  const [pages, setPages] = React.useState<Page[] | null>(null);
  
  return (
    <PagesContext.Provider value={pages}>
      {children}
    </PagesContext.Provider>
  );
};

export default PagesProvider;