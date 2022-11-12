import type { EndpointResult } from "./endpoints";
import { VolumeType } from "./types";
import { fetcher } from "./fetcher";
import { Episode } from "./episode";

export class Anime {
    public fetcher = fetcher;

    constructor(public sn: number) {}

    async info(): Promise<EndpointResult<"v3/video.php?anime_sn=">> {
        return this.fetcher.get(`v3/video.php?anime_sn=${this.sn}`);
    }

    async news(): Promise<{ title: string; url: string; pic: string }[]> {
        const info = await this.info();
        return info.data.relative_gnn;
    }

    async related(): Promise<Anime[]> {
        const info = await this.info();

        const animes = info.data.relative_anime.map((item) => new Anime(+item.anime_sn));
        animes.forEach((anime) => (anime.fetcher = this.fetcher));

        return animes;
    }

    async anime(): Promise<EndpointResult<"v3/video.php?anime_sn=">["data"]["anime"]> {
        const info = await this.info();
        return info.data.anime;
    }

    async title(): Promise<string> {
        const info = await this.info();
        return info.data.anime.title.replace(/\[[^\]]+\]$/, "").trim();
    }

    async episodes(): Promise<Record<VolumeType, Episode[]>> {
        const anime = await this.anime();
        return Object.entries(anime.volumes).reduce((acc, [volume, episode]) => {
            acc[volume as unknown as VolumeType] = episode.map((item) => {
                const ep = new Episode(item.video_sn, this);
                ep.fetcher = this.fetcher;
                return ep;
            });
            return acc;
        }, {} as Record<VolumeType, Episode[]>);
    }
}
