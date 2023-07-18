import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from '../../../../components/bootstrap';

interface PageProps {
  params: { username: string },
}

async function getUser(username: string): Promise<UnsplashUser> {
  const response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

  // notFound() will return a 404 page
  if (response.status === 404) notFound();

  return await response.json();
}

// cache the getUser function
// fetch automatically caches the response, but axios and other methods do not
const getUserCached = cache(getUser);

export async function generateMetadata({ params: { username } }: PageProps): Promise<Metadata> {
  const user = await getUser(username);
  // const user = await getUserCached(username);

  return {
    // if first_name and last_name are not defined, filter(Boolean) will remove them from the array
    title:
      [user.first_name, user.last_name]
        .filter(Boolean)
        .join(" " || user.username) + " - NextJS 13.4 Image Gallery",
  };

}

// NOTE: when making the same fetch request twice, the second request will be served from the cache so we are not making the same request twice 
// (only with native fetch, axios and other methods do not cache by default)

export default async function Page({ params: { username } }: PageProps) {
  const user = await getUser(username);
  // const user = await getUserCached(username);

  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong> dynamically from the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>First name: {user.first_name}</p>
      <p>Last name: {user.last_name}</p>
      <a href={'https://unsplash.com/' + user.username}>Unsplash profile</a>
    </div>
  )
}

