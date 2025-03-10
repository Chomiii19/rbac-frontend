import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Manga from "../@types/mangaInterface";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowDown, Bookmark, Play } from "lucide-react";

function ViewManga() {
  return (
    <>
      <Header />
      <Main />
      <SectionChapters />
      <Footer />
    </>
  );
}

function Main() {
  const [manga, setManga] = useState<Manga>();
  const { id } = useParams();

  const fetchManga = async () => {
    const options = {
      method: "GET",
      url: `https://api.jikan.moe/v4/manga/${id}/full`,
    };
    try {
      const response = await axios.request(options);

      setManga(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(manga);
  useEffect(() => {
    fetchManga();
  }, []);

  return (
    <main className="w-full h-auto bg-primary-800 flex gap-5 px-52 pt-[80px] font-manrope text-zinc-200 pb-4">
      <aside className="w-[45%]">
        <img src={manga?.images.jpg.large_image_url} alt="" />
      </aside>
      <section className="flex flex-col w-full">
        <header className="flex flex-col gap-2 w-full border-b border-b-zinc-700 pb-2">
          <h1 className="text-5xl font-bold">{manga?.title}</h1>
          <p className="text-zinc-500">
            {manga?.titles.map((title) => title.title + " • ")}
          </p>
        </header>

        <section className="text-sm text-zinc-500 py-5 flex flex-col gap-1">
          <p>Chapters: {manga?.chapters ? manga.chapters : 0}</p>
          <p>Origination: {manga?.type}</p>
          <p>Published: {manga?.published.from.slice(0, 4)}</p>
          <p>Status: {manga?.status}</p>
          <p>Ranked: {manga?.rank}</p>
          <p>Favorites: {manga?.rank}</p>
        </section>

        <div className="flex gap-3 font-semibold text-sm pb-4">
          <button className="w-[300px] bg-primary flex items-center justify-center rounded-lg py-1 cursor-pointer">
            <Play className="h-5" />
            Start Reading
          </button>
          <button className="flex w-[300px] items-center justify-center border border-primary-500 bg-primary-500/40 rounded-lg py-1 cursor-pointer hover:border-primary hover:text-primary transition-colors duration-150 ease-in-out">
            <Bookmark className="h-5" />
            Follow Authors
          </button>
        </div>

        <section>
          <h1 className="font-semibold">Description</h1>
          <p className="text-sm text-zinc-500">{manga?.background}</p>

          <h1 className="font-semibold mt-2">More info</h1>
          <div className="text-sm text-zinc-500">
            <p>Genres: {manga?.type}</p>
            <p>Authors: {manga?.authors.map((author) => author.name + ", ")}</p>
            <p>Type: {manga?.type}</p>
          </div>
        </section>
      </section>
    </main>
  );
}

function SectionChapters() {
  return (
    <section className="w-full h-auto bg-primary-800 flex gap-5 px-52 pt-[30px] font-manrope text-zinc-200 pb-5">
      <div className="pt-2 border-t border-t-zinc-700 w-full">
        <h1 className="text-2xl font-semibold">Chapters</h1>

        <header className="flex items-center gap-44 text-zinc-500 mt-2">
          <div className="flex items-center gap-2">
            <button className="flex ">
              Chap <ArrowDown />
            </button>

            <input
              type="text"
              placeholder="Search chapter"
              name="username"
              id="username"
              className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
            />
          </div>
          <p>Date</p>
        </header>

        <section className="w-full h-[300px] mt-3 gap-2 flex flex-col overflow-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <Chapter key={i} num={i} />
          ))}
        </section>
      </div>
    </section>
  );
}

function Chapter({ num }: { num: number }) {
  return (
    <Link
      to={`chapter-${num + 1}`}
      className="w-full flex gap-96 cursor-pointer hover:bg-primary-700 px-2 py-0.5 rounded-lg transition-colors duration-150 ease-in-out hover:text-primary"
    >
      <h1>Chapter {num + 1}</h1>
      <p>2 days</p>
    </Link>
  );
}

export default ViewManga;
