import { type IFormatedLessons } from "@/interfaces";
import { createContext, useContext } from "react";

interface IAppContext {
  formattedLessons: IFormatedLessons;
  completedQuizzesSlugs: string[];
  lessonsWithStatus: IFormatedLessons;
}

export const AppContext = createContext<IAppContext>({
  formattedLessons: {
    projects: [],
    fundamentals: [],
  },
  completedQuizzesSlugs: [],
  lessonsWithStatus: {
    projects: [],
    fundamentals: [],
  },
});

AppContext.displayName = "AcademyAppContext";

export const useAppContext = () => useContext(AppContext);
