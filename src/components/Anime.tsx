import useFetchData from "../hooks/useFetchData";
import HoverCard from "./HoverCard";
import type { CardMedia, Media, MediaData } from "../types";
import { queryMedia } from "../data";


interface AnimePreviewProps {
    titleQuery: string
    onPlay?: (media:Media) => void;
}

const AnimePreview = ({ titleQuery, onPlay }: AnimePreviewProps) => {
    const { data, loading, error } = useFetchData<MediaData>(queryMedia, { search: titleQuery });
    const m = data?.Media;

    const media: CardMedia = {
        id: String(m?.id),
        title: m ? m.title.romaji : "",
        posterUrl: m?.coverImage?.extraLarge ?? m?.coverImage?.large ?? "",
        score: m?.averageScore ?? null,
        year: m?.seasonYear ?? undefined,
        type: (m?.format ?? "").toLowerCase() === "movie" ? "movie" : "tv",
        episodes: m?.episodes ?? 0,
        genres: m?.genres ?? [],
    }

    const mediaModal: Media = {
        ...media,
        youtubeId: m?.trailer?.id
    }

    return (
        <>
            {loading && <div> Loading…</div >}
            {error && <div style={{ color: "crimson" }}>{error.message}</div>}
            {m ? (
                <HoverCard
                    media = {media}
                    onPlay={() => onPlay?.(mediaModal)}
                    onAdd={(id) => console.log("add", id)}
                    size="md"
                    aspect="2/3"
                />
            ) : <div>No results.</div>}
        </>
        
    );
};

export default AnimePreview;
