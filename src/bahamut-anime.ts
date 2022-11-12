import { Anime } from "./anime";
import { AnimeCategory } from "./types";
import { fetcher } from "./fetcher";

export class BahamutAnime {
    async search(keyword: string): Promise<Anime[]> {
        const results = await fetcher.get(`v1/search.php?kw=${keyword}`);
        return results.anime.map((item) => new Anime(item.anime_sn));
    }

    async list(type: AnimeCategory, page: number, sort = 0): Promise<Anime[]> {
        const results = await fetcher.get(
            `v2/list.php?c=${AnimeCategory[type]}&page=${page}&sort=${sort}`,
        );
        return results.data.animeList.map((item) => new Anime(item.anime_sn));
    }

    async updates(): Promise<{ anime: Anime; time: Date }[]> {
        const results = await fetcher.get("v3/index.php");
        return results.data.newAnime.date.map((item) => ({
            anime: new Anime(+item.animeSn),
            time: new Date(`${new Date().getFullYear()} ${item.upTime} ${item.upTimeHours}`),
        }));
    }
}
