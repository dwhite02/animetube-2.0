// Api Interfaces

interface PageQuery {
    hasNextPage: boolean,
    currentPage: number,
    perPage: number
}

interface MediaQuery {
    id: number;
    title: {
        english: string;        
    };
    seasonYear: number | null;
    format: string | null;
    genres: string[];
    trailer: { id: string; site: string; thumbnail: string } | null;
    bannerImage: string | null;
    coverImage: {
        medium: string | null;
        large: string | null;
        color: string | null;
        extraLarge: string | null;
    };
    episodes: number | null;
    meanScore: number | null;
    source?: string | null;
    averageScore?: number | null;
    description?: string;
    status?: string;
    season?: string;
    duration?: number;
};

interface MediaPageQuery<TPageInfo, TItem> {
    pageInfo: TPageInfo;
    media: TItem[];
}

export interface MediaData {
    Media?: MediaQuery | null;
};

export interface PageData {
    Page?: MediaPageQuery<PageQuery, MediaQuery> | null;
}


// Media Interfaces

export interface Media {
    id: string;
    title: string;
    posterUrl: string | null; 
    score?: number | null;
    year?: number | string;
    type?: "tv" | "movie";
    episodes?: number;
    genres?: string[];
    youtubeId: string | undefined;
    start?: number; 
    description?: string;
    status?: string;
    season?: string;
    duration?: number;
}
