import type { NumericString, VolumeType } from "./types";

export type EndpointResults = {
    [key: `v1/search.php?kw=${string}`]: {
        history: string[];
        anime: {
            acg_sn: NumericString;
            anime_sn: number;
            title: string;
            dc_c1: NumericString;
            dc_c2: NumericString;
            favorite: boolean;
            flag: string;
            cover: string;
            info: string;
            score: number;
            popular: NumericString;
            highlightTag: {
                bilingual: boolean;
                edition: string;
                vipTime: string;
            };
            kw: string;
            token: string;
        }[];
    };
    [key: `v3/video.php?anime_sn=${number | string}` | `v3/video.php?sn=${number | string}`]: {
        data: {
            video: {
                video_sn: number;
                anime_sn: number;
                duration: number;
                rating: number;
                type: number;
                cover: string;
                quality: string;
                breakpoint: unknown;
                rating_desc: string;
                sponsor_text: null;
                prev_video_sn: number;
                next_video_sn: number;
                title: `${string}[${number}]`;
            };
            anime: {
                anime_sn: number;
                title: `${string}[${number}]`;
                acg_sn: number;
                dc_c1: number;
                dc_c2: number;
                total_volume: number;
                upload_time: `${number}/${number}/${number}`;
                season_start: `${number}/${number}/${number}`;
                season_end: `${number}/${number}/${number}`;
                favorite: boolean;
                flag: string;
                popular: number;
                highlightTag: {
                    bilingual: boolean;
                    edition: string;
                    vipTime: string;
                };
                volume_index: number;
                volumes: {
                    [key in VolumeType]?: {
                        volume: number;
                        video_sn: number;
                        state: number;
                        cover: string;
                    }[];
                };
                cover: string;
                content: string;
                tags: string[];
                category: number;
                director: string;
                publisher: string;
                maker: string;
                score: number;
                star: number;
                userReviewId: string;
            };
            relative_anime: {
                acg_sn: NumericString;
                anime_sn: NumericString;
                title: string;
                dc_c1: NumericString;
                dc_c2: NumericString;
                favorite: boolean;
                flag: string;
                cover: string;
                info: string;
                popular: NumericString;
                highlightTag: {
                    bilingual: boolean;
                    edition: string;
                    vipTime: string;
                };
            }[];
            relative_gnn: {
                url: string;
                title: string;
                pic: string;
            }[];
            promote: [];
        };
    };
    [key: `v3/token.php?sn=${number | string}`]: {
        deviceid: string;
        isLogin: boolean;
        danmu: {
            text: string;
            color: string;
            size: number;
            position: number;
            /** unit: 100 ms */
            time: number;
            sn: number;
            userid: string;
        }[];
        ad: {
            major: {
                videoUrl: string;
                clickUrl: string;
                schedule: string;
                realUrl: string;
                text: string;
                type: string;
                D1: string;
            }[];
            minor: {
                videoUrl: string;
                clickUrl: string;
                schedule: string;
                realUrl: string;
                text: string;
                type: string;
                D1: string;
            }[];
        };
        adPriority: {
            [key: string]: number;
        };
    };
    [key: `v2/list.php?c=${number | string}&page=${number | string}&sort=${number | string}`]: {
        data: {
            animeList: [
                {
                    acg_sn: number;
                    anime_sn: number;
                    title: string;
                    dc_c1: number;
                    dc_c2: number;
                    favorite: boolean;
                    flag: string;
                    cover: string;
                    info: string;
                    popular: string;
                    highlightTag: {
                        bilingual: boolean;
                        edition: string;
                        vipTime: string;
                        newArrival: boolean;
                    };
                    score: number;
                },
            ];
        };
    };
    "v3/index.php": {
        data: {
            announce?: string;
            newAnime: {
                date: [
                    {
                        acgSn: NumericString;
                        videoSn: NumericString;
                        animeSn: NumericString;
                        title: string;
                        dcC1: NumericString;
                        dcC2: NumericString;
                        week: NumericString;
                        favorite: boolean;
                        cover: string;
                        upTime: `${number}/${number}`;
                        upTimeHours: `${number}:${number}`;
                        volume: string;
                        popular: NumericString;
                        highlightTag: {
                            bilingual: boolean;
                            edition: string;
                            vipTime: string;
                        };
                    },
                ];
                popular: [
                    {
                        acgSn: NumericString;
                        videoSn: NumericString;
                        animeSn: NumericString;
                        title: string;
                        dcC1: NumericString;
                        dcC2: NumericString;
                        week: NumericString;
                        favorite: boolean;
                        cover: string;
                        upTime: `${number}/${number}`;
                        upTimeHours: `${number}:${number}`;
                        volume: string;
                        popular: NumericString;
                        highlightTag: {
                            bilingual: boolean;
                            edition: string;
                            vipTime: string;
                        };
                    },
                ];
            };
            newAnimeSchedule: {
                [key: NumericString]: {
                    videoSn: NumericString;
                    title: string;
                    scheduleTime: string;
                    volumeString: string;
                }[];
            };
            aniChannel: {
                title: string;
                status: number;
                uploadTime: string;
                img: string;
            }[];
            hotAnime: {
                acgSn: NumericString;
                animeSn: NumericString;
                title: string;
                dcC1: NumericString;
                dcC2: NumericString;
                favorite: boolean;
                flag: NumericString;
                cover: string;
                info: string;
                popular: NumericString;
                highlightTag: {
                    bilingual: boolean;
                    edition: string;
                    vipTime: string;
                };
            }[];
            newAdded: {
                acgSn: NumericString;
                animeSn: NumericString;
                title: string;
                dcC1: NumericString;
                dcC2: NumericString;
                favorite: boolean;
                flag: NumericString;
                cover: string;
                info: string;
                popular: NumericString;
                highlightTag: {
                    bilingual: boolean;
                    edition: string;
                    vipTime: string;
                };
            }[];
            category: {
                title: string;
                intro: string;
                list: [
                    {
                        acgSn: NumericString;
                        animeSn: NumericString;
                        title: string;
                        dcC1: NumericString;
                        dcC2: NumericString;
                        favorite: boolean;
                        flag: NumericString;
                        cover: string;
                        info: string;
                        popular: NumericString;
                        highlightTag: {
                            bilingual: boolean;
                            edition: string;
                            vipTime: string;
                        };
                    },
                ];
            }[];
            gnnList: {
                url: string;
                title: string;
                pic: string;
            }[];
            forumList: {
                url: string;
                title: string;
                pic: string;
            }[];
            ad: [];
            lastAniUpTime: number;
        };
    };
};

export type EndpointList = keyof EndpointResults;
export type EndpointResult<T extends EndpointList> = EndpointResults[T];
