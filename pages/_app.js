import Header from "@/components/Header/Header";
import GlobalStyle from "../styles";
import useSWR, { SWRConfig } from "swr";
import Navigation from "@/components/Navigation/Navigation";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const {
    data: flashcards,
    isLoading,
    error,
  } = useSWR("/api/flashcards", fetcher);

  const {
    data: collections,
    isLoading: collectionsIsLoading,
    error: collectionsFetchError,
  } = useSWR("/api/collections", fetcher);
  
  return (
    <>
      <GlobalStyle />
      <Header />
      <Navigation />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          flashcards={flashcards}
          isLoading={isLoading}
          error={error}
          collections={collections}
          collectionsIsLoading={collectionsIsLoading}
          collectionsFetchError={collectionsFetchError}
        />
      </SWRConfig>
    </>
  );
}
