import Header from "@/components/Header/Header";
import GlobalStyle from "../styles";
import useSWR, { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const {
    data: flashcards,
    isLoading,
    error,
  } = useSWR("/api/flashcards", fetcher);

  return (
    <>
      <GlobalStyle />
      <Header />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          flashcards={flashcards}
          isLoading={isLoading}
          error={error}
        />
      </SWRConfig>
    </>
  );
}
