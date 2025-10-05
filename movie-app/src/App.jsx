import React, { useEffect, useState } from "react";
import Search from "./components/Search";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = async () => {
    try {
      // const accountRes = await fetch(
      //   "https://api.themoviedb.org/3/account",
      //   API_OPTIONS
      // );

      // if (!accountRes.ok) {
      //   throw new Error("Failed to fetch movies");
      // }
      // const accountData = await accountRes.json();
      // console.log(accountData);
      const accountId = null;

      const apiBase = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`;

      const favResponse = await fetch(apiBase, API_OPTIONS);
      if (!favResponse.ok) {
        throw new Error("fallo 2da peticion");
      }

      const data = await favResponse.json();
      console.log(data);
    } catch (error) {
      console.log(`Error fetching movies:${error}`);
      setErrorMessage("Error fetching movies. Please try again later");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="" />
          <h1 className="text-5xl font-bold">
            Find <span className="text-gradient">Movies</span> You will enjoy
            without the hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All Movies</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
};

export default App;
