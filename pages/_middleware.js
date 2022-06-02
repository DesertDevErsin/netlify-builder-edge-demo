// pages/_middleware.js

import { NextResponse } from "next/server";
import {
  PersonalizedURL,
  getUserAttributes
} from "@builder.io/personalization-utils";

export default function middleware(request) {
  const url = request.nextUrl;
  const requestPath = url.pathname;

  // Rewrite any URL that has a path that doesn't start with /builder,
  // which is special (see below).
  if (!requestPath.startsWith("/builder")) {
    const query = Object.fromEntries(url.searchParams);
    // Create a new URL with a base64 hash in the query params.
    const personlizedURL = new PersonalizedURL({
      pathname: requestPath,
      attributes: {
        // Include any builder.userAttributes.* query params.
        ...getUserAttributes({ ...query }),
        // Include the visitor's audience 
        audience: query.audience || "clothing",
      },
    });

    // Rewrite the URL path with the hash.
    url.pathname = personlizedURL.rewritePath();

    // After returning the rewritten URL, the browser silently redirects
    // to /builder/the-base64-hash, which is our page template from before.
    // The URL in the browser's address bar doesn't change.
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
