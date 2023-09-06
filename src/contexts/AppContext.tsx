import {
  type Project,
  type IFormatedLessons,
  type Fundamental,
} from "@/interfaces";
import { createContext, useContext } from "react";

interface IAppContext {
  completedQuizzesSlugs: string[];
  projects: Project[];
  fundamentals: Fundamental[];
}

export const AppContext = createContext<IAppContext>({
  completedQuizzesSlugs: [],
  projects: [],
  fundamentals: [],
});

AppContext.displayName = "AcademyAppContext";

export const useAppContext = () => useContext(AppContext);
