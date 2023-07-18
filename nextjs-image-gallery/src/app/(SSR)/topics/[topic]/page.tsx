import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "../../../../components/bootstrap";
import { Metadata } from "next";

// disable caching
// export const revalidate = 0;

interface PageProps {
  params: { topic: string };
  // searchParams is not needed here, but it's included for completeness
  // searchParams is anything added after the ? in the URL
  searchParams: { [key: string]: string | string[] | undefined };
}

// dynamically set page metadata
export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS 13.4 Image Gallery",
  };
}

// this function is called at build time and preloads data
// so when the page is requested, the data is already available and there is no loading time
export function generateStaticParams() {
  return [
    { params: { topic: "cats" } },
    { params: { topic: "dogs" } },
    { params: { topic: "birds" } },
  ];
}

// only allows the generateStaticParams, any other topic will result in a 404
// export const dynamicParams = false;

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?&query=${topic}&count=5&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter. Pages that are not included in the generateStaticParams will be fetched and rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).

      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          key={image.urls.raw}
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
          className={styles.image}
        />
      ))}
    </div>
  );
}
