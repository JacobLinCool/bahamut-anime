# Bahamut Anime API

Interact with the Bahamut Anime API in a simple and easy way.

## Installation

```sh
pnpm i bahamut-anime
```

> Use `npm` or `yarn` is also fine.

## Examples

There are some examples, you can also checkout the [tests](src/_tests/index.test.ts).

### Search "Fate" and get titles

```ts
import { BahamutAnime } from "bahamut-anime";

const baha = new BahamutAnime();
const animes = await baha.search("Fate");
const titles = await Promise.all(animes.map((anime) => anime.title()));

console.log(titles);
```

### Get danmu of each episode of "Bocchi the Rock!"

```ts
import { Anime } from "bahamut-anime";

const anime = new Anime(113142); // sn of "Bocchi the Rock!"
const episodes = await anime.episodes();
const danmu = await Promise.all(episodes["0"].map((episode) => episode.danmu()));

for (const data of danmu) {
    console.log(data);
}
```

> `episodes["0"]` for japanese version, `episodes["1"]` for movie, `episodes["2"]` for OVA, `episodes["3"]` for chinese version.
>
> In this case, only japanese version is available.
