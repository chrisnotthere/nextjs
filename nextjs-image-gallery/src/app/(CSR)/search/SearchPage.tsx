"use client";

import { UnsplashImage } from "@/models/unsplash-image";
import { FormEvent, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from './SearchPage.module.css'
import Image from "next/image";

// because we cannot access the environment variables on the client
// we need to pass them from the server to the client
// so we are calling /api/search from the client, which has access to the environment variables

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent the form from submitting
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search?query=" + query);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>. In order to not leak API credentials, 
        the request is sent to a NextJS <strong>route handler</strong> that runs on the server. 
        This route handler then fetches the data from the Unsplash API and returns it to the client.
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search query</Form.Label>
          <Form.Control name="query" placeholder="E.g. cats, hotdogs, ..." />
        </Form.Group>
        <Form.Group>
          <Button type="submit" className="mb-3" disabled={searchResultsLoading}>
            Search
          </Button>
        </Form.Group>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border"/>}
        {searchResultsLoadingIsError && <div>Something went wrong. Please try again.</div>}
        {searchResults?.length === 0 && <div>No results found. Try a different query.</div>}
      </div>

      {searchResults && (
        <>
          {searchResults.map((image) => (
            <Image
              key={image.urls.raw}
              src={image.urls.raw}
              width={250}
              height={250}
              alt={image.description}
              className={styles.image}
            />
          ))}
        </>  
      )}
        
    </div>
  );
}
