import { useEffect, useState } from "react";
import axios from "axios";
import EmblaCarousel from "../components/EmblaCarousel";
import Footer from "../components/footer";
import Header from "../components/header";
import { EmblaOptionsType } from "embla-carousel";
import Manga from "../@types/mangaInterface";
import { Heart, X } from "lucide-react";
import { Link } from "react-router-dom";

const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 3;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const weeks = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function HomePage() {
  return (
    <>
      <Header />
      <Main />
      <PopularSection />
      <NewSection />
      <Footer />
    </>
  );
}

function Main() {
  const [activeWeek, setActiveWeek] = useState(1);

  return (
    <main className="w-full h-auto bg-primary-800 pt-[45px] flex flex-col text-zinc-200 font-manrope">
      <div className="w-full relative overflow-hidden h-[400px] flex justify-center items-center cursor-grab">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        <img
          src="/assets/images/windbreaker.jpg"
          className="w-full absolute opacity-50 blur-xs"
        />
      </div>

      <section className="bg-zinc-900 w-full flex justify-center items-center">
        {weeks.map((week, i) => (
          <p
            onClick={() => setActiveWeek(i + 1)}
            key={i}
            className={`px-7 py-3 hover:text-primary cursor-pointer font-semibold ${
              activeWeek === i + 1 ? "bg-primary hover:text-zinc-200" : ""
            }`}
          >
            {week}
          </p>
        ))}
      </section>
    </main>
  );
}

function PopularSection() {
  const [popularManga, setPopularManga] = useState<Manga[]>([]);
  const [modal, setModal] = useState(false);

  const getPopularManga = async () => {
    const options = {
      method: "GET",
      url: "https://api.jikan.moe/v4/top/manga",
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data);
      setPopularManga(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopularManga();
  }, []);

  return (
    <section className="w-full h-auto bg-primary-800 pt-[30px] flex flex-col text-zinc-200 font-manrope px-52">
      <h1 className="font-semibold text-2xl">Top Novels in NovelKokoro</h1>

      {modal && (
        <div className="fixed inset-0 w-full h-full backdrop-blur-xs z-20 flex justify-center items-center">
          <form className="bg-primary-800 border border-zinc-800 rounded-xl py-4 px-6 w-[400px] flex flex-col items-center gap-2 drop-shadow-2xl relative">
            <h1 className="text-2xl font-semibold">Bind your email address</h1>
            <div
              onClick={() => setModal(false)}
              className="absolute right-2 bg-primary-700 p-2 rounded-full top-1 cursor-pointer"
            >
              <X />
            </div>
            <p className="text-center text-sm text-zinc-500">
              Connect with us by binding your email address to{" "}
              <span className="text-primary font-bold">gain access</span> to all
              mangas and stay tuned for latest news.
            </p>

            <div className="flex gap-2 items-center">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
              />
            </div>

            <button className="bg-primary rounded-lg font-bold w-full cursor-pointer">
              Verify Email
            </button>
          </form>
        </div>
      )}

      <div className="flex gap-4 w-full mt-3 overflow-hidden">
        {" "}
        {popularManga.map((manga, i) => {
          return (
            <Link
              to={`/manga/${manga.mal_id}`}
              onClick={() => setModal(true)}
              key={i}
              className="flex flex-col gap-2 w-32 shrink-0 justify-between border border-zinc-800 bg-primary-700 p-2 rounded-lg hover:border-primary group transition-all duration-150 ease-in-out cursor-pointer"
            >
              {manga.rank < 6 ? (
                <p className="absolute bg-primary p-1 font-bold rounded-sm z-10">
                  {manga.rank}
                </p>
              ) : (
                <></>
              )}

              <img
                src={manga.images.jpg.large_image_url}
                className="w-full group-hover:scale-105 rounded-md transition-all duration-150 ease-in-out"
              />
              <div className="flex flex-col">
                <p className="text-xs text-zinc-500">
                  {manga.status === "Publishing" ? "Ongoing" : manga.status}
                </p>
                <h1 className="group-hover:text-primary">
                  {manga.title.length > 12
                    ? manga.title.slice(0, 12).concat("...")
                    : manga.title}
                </h1>
                <p className="text-xs flex text-primary">
                  <Heart className="h-3" />
                  {manga.favorites}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function NewSection() {
  const [popularManga, setPopularManga] = useState<Manga[]>([]);

  const getPopularManga = async () => {
    const options = {
      method: "GET",
      url: "https://api.jikan.moe/v4/manga?order_by=start_date&sort=desc",
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.data);
      setPopularManga(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopularManga();
  }, []);

  return (
    <section className="w-full h-auto bg-primary-800 py-[30px] flex flex-col text-zinc-200 font-manrope px-52">
      <h1 className="font-semibold text-2xl">New Novels in NovelKokoro</h1>

      <div className="flex gap-4 w-full mt-3 overflow-hidden">
        {" "}
        {popularManga.map((manga, i) => {
          return (
            <Link
              to={`/manga/${manga.mal_id}`}
              key={i}
              className="flex flex-col gap-2 w-32 shrink-0 justify-between border border-zinc-800 bg-primary-700 p-2 rounded-lg hover:border-primary group transition-all duration-150 ease-in-out cursor-pointer"
            >
              <img
                src={manga.images.jpg.large_image_url}
                className="w-full group-hover:scale-105 rounded-md transition-all duration-150 ease-in-out"
              />
              <div className="flex flex-col">
                <p className="text-xs text-zinc-500">
                  {manga.status === "Publishing" ? "Ongoing" : manga.status}
                </p>
                <h1 className="group-hover:text-primary">
                  {manga.title.length > 12
                    ? manga.title.slice(0, 12).concat("...")
                    : manga.title}
                </h1>
                <p className="text-xs flex text-primary">
                  <Heart className="h-3" />
                  {manga.popularity}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default HomePage;
