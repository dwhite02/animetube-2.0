// useFetchData.ts
import { useEffect, useState } from "react";

const url = "https://graphql.anilist.co";

// interface QueryVars { id?: number; search?: string };
interface GqlError { message: string };
interface GqlResponse<T> { data?: T; errors?: GqlError[] };

const useFetchData = <TData,>(query: string, variables: object | null = null) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<TData | null>(null);

    useEffect(() => {
        // if (!variables) return;

        const controller = new AbortController();

        const options: RequestInit = {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ query, variables }),
            signal: controller.signal,
        };

        (async () => {
            setLoading(true);
            try {
                const res = await fetch(url, options);
                if (!res.ok) throw new Error(`Network error: ${res.status}`);

                const json = (await res.json()) as GqlResponse<TData>;
                if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join("; "));
                setData(json.data ?? null);
                setError(null);
            } catch (e) {
                setData(null);
                setError(e instanceof Error ? e : new Error(String(e)));
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [JSON.stringify(variables)]); // stable dep when variables is an object

    return { data, error, loading };
};

export default useFetchData;