import { fetcher } from "..";

test("fetcher on / off", async () => {
    let state: boolean | null = null;
    const hit = () => {
        state = true;
    };
    const miss = () => {
        state = false;
    };
    fetcher.on("cache-hit", hit);
    fetcher.on("cache-miss", miss);

    await fetcher.get("v1/search.php?kw=test");
    expect(state).toBe(false);

    state = null;
    fetcher.off("cache-hit", hit);

    await fetcher.get("v1/search.php?kw=test");
    expect(state).toBe(null);
});
