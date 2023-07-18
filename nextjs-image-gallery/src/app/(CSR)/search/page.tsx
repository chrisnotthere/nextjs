import SearchPage from "./SearchPage";

// NOTE: we cannot use export const metadata in a client component
// so we need to import the SearchPage component (client) into the page.tsx (server) file
// the server component is a wrapper for the client component
export const metadata = {
  title: "Search - NextJS 13.4 Image Gallery",
};

export default function Page() {
  return <SearchPage />;
}
