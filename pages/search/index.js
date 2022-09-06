import Layout from "components/Layout";
import { useI18N } from "context/i18n";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { search } from "services/search.js";

export default function Component({ query, results }) {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Results for {query}`} />
      </Head>
      <Layout>
        <h1>{t("SEARCH_RESULTS_TITLE", results.length, query)}</h1>
        {results.map((result) => {
          return (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <a className="flex flex-row content.center justify-start bg-slate-300 hover:bg-slate-50">
                <Image
                  src={result.img}
                  width={50}
                  height={50}
                  alt={result.alt}
                  className="rounder-full"
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          );
        })}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({ query: q });

  // console.log(results);
  //llamar a la api de Algolia para buscar los resultados
  return {
    props: {
      query: q,
      results,
    },
  };
}
