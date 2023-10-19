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
import { useAccount } from "wagmi";

interface IProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: IProps) {
  const [fundamentals, setFundamentals] = useState<Fundamental[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [completedQuizzesIds, setCompletedQuizzesIds] = useState<string[]>([]);
  const [sessionDataUser, setSessionDataUser] = useState<any>(null);

  const { data: sessionData, status: sessionStatus } = useSession();
  const { address, status: walletStatus } = useAccount();

  useEffect(() => {
    if (sessionData?.user && sessionData.user !== sessionDataUser) {
      setSessionDataUser(sessionData.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);

  // Requests
  // - All
  const {
    data: completedQuizzesAllData,
    // isLoading: completedQuizzesAllIsLoading,
    refetch: refetchCompletedQuizzesAll,
  } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionDataUser !== null && address !== undefined,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (
      walletStatus === "disconnected" ||
      sessionStatus === "unauthenticated"
    ) {
      setSessionDataUser(null);
      setCompletedQuizzesIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStatus, walletStatus]);

  useEffect(() => {
    if (completedQuizzesAllData) {
      const completedIds = completedQuizzesAllData.map(
        (quiz: any) => quiz.lesson,
      ); // DEV_NOTE: the -lesson- field now is the lessonId
      if (completedIds !== completedQuizzesIds)
        setCompletedQuizzesIds(completedIds);
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

  // - Get All lessons to get the Id's
  const { data: allLessonsData } = api.lessons.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (allLessonsData && projects && completedQuizzesIds.length !== 0) {
      const projectsWithCompleteStatus = projects.map((lesson) => {
        const currentLessonId = allLessonsData.find(
          (lessonData) =>
            lessonData.projectLessonNumber?.toString() ===
            lesson.slug.toString(), // DEV_NOTE: forcing .toString() to avoid type errors
        )?.id;

        const completed = currentLessonId
          ? completedQuizzesIds.includes(currentLessonId)
          : false; // DEV_NOTE: if the lesson is not found, it is not completed
        return { ...lesson, completed };
      });

      setProjects(projectsWithCompleteStatus);
    } else if (allLessonsData && projects && completedQuizzesIds.length === 0) {
      const projectsWithCompleteStatus = projects.map((lesson) => {
        return { ...lesson, completed: false };
      });
      setProjects(projectsWithCompleteStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedQuizzesIds]);

  useEffect(() => {
    if (allLessonsData && fundamentals && completedQuizzesIds.length !== 0) {
      const fundamentalsWithCompleteStatus = fundamentals.map((lesson) => {
        const currentLessonId = allLessonsData.find(
          (lessonData) =>
            lessonData.fundamentalLessonName?.toString() ===
            lesson.slug.toString(), // DEV_NOTE: forcing .toString() to avoid type errors
        )?.id;

        const completed = currentLessonId
          ? completedQuizzesIds.includes(currentLessonId)
          : false; // DEV_NOTE: if the lesson is not found, it is not completed
        return { ...lesson, completed };
      });

      setFundamentals(fundamentalsWithCompleteStatus);
    } else if (
      allLessonsData &&
      fundamentals &&
      completedQuizzesIds.length === 0
    ) {
      const fundamentalsWithCompleteStatus = fundamentals.map((lesson) => {
        return { ...lesson, completed: false };
      });
      setFundamentals(fundamentalsWithCompleteStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedQuizzesIds]);

  return (
    <AppContext.Provider
      value={{
        completedQuizzesIds,
        projects,
        fundamentals,
        allLessonsData: allLessonsData || [],
        refetchCompletedQuizzesAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
