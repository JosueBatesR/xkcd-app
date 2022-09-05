import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    // console.log(q);
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults);
      });
  };
  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link href="/">
          <a className="transition hover:opacity-80">
            next<span className="font-light">xkcd</span>
          </a>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2 font-semibold text-sm">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={`/`} locale={restOfLocales[0]}>
              <a className="text- sm font-semibold">{restOfLocales[0]}</a>
            </Link>
          </li>
          <li>
            <input
              className="px-2 py-1 border border-gray-400 rounded-3xl text-xs"
              ref={searchRef}
              type="search"
              onChange={handleChange}
            />
            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0">
                  <ul className="w-full overflow-hidden border border-gray-50 shadow-xl rounded-lg bg-white">
                    <li className="px-2 py-1 m-0" key="all-results">
                      <Link href={`/search?q=${getValue()}`}>
                        <a className="block text-gray-400 px-2 py-1 overflow-hidden text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap">
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>

                    {results.map((result) => {
                      return (
                        <li className="px-2 py-1 m-0" key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <a className="block px-2 py-1 overflow-hidden text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap">
                              {result.title}
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};
