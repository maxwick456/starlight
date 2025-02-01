import React from "react";
import games from "../assets/games.json"; // Ensure this path is correct
import Fuse from "fuse.js";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { BannerAd } from "../components/Ad"; // Ensure this component exists
import { useNavigate } from "react-router-dom";

function Games() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const fuse = new Fuse(games, {
    keys: ["name"],
  });

  const results = fuse.search(searchTerm);
  const filteredGames = searchTerm
    ? results.map((result) => result.item)
    : games;

  function handleOnSearch(e) {
    setSearchTerm(e.target.value);
  }

  async function handleClick(game) {
    if (game.gameurl) {
      // If the game has a gameurl, navigate to that URL
      window.open(game.gameurl, "_blank");
    } else if (game.proxy) {
      const encodedResult = await chemical.encode(game.url, {
        service: "uv",
        autoHttps: true,
      });
      sessionStorage.setItem("lpurl", encodedResult);
      sessionStorage.setItem("rawurl", game.name);
      navigate("/go");
    } else {
      navigate(`/play/${game.url}`);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Games</h1>
        <input
          type="text"
          className="input input-bordered mt-5 transition-width duration-300 w-[300px] focus:w-[320px] focus:input-primary"
          placeholder={`Search ${games.length} Games`}
          value={searchTerm}
          onChange={handleOnSearch}
        />
        <BannerAd />
        <div className="games flex flex-wrap m-0 justify-center gap-4 mt-5">
          {filteredGames.map((game) => {
            // Determine the image source and URL based on the game object structure
            const gameImage = game.imgSrc
              ? `https://maxwick456.github.io/dimg/${game.imgSrc}` // Use the new root for the second type
              : `https://maxwick456.github.io/img/${game.image}`; // Use the original root for the first type

            return (
              <div
                className="game card flex flex-col justify-center items-center"
                key={game.id || game.name} // Use id or name as the key
              >
                <LazyLoadImage
                  src={gameImage}
                  alt={game.name}
                  width="200px"
                  loading="lazy"
                  effect="opacity"
                  height="200px"
                  onClick={() => handleClick(game)}
                  className="rounded-3xl min-h-[200px] min-w-[200px] transition-all hover:scale-95"
                />
                <p className="mt-2 font-bold">{game.name}</p>
                <div className="flex flex-row gap-2">
                  {game.new && <p className="badge badge-primary">NEW</p>}
                  {game.top && <p className="badge badge-primary">🔥</p>}
                  {game.exp && <p className="badge badge-primary">🧪</p>}
                  {game.updated && (
                    <p className="badge badge-primary">🆕 Updated</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Games;