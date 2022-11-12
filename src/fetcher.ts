import fetch from "cross-fetch";
import type { EndpointResult, EndpointList } from "./endpoints";

export class Fetcher {
    private cache = new Map<string, unknown>();
    public listeners = new Map<string, Set<(...args: unknown[]) => void>>();

    constructor(public base = "https://api.gamer.com.tw/mobile_app/anime/") {}

    prune(): void {
        this.cache.clear();
    }

    async get<T extends EndpointList>(endpoint: T): Promise<EndpointResult<T>>;
    async get<T extends string>(endpoint: T): Promise<unknown>;
    async get(endpoint: string): Promise<unknown> {
        if (this.cache.has(endpoint)) {
            this.emit("cache-hit", endpoint);
            return this.cache.get(endpoint);
        }
        this.emit("cache-miss", endpoint);

        const url = this.base + endpoint;
        this.emit("fetch-start", url);
        const res = await fetch(url);
        this.emit("fetch-end", url);
        const json = await res.json();
        this.emit("json-parse", url, json);
        this.cache.set(endpoint, json);

        return json;
    }

    on(event: "cache-hit", listener: (endpoint: string) => void): void;
    on(event: "cache-miss", listener: (endpoint: string) => void): void;
    on(event: "fetch-start", listener: (url: string) => void): void;
    on(event: "fetch-end", listener: (url: string) => void): void;
    on(event: "json-parse", listener: (url: string, json: Record<string, unknown>) => void): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    on(event: string, listener: (...args: any[]) => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event)?.add(listener);
    }

    off(event: "cache-hit", listener: (endpoint: string) => void): void;
    off(event: "cache-miss", listener: (endpoint: string) => void): void;
    off(event: "fetch-start", listener: (url: string) => void): void;
    off(event: "fetch-end", listener: (url: string) => void): void;
    off(event: "json-parse", listener: (url: string, json: Record<string, unknown>) => void): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event: string, listener: (...args: any[]) => void): void {
        this.listeners.get(event)?.delete(listener);
    }

    protected emit(event: "cache-hit", endpoint: string): void;
    protected emit(event: "cache-miss", endpoint: string): void;
    protected emit(event: "fetch-start", url: string): void;
    protected emit(event: "fetch-end", url: string): void;
    protected emit(event: "json-parse", url: string, json: Record<string, unknown>): void;
    protected emit(event: string, ...args: unknown[]): void {
        this.listeners.get(event)?.forEach((listener) => listener(...args));
    }
}

export const fetcher = new Fetcher();
