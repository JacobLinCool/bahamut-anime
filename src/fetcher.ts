import fetch from "cross-fetch";
import type { EndpointResult, EndpointList } from "./endpoints";

/**
 * Fetcher with internal cache
 */
export class Fetcher {
    /**
     * Internal cache
     */
    private cache = new Map<string, [exp: number, data: unknown]>();
    /**
     * Event listeners
     */
    public listeners = new Map<string, Set<(...args: unknown[]) => void>>();

    /**
     * @param base API base URL
     */
    constructor(public base = "https://api.gamer.com.tw/mobile_app/anime/") {}

    /**
     * Clear cache
     */
    prune(): void {
        this.cache.clear();
    }

    /**
     * Get parsed json data from endpoint
     * @param endpoint Endpoint path
     */
    async get<T extends EndpointList>(endpoint: T): Promise<EndpointResult<T>>;
    async get<T extends string>(endpoint: T): Promise<unknown>;
    async get(endpoint: string): Promise<unknown> {
        const cached = this.cache.get(endpoint);
        if (cached && cached[0] >= Date.now()) {
            this.emit("cache-hit", endpoint);
            return cached[1];
        }
        this.emit("cache-miss", endpoint);

        const url = this.base + endpoint;
        this.emit("fetch-start", url);
        const res = await fetch(url);
        this.emit("fetch-end", url);
        const json = await res.json();
        this.emit("json-parse", url, json);
        this.cache.set(endpoint, [Date.now() + 60_000, json]);

        return json;
    }

    /**
     * Add a listener for an event
     * @param event Event name
     * @param listener Listener function
     */
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

    /**
     * Remove a listener for an event
     * @param event Event name
     * @param listener Listener function
     */
    off(event: "cache-hit", listener: (endpoint: string) => void): void;
    off(event: "cache-miss", listener: (endpoint: string) => void): void;
    off(event: "fetch-start", listener: (url: string) => void): void;
    off(event: "fetch-end", listener: (url: string) => void): void;
    off(event: "json-parse", listener: (url: string, json: Record<string, unknown>) => void): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    off(event: string, listener: (...args: any[]) => void): void {
        this.listeners.get(event)?.delete(listener);
    }

    /**
     * Emit an event
     * @param event Event name
     */
    protected emit(event: "cache-hit", endpoint: string): void;
    protected emit(event: "cache-miss", endpoint: string): void;
    protected emit(event: "fetch-start", url: string): void;
    protected emit(event: "fetch-end", url: string): void;
    protected emit(event: "json-parse", url: string, json: Record<string, unknown>): void;
    protected emit(event: string, ...args: unknown[]): void {
        this.listeners.get(event)?.forEach((listener) => listener(...args));
    }
}

/**
 * The default fetcher instance
 */
export const fetcher = new Fetcher();
