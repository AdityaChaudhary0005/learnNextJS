import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import desoAPI from "../api/desoAPI";

const da = new desoAPI();
export default function Post() {
  const router = useRouter();
  console.log(router);
  const { postHashHex } = router.query;
  console.log(postHashHex);

  const [isLoading, setIsLoading] = useState(true);
  const [bodyImg, setBodyImg] = useState("");
  const [post, setPost] = useState(null);
  useEffect(() => {
    async function fetchPost() {
      const response = await da.getSinglePost(
        postHashHex
      );
      setPost(response);
      if(response.PostFound.ImageURLs != null) {
        setBodyImg(response.PostFound.ImageURLs[0]);
      }
      setIsLoading(false);
    }
    if(postHashHex == undefined) return
    console.log("fetching...");
    fetchPost();
    console.log("loaded...");
  }, [postHashHex]);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Head>
            <title>
              Post by {post.PostFound.ProfileEntryResponse.Username}
            </title>
            <meta
              property='og:title'
              content={`Post by ${post.PostFound.ProfileEntryResponse.Username}`}
              key='title'
            />
            <meta
              property='og:description'
              content={post.PostFound.Body}
              key='description'
            />
            <meta property='og:image' content={bodyImg} key='image' />
          </Head>
          <div>{post.PostFound.Body}</div>
        </>
      )}
    </>
  );
}
