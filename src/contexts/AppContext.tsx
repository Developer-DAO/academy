import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { createContext, useState } from "react";

type ContextProps = {
  message: string;
  setMessage: (message: string) => void;
  children: React.ReactElement;
};

const initialState = {
  message: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setMessage: (message: string) => {},
};

export const AppContext = createContext(initialState);

function Context({ children }: ContextProps) {
  const [message, setMessage] = useState("");
  const { data: sessionData } = useSession();
  const [fetchNow, setFetchNow] = useState(true);

  console.log({ sessionData });

  // Requests
  // - All
  const {
    // data: completedQuizzesAllData,
    // isLoading: completedQuizzesAllIsLoading,
    // refetch: refetchCompletedQuizzesAll,
  } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionData?.user !== undefined && fetchNow,
    },
  );

  return (
    <AppContext.Provider value={{ message, setMessage }}>
      {children}
    </AppContext.Provider>
  );
}

export default Context;
