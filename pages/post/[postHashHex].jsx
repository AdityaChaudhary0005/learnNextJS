import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import desoAPI from "../api/desoAPI";

const da = new desoAPI();

function Post({ isPostFound, postFound, imgURL, curentURL }) {
//get current hosted domain URL
  //const router = useRouter();
  //console.log(router);
  //const { postHashHex } = router.query;
  //console.log(postHashHex);

  /* useEffect(() => {
    if (postHashHex == undefined) return;
    setPost(response);
    if (response.PostFound.ImageURLs != null) {
      setBodyImg(response.PostFound.ImageURLs[0]);
    }
    setIsLoading(false);

    console.log("fetching...");
    fetchPost();
    console.log("loaded...");
  }, [postHashHex]); */
  return (
    <>
      {!isPostFound ? (
        <div>No Post Found</div>
      ) : (
        <>
          <Head>
            <title>Post by {postFound.ProfileEntryResponse.Username}</title>
            <meta
              property='og:title'
              content={`Post by ${postFound.ProfileEntryResponse.Username}`}
              key='title'
            />

<meta content={`https://${curentURL}/post/${postFound.PostHashHex}`} property="og:url" />
            <meta
              property='og:description'
              content={postFound.Body.slice(0, 150)}
              key='description'
            />
            <meta name="twitter:card" content={postFound.Body}></meta>
            <meta property='og:image' content={imgURL} key='image' />
            <meta name="twitter:card" content="summary_large_image"></meta>
          </Head>
          <div>{postFound.Body}</div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { postHashHex } = context.query;
  
  const curentURL = context.req.headers.host + "";
  console.log("test " + curentURL)
  const response = await da.getSinglePost(postHashHex);
  var postFound = null;
  var imgURL = null;
  var isPostFound = false;
  if (response != null) {
    var postFound = response.PostFound;
  

    isPostFound = true;
    if (postFound.ImageURLs != null) {
      imgURL = postFound.ImageURLs[0];
    }
  }
  return {
    props: {
      isPostFound,
      postFound,
      imgURL,
      curentURL
    },
  };
}

export default Post;
