import { Anime } from "./anime";
import { AnimeCategory } from "./types";
import { Fetcher, fetcher } from "./fetcher";

export class BahamutAnime {
    public fetcher: Fetcher;

    constructor(f = fetcher) {
        this.fetcher = f;
    }

    async search(keyword: string): Promise<Anime[]> {
        const results = await this.fetcher.get(`v1/search.php?kw=${keyword}`);

        const animes = results.anime.map((item) => new Anime(item.anime_sn));
        animes.forEach((anime) => (anime.fetcher = this.fetcher));

        return animes;
    }

    async list(type: AnimeCategory, page: number, sort = 0): Promise<Anime[]> {
        const results = await this.fetcher.get(
            `v2/list.php?c=${AnimeCategory[type]}&page=${page}&sort=${sort}`,
        );

        const animes = results.data.animeList.map((item) => new Anime(item.anime_sn));
        animes.forEach((anime) => (anime.fetcher = this.fetcher));

        return animes;
    }

    async updates(): Promise<{ anime: Anime; time: Date }[]> {
        const results = await this.fetcher.get("v3/index.php");

        const updates = results.data.newAnime.date.map((item) => ({
            anime: new Anime(+item.animeSn),
            time: new Date(`${new Date().getFullYear()} ${item.upTime} ${item.upTimeHours}`),
        }));
        updates.forEach((update) => (update.anime.fetcher = this.fetcher));

        return updates;
    }
}
