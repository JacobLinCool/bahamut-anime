import { fetcher, BahamutAnime, AnimeCategory } from "..";

beforeEach(() => {
    fetcher.on("cache-hit", (endpoint) => {
        console.log(`Cache hit: ${endpoint}`);
    });
    fetcher.on("cache-miss", (endpoint) => {
        console.log(`Cache miss: ${endpoint}`);
    });
    fetcher.on("fetch-start", (url) => {
        console.log(`Fetch start: ${url}`);
    });
    fetcher.on("fetch-end", (url) => {
        console.log(`Fetch end: ${url}`);
    });
    fetcher.on("json-parse", (url, json) => {
        console.log(`JSON parse: ${url}`, Object.keys(json));
    });
});

afterEach(() => {
    fetcher.listeners.clear();
    fetcher.prune();
});

test("取得「奇幻冒險」類別第一頁每一部的標題", async () => {
    const baha = new BahamutAnime();

    const animes = await baha.list(AnimeCategory.奇幻冒險, 1);
    expect(animes.length).toEqual(30);

    const titles = await Promise.all(animes.map((anime) => anime.title()));
    expect(titles.length).toEqual(animes.length);

    // test cache
    const start_time = Date.now();

    const animes2 = await baha.list(AnimeCategory.奇幻冒險, 1);
    expect(animes2.length).toEqual(animes.length);

    const titles2 = await Promise.all(animes2.map((anime) => anime.title()));
    expect(titles2.length).toEqual(titles.length);

    const end_time = Date.now();
    expect(end_time - start_time).toBeLessThan(100);
});

test("取得最近更新的動畫列表", async () => {
    const baha = new BahamutAnime();

    const updates = await baha.updates();
    expect(updates.length).toBeGreaterThan(0);

    for (const update of updates) {
        expect(update.time.getTime()).toBeLessThanOrEqual(Date.now());
        expect(update.time.getTime()).toBeGreaterThan(new Date("2022-10-01").getTime());
    }
});

test("取得「來自深淵 烈日的黃金鄉」的相關新聞與動畫", async () => {
    const baha = new BahamutAnime();
    const animes = await baha.search("烈日的黃金鄉");
    expect(animes.length).toBeGreaterThan(0);
    expect(animes[0].sn).toBe(113073);
    expect(animes[0].title()).resolves.toBe("來自深淵 烈日的黃金鄉");

    const news = await animes[0].news();
    expect(news.length).toBeGreaterThan(0);

    const related_animes = await animes[0].related();
    expect(related_animes.length).toBeGreaterThan(0);
});

test("取得「孤獨搖滾！」每一集的彈幕內容", async () => {
    const baha = new BahamutAnime();
    const animes = await baha.search("孤獨搖滾");
    expect(animes.length).toBeGreaterThan(0);
    expect(animes[0].sn).toBe(113142);
    expect(animes[0].title()).resolves.toBe("孤獨搖滾！");

    const episodes = await animes[0].episodes();
    expect(episodes["0"].length).toBeGreaterThan(0);

    const danmu = await Promise.all(episodes["0"].map((episode) => episode.danmu()));
    expect(danmu.length).toEqual(episodes["0"].length);

    for (const data of danmu) {
        expect(data.length).toBeGreaterThan(0);
    }

    // check prev / next links
    const info = await Promise.all(episodes["0"].map((episode) => episode.ep()));
    for (let i = 0; i < info.length; i++) {
        if (i !== 0) {
            expect(info[i].prev_video_sn).toEqual(info[i - 1].video_sn);
        }
        if (i !== info.length - 1) {
            expect(info[i].next_video_sn).toEqual(info[i + 1].video_sn);
        }
    }
});
