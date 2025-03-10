import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Manga from "../@types/mangaInterface";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ArrowDown, Bookmark, Play } from "lucide-react";
import { useUser } from "../hooks/UserContext"; // Import User Context

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
  const [manga, setManga] = useState<Manga | null>(null);
  const { id } = useParams();
  const { user, refreshUser } = useUser();

  const isFollowed = user?.followedManga.includes(Number(id)) || false;

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/manga/${id}/full`
        );
        setManga(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchManga();
  }, [id]);

  const startReading = async () => {
    try {
      await axios.patch(
        "https://rbac-zffx.onrender.com/api/v1/app/read-chapters",
        { mangaId: Number(id), latestRead: 0 },
        { withCredentials: true }
      );
      refreshUser();
    } catch (error) {
      console.error("Failed to start reading:", error);
    }
  };

  const followManga = async () => {
    try {
      await axios.patch(
        "https://rbac-zffx.onrender.com/api/v1/app/followed-manga",
        { mangaId: Number(id) },
        { withCredentials: true }
      );
      refreshUser();
    } catch (error) {
      console.error("Failed to follow manga:", error);
    }
  };

  return (
    <main className="w-full h-auto bg-primary-800 flex gap-5 px-52 pt-[80px] font-manrope text-zinc-200 pb-4">
      <aside className="w-[45%]">
        <img src={manga?.images.jpg.large_image_url} alt={manga?.title} />
      </aside>
      <section className="flex flex-col w-full">
        <header className="flex flex-col gap-2 w-full border-b border-b-zinc-700 pb-2">
          <h1 className="text-5xl font-bold">{manga?.title}</h1>
          <p className="text-zinc-500">
            {manga?.titles.map((title) => title.title).join(" • ")}
          </p>
        </header>

        <section className="text-sm text-zinc-500 py-5 flex flex-col gap-1">
          <p>Chapters: {manga?.chapters || 0}</p>
          <p>Origination: {manga?.type}</p>
          <p>Published: {manga?.published.from?.slice(0, 4)}</p>
          <p>Status: {manga?.status}</p>
          <p>Ranked: {manga?.rank}</p>
          <p>Favorites: {manga?.favorites}</p>
        </section>

        <div className="flex gap-3 font-semibold text-sm pb-4">
          <button
            onClick={startReading}
            className="w-[300px] bg-primary flex items-center justify-center rounded-lg py-1 cursor-pointer"
          >
            <Play className="h-5" />
            Start Reading
          </button>
          <button
            onClick={followManga}
            disabled={isFollowed}
            className={`flex w-[300px] items-center justify-center border border-primary-500 bg-primary-500/40 rounded-lg py-1 cursor-pointer hover:border-primary hover:text-primary transition-colors duration-150 ease-in-out ${
              isFollowed ? "opacity-50" : ""
            }`}
          >
            <Bookmark className="h-5" />
            Follow Authors
          </button>
        </div>
      </section>
    </main>
  );
}

function SectionChapters() {
  const { id } = useParams();
  const { user, refreshUser } = useUser();

  const isFollowed = user?.followedManga.includes(Number(id)) || false;
  const [latestRead, setLatestRead] = useState<number>(-1);

  useEffect(() => {
    const userLatestRead =
      user?.readChapters.find((c) => c.mangaId === Number(id))?.latestRead ??
      -1;
    setLatestRead(userLatestRead);
  }, [user, id]);

  const updateLatestRead = async (chapterNum: number) => {
    console.log("🔹 Attempting to update latest read chapter...");
    console.log("Current latestRead:", latestRead);
    console.log("Clicked chapter:", chapterNum);

    if (chapterNum !== latestRead + 1) {
      console.log("❌ Not allowed to update (wrong order)");
      return;
    }

    setLatestRead(chapterNum);
    console.log("✅ UI updated: latestRead is now", chapterNum);

    try {
      const response = await axios.patch(
        "https://rbac-zffx.onrender.com/api/v1/app/read-chapters",
        { mangaId: Number(id), latestRead: chapterNum },
        { withCredentials: true }
      );

      console.log("✅ Server update successful:", response.data);
      refreshUser();
    } catch (error) {
      console.error("❌ Failed to update read chapter:", error);
    }
  };

  return (
    <section className="w-full h-auto bg-primary-800 flex gap-5 px-52 pt-[30px] font-manrope text-zinc-200 pb-5">
      <div className="pt-2 border-t border-t-zinc-700 w-full">
        <h1 className="text-2xl font-semibold">Chapters</h1>

        {!isFollowed ? (
          <p className="text-red-500 mt-2">
            Follow the manga to read chapters!
          </p>
        ) : (
          <>
            <header className="flex items-center gap-44 text-zinc-500 mt-2">
              <div className="flex items-center gap-2">
                <button className="flex">
                  Chap <ArrowDown />
                </button>
                <input
                  type="text"
                  placeholder="Search chapter"
                  className="outline-0 border border-zinc-700 rounded-lg focus:border-primary transition-colors duration-150 ease-in-out px-2 py-0.5 bg-primary-700 focus:bg-primary-500/40 mt-1"
                />
              </div>
              <p>Date</p>
            </header>

            <section className="w-full h-[300px] mt-3 gap-2 flex flex-col overflow-auto">
              {Array.from({ length: 10 }).map((_, i) => (
                <Chapter
                  key={i}
                  num={i}
                  latestRead={latestRead}
                  updateLatestRead={updateLatestRead}
                  isFollowed={isFollowed}
                />
              ))}
            </section>
          </>
        )}
      </div>
    </section>
  );
}

function Chapter({
  num,
  latestRead,
  updateLatestRead,
  isFollowed,
}: {
  num: number;
  latestRead: number;
  updateLatestRead: (chapterNum: number) => void;
  isFollowed: boolean;
}) {
  const isClickable =
    isFollowed && (num === latestRead + 1 || num <= latestRead);

  return (
    <Link
      to={isClickable ? `chapter-${num + 1}` : "#"}
      onClick={() => {
        if (isClickable && num === latestRead + 1) {
          updateLatestRead(num + 1);
        }
      }}
      className={`w-full flex gap-96 px-2 py-0.5 rounded-lg ${
        isClickable
          ? "hover:bg-primary-700 hover:text-primary"
          : "opacity-50 cursor-not-allowed"
      }`}
    >
      <h1>Chapter {num + 1}</h1>
      <p>2 days ago</p>
    </Link>
  );
}

export default ViewManga;
