import { type Project, type Fundamental, type EthIntro } from "@/interfaces";
import { createContext, useContext } from "react";

interface IAppContext {
  completedQuizzesIds: string[];
  projects: Project[];
  fundamentals: Fundamental[];
  allLessonsData: any[];
  refetchCompletedQuizzesAll?: () => Promise<any>;
}

export const AppContext = createContext<IAppContext>({
  completedQuizzesIds: [],
  projects: [],
  fundamentals: [],
  allLessonsData: [],
  refetchCompletedQuizzesAll: () => Promise.resolve(),
});

AppContext.displayName = "AcademyAppContext";

// export const useAppContext = () => useContext(AppContext);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within the AppContextProvider");
  }
  return context;
}
