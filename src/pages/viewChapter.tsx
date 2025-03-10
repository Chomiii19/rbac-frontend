import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import axios from "axios";
import Manga from "../@types/mangaInterface";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ViewChapter() {
  const [manga, setManga] = useState<Manga>();
  const { id, chapter } = useParams();

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
    <>
      <Header />
      <main className="w-full h-auto bg-primary-800 flex gap-5 pt-[45px] font-manrope text-zinc-200">
        <div className="bg-[#161616] h-full w-full pl-8 pr-[370px] py-3">
          <p>
            The town of Evercrest was a place where time moved slowly, nestled
            between towering mountains and dense forests that whispered secrets
            with the wind. It was here that Elara found herself standing at the
            edge of the old stone bridge, the moon casting silver reflections on
            the river below. <br />
            <br />
            She had never believed in fate, but tonight, something felt
            different. She clutched the locket in her hand, its delicate silver
            chain slipping through her fingers. It had been left for her in an
            old chest belonging to her grandmother—a woman she had never met but
            who, according to family tales, had vanished without a trace one
            autumn night decades ago. Inside the locket was a single name,
            engraved in looping cursive: ‘Aeron.’ “Who were you?” she whispered
            to the night. <br />
            <br />A sudden gust of wind rustled the trees, and for a moment,
            Elara thought she saw a figure standing on the opposite bank of the
            river.
            <br />
            <br /> A man, tall and dressed in a cloak that shimmered under the
            moonlight. But when she blinked, he was gone. Go home, Elara, her
            instincts warned, but her curiosity anchored her in place. The
            moment stretched, heavy and uncertain. Then, as if time itself had
            been waiting for her decision, the locket in her palm grew warm. The
            air around her shimmered, distorting like ripples in water, and
            before she could react, the world shifted. <br />
            <br />
            <br />
            Chapter 2: The Threads of Yesterday Elara stumbled forward, catching
            herself on the stone railing of the bridge. <br />
            <br />
            But when she looked up, Evercrest was different. The lantern-lit
            streets were gone, replaced by cobbled roads and horse-drawn
            carriages. The bridge beneath her feet was new, its stones
            unweathered by time. A shout rang out from the distance.
            <br />
            <br /> “Halt!” She turned, heart pounding, to see a group of
            soldiers in dark uniforms rushing toward her. Elara knew she had
            only moments to act. Instinct took over as she darted toward the
            forest, her breaths shallow with fear. This wasn’t possible. And
            yet, every sensation told her it was real. As she weaved through the
            trees, a hand caught her wrist, pulling her into the shadows. <br />
            <br />
            She barely had time to scream before another hand covered her mouth.
            “Quiet,” a deep voice murmured. “Unless you want them to find you.”
            Elara’s pulse raced as she turned to face her captor. <br />
            <br />
            He was young, his features sharp but familiar, as if she had seen
            him in a dream. And then she noticed the crest on his cloak—a symbol
            identical to the one on her locket. “Aeron?” she breathed. His eyes
            widened slightly. “Who are you?” Elara had no answer. She only knew
            that, somehow, she had stepped into the past—and the echoes of time
            had only just begun to reveal their secrets. <br />
            <br />
            <br />
            Chapter 3: A World Unraveled Aeron didn’t loosen his grip right
            away, his gaze flickering between Elara’s face and the approaching
            soldiers. <br />
            <br />
            The sound of boots crunching against gravel grew louder. He muttered
            a curse under his breath, then pulled her deeper into the forest.
            “Keep moving,” he ordered in a hushed voice. Elara’s mind raced with
            questions, but she had no choice but to follow. They navigated
            through twisted roots and dense foliage until they reached the ruins
            of what appeared to be an old chapel, its stone walls covered in
            ivy. Aeron finally released her wrist and turned to face her fully.
            “Start talking,” he said. <br />
            <br />
            “Who sent you?” “No one sent me,” Elara replied, rubbing her wrist.
            “I don’t even know how I got here.” Aeron narrowed his eyes. “Then
            how do you have that locket?” Elara hesitated before holding it up.
            “It belonged to my grandmother. I found it in her old chest.” His
            expression shifted from suspicion to something else—something almost
            like recognition. He exhaled slowly. “That locket was lost over
            fifty years ago.” Elara felt a chill crawl up her spine. <br />
            <br />
            “That’s impossible.” Aeron studied her closely, then nodded to
            himself. “Perhaps not.” Before she could press him for answers, a
            rustling sound came from the trees. Aeron tensed, reaching for the
            dagger at his waist. But instead of soldiers, an older man emerged
            from the shadows, his face lined with age and wisdom. He wore robes
            embroidered with strange symbols, his piercing blue eyes locking
            onto Elara immediately. “So,” the man said, his voice deep and
            knowing. “The traveler has arrived.” Chapter 4: The Prophecy of the
            Wanderer Elara took a step back. “What do you mean, ‘traveler’?” The
            old man smiled. “You have crossed the veil of time. And now, the
            past and future are at war within you.” Aeron sheathed his dagger
            but remained guarded. “You knew this would happen?” The man nodded.
            “There is a prophecy… a tale of a wanderer who would come bearing
            the lost locket, one who would tip the scales of fate.” Elara’s
            hands tightened around the locket. “I don’t believe in prophecies.”
            The old man chuckled. “Neither did I. Until I met you.” Aeron
            crossed his arms. “If she is the traveler, what does that mean for
            us?” The old man’s smile faded. “It means that the echoes of time
            are stirring. And if we do not act quickly, all of history may
            unravel.” <br />
            <br />
            Elara’s breath caught in her throat. She had come searching for
            answers about her grandmother. But now, it seemed, she had found
            something far greater—a fate she had never asked for, in a world she
            barely understood. <br />
            <br />
            And the journey was only beginning.
          </p>
        </div>
        <section className="h-full w-[350px] fixed right-0 bg-primary-800 pt-[0px]">
          <header className="flex gap-3 items-center bg-primary-600 p-1 px-2">
            <img src={manga?.images.jpg.small_image_url} className="h-10" />
            <h1 className="font-semibold text-xl">{manga?.title}</h1>
          </header>

          <div className="w-full flex mt-3 justify-center items-center">
            <button className="border border-zinc-800 bg-[#161616] rounded-l-md p-1">
              <ChevronLeft />
            </button>
            <select
              name=""
              id=""
              className="bg-[#161616] outline-0 border-y border-y-zinc-800 w-1/2 p-1"
            >
              <option value="1">Chapter {chapter?.split("-")[1]}</option>
              <option value="2">Chapter 2</option>
              <option value="3">Chapter 3</option>
              <option value="4">Chapter 4</option>
            </select>
            <button className="border border-zinc-800 bg-[#161616] rounded-r-md p-1">
              <ChevronRight />
            </button>
          </div>

          <p className="text-zinc-500 text-xs px-2 mt-2">Updated: 2 days ago</p>

          <section className="w-full h-full px-2 mt-5">
            <div className="w-full h-full border-t border-t-zinc-800 flex justify-center items-center">
              <p className="text-sm text-zinc-500">Click to reveal comments.</p>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ViewChapter;
