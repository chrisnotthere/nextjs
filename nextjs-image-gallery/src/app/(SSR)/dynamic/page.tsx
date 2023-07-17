import Image from "next/image";
import { UnsplashImage } from "../../../models/unsplash-image";
import Link from "next/link";
import { Alert } from "../../../components/bootstrap";

export const metadata = {
  title: "Dynamic Fetching - NextJS 13.4 Image Gallery",
};

// revalidate tells Next.js how often it should re-generate the page in the background
// 0 means that the page will be re-generated on every request, nothing will be cached
export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
      // this is another way to prevent caching, 
      // { cache: "no-cache"} // 'no-store' is another option which does the same thing
      // { next: { revalidate: 0 }} // this is yet another way to prevent caching
  );
  const image: UnsplashImage = await response.json();

  // we want to limit the width of the image to 500px, but we also want to maintain the aspect ratio
  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches data dynamically</strong>.
        Every time you refresh the page, you will see a new image.
      </Alert>

      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      by <Link href={'/users/' + image.user.username}>{image.user.username}</Link> 
    </div>
  );
}
