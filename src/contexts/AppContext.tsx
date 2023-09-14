import { type Project, type Fundamental } from "@/interfaces";
import { createContext, useContext } from "react";

interface IAppContext {
  completedQuizzesIds: string[];
  projects: Project[];
  fundamentals: Fundamental[];
}

export const AppContext = createContext<IAppContext>({
  completedQuizzesIds: [],
  projects: [],
  fundamentals: [],
});

AppContext.displayName = "AcademyAppContext";

export const useAppContext = () => useContext(AppContext);
