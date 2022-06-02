import { BuilderComponent, builder } from "@builder.io/react";
import { PersonalizedURL } from "@builder.io/personalization-utils";
import { useEffect } from "react";

builder.init("bfa63b918c9344a29be553aadd3e5ce9");

export async function getStaticProps({ params }) {
  const personlizedURL = PersonalizedURL.fromHash(params.hash);
  const attributes = personlizedURL.attributes;
  const page = await builder
    .get("page", {
      userAttributes: attributes,
    })
    .promise();

  return {
    props: {
      page: page || null,
      attributes,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export default function Path({ page, attributes, locale }) {
  useEffect(() => {
    builder.setUserAttributes(attributes);
  }, []);

  return (
    <BuilderComponent
      context={{ attributes }}
      data={{ attributes, locale }}
      model="page"
      content={page}
    />
  );
}
