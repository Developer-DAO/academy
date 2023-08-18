/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { type IFormatedLessons } from "@/interfaces";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [formattedLessons, setFormattedLessons] = useState<IFormatedLessons>({
    projects: [],
    fundamentals: [],
  });
  const [completedQuizzesSlugs, setCompletedQuizzesSlugs] = useState<string[]>(
    [],
  );
  const [lessonsWithStatus, setLessonsWithStatus] = useState<IFormatedLessons>({
    projects: [],
    fundamentals: [],
  });

  const { data: sessionData } = useSession();

  // Requests
  // - All
  const {
    data: completedQuizzesAllData,
    // isLoading: completedQuizzesAllIsLoading,
    // refetch: refetchCompletedQuizzesAll,
  } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionData?.user !== undefined,
    },
  );

  useEffect(() => {
    if (completedQuizzesAllData) {
      const slugs = completedQuizzesAllData.map((quiz: any) => quiz.lesson);
      if (slugs !== completedQuizzesSlugs) setCompletedQuizzesSlugs(slugs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedQuizzesAllData]);

  const fetchFromDirs = async () => {
    const lessonsData = await fetch("/api/readfiles").then((res) => res.json());

    const lessonsFormatResult: IFormatedLessons = lessonsData.reduce(
      (acc: any, curr: any) => {
        if (!acc[curr.path]) acc[curr.path] = [];

        acc[curr.path].push(curr);
        return acc;
      },
      {},
    );

    setFormattedLessons(lessonsFormatResult);
  };

  useEffect(() => {
    void fetchFromDirs();
  }, []);

  useEffect(() => {
    if (
      sessionData?.user &&
      formattedLessons.fundamentals &&
      formattedLessons.projects &&
      completedQuizzesSlugs.length !== 0
    ) {
      const projectsWithCompleteStatus = formattedLessons.projects.map(
        (lesson) => {
          const completed = completedQuizzesSlugs.includes(lesson.slug);
          return { ...lesson, completed };
        },
      );

      const obj = {
        projects: projectsWithCompleteStatus,
        fundamentals: formattedLessons.fundamentals,
      };

      setLessonsWithStatus(obj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedQuizzesSlugs, formattedLessons]);

  return (
    <AppContext.Provider
      value={{ formattedLessons, completedQuizzesSlugs, lessonsWithStatus }}
    >
      {children}
    </AppContext.Provider>
  );
}
