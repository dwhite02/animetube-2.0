const mediaFields = `
    id
    title { english }
    seasonYear
    format
    genres
    trailer {
        id
        site
        thumbnail
    }
    bannerImage
    coverImage {
        medium
        large
        color
        extraLarge
    }
    episodes
    meanScore
    source
    averageScore
    description
    status
    season
    duration
`;

export const queryMedia: string = `
    query ($id: Int, $search: String) {
        Media (id: $id, search: $search, type: ANIME) {
            ${mediaFields}
        }
    }
`;

export const queryPage: string = `
    query (
        $page: Int = 1
        $perPage: Int = 15
        $id: Int
        $type: MediaType = ANIME
        $isAdult: Boolean = false
        $search: String
        $format: [MediaFormat]
        $status: MediaStatus
        $countryOfOrigin: CountryCode
        $source: MediaSource
        $season: MediaSeason
        $seasonYear: Int
        $year: String
        $onList: Boolean
        $yearLesser: FuzzyDateInt
        $yearGreater: FuzzyDateInt
        $episodeLesser: Int
        $episodeGreater: Int
        $durationLesser: Int
        $durationGreater: Int
        $chapterLesser: Int
        $chapterGreater: Int
        $volumeLesser: Int
        $volumeGreater: Int
        $licensedBy: [Int]
        $isLicensed: Boolean
        $genres: [String]
        $excludedGenres: [String]
        $tags: [String]
        $excludedTags: [String]
        $minimumTagRank: Int
        $sort: [MediaSort] = [POPULARITY_DESC]
        $genre: String
    ) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                hasNextPage
                currentPage
                perPage
            }
            media(
                id: $id
                type: $type
                season: $season
                format_in: $format
                status: $status
                countryOfOrigin: $countryOfOrigin
                source: $source
                search: $search
                onList: $onList
                seasonYear: $seasonYear
                startDate_like: $year
                startDate_lesser: $yearLesser
                startDate_greater: $yearGreater
                episodes_lesser: $episodeLesser
                episodes_greater: $episodeGreater
                duration_lesser: $durationLesser
                duration_greater: $durationGreater
                chapters_lesser: $chapterLesser
                chapters_greater: $chapterGreater
                volumes_lesser: $volumeLesser
                volumes_greater: $volumeGreater
                licensedById_in: $licensedBy
                isLicensed: $isLicensed
                genre_in: $genres
                genre_not_in: $excludedGenres
                tag_in: $tags
                tag_not_in: $excludedTags
                minimumTagRank: $minimumTagRank
                sort: $sort
                isAdult: $isAdult
                genre: $genre
            ) {
                ${mediaFields}
            }
        }
    }
`;