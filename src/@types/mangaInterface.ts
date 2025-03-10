interface Manga {
  approved: boolean;
  mal_id: number;
  title: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: string[];
  titles: { type: string; title: string }[];

  url: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    };
    webp?: {
      image_url: string;
      large_image_url: string;
      small_image_url: string;
    };
  };
  type: string;
  chapters: number | null;
  volumes: number | null;
  status: string;
  publishing: boolean;
  published: {
    from: string;
    to: string | null;
    string: string;
  };
  rank: number;
  popularity: number;
  score: number;
  scored_by: number;
  members: number;
  favorites: number;
  synopsis: string;
  background?: string;
  authors: { name: string; url: string }[];
  genres: { mal_id: number; name: string }[];
  themes: { mal_id: number; name: string }[];
  serializations: { name: string; url: string }[];
}

export default Manga;
