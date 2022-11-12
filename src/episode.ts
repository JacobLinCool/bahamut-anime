import type { EndpointResult } from "./endpoints";
import type { Anime } from "./anime";
import { fetcher } from "./fetcher";

export class Episode {
    public fetcher = fetcher;

    constructor(public sn: number, public anime: Anime) {}

    async info(): Promise<EndpointResult<"v3/video.php?sn=">> {
        return this.fetcher.get(`v3/video.php?sn=${this.sn}`);
    }

    async ep(): Promise<EndpointResult<"v3/video.php?sn=">["data"]["video"]> {
        const info = await this.info();
        return info.data.video;
    }

    async danmu(): Promise<EndpointResult<"v3/token.php?sn=">["danmu"]> {
        const token = await this.fetcher.get(`v3/token.php?sn=${this.sn}`);
        return token.danmu;
    }
}
