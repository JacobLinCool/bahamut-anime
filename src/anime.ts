import type { EndpointResult } from "./endpoints";
import { VolumeType } from "./types";
import { fetcher } from "./fetcher";
import { Episode } from "./episode";

export class Anime {
    constructor(public sn: number) {}

    async info(): Promise<EndpointResult<"v3/video.php?anime_sn=">> {
        return fetcher.get(`v3/video.php?anime_sn=${this.sn}`);
    }

    async news(): Promise<{ title: string; url: string; pic: string }[]> {
        const info = await this.info();
        return info.data.relative_gnn;
    }

    async related(): Promise<Anime[]> {
        const info = await this.info();
        return info.data.relative_anime.map((item) => new Anime(+item.anime_sn));
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
            acc[volume as unknown as VolumeType] = episode.map(
                (item) => new Episode(item.video_sn, this),
            );
            return acc;
        }, {} as Record<VolumeType, Episode[]>);
    }
}
