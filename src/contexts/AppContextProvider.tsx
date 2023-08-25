/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import {
  type Project,
  type Fundamental,
  type IFormatedLessons,
} from "@/interfaces";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [fundamentals, setFundamentals] = useState<Fundamental[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [completedQuizzesSlugs, setCompletedQuizzesSlugs] = useState<string[]>(
    [],
  );

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

    setFundamentals(lessonsFormatResult.fundamentals);
    setProjects(lessonsFormatResult.projects);
  };

  useEffect(() => {
    void fetchFromDirs();
  }, []);

  useEffect(() => {
    if (projects && completedQuizzesSlugs.length !== 0) {
      const projectsWithCompleteStatus = projects.map((lesson) => {
        const completed = completedQuizzesSlugs.includes(lesson.slug);
        console.log({ completed });
        return { ...lesson, completed };
      });

      setProjects(projectsWithCompleteStatus);
    }
  }, [completedQuizzesSlugs, projects]);

  return (
    <AppContext.Provider
      value={{
        completedQuizzesSlugs,
        projects,
        fundamentals,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
