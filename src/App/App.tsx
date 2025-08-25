import { useState } from 'react'
// import './App.css'
// import Discover from './components/Discover';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import HeroBanner from './components/HeroBanner';
import { Box, Container } from "@mui/material";
// import AnimePreview from './components/Anime';
import VideoModal from '../components/VideoModal';
import type { Media } from '../types';
import MediaList from '../components/MediaList/MediaList';
import MediaDetailsPanel from '../components/MediaDetailsPanel';
import HeroBanner from '../components/HeroBanner';

function App() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<Media | undefined>(undefined);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selected, setSelected] = useState<Media | undefined>(undefined);

    const handleClickModalOpen = (media: Media):void => {
        setModalData(media);
        setModalOpen(true);
    };

    const handleClickDetailsOpen = (media: Media): void => {
        setSelected(media);
        setDetailsOpen(true);
    };

    return (
        <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
            <Header/>
            
            <Container maxWidth={false} component="main" sx={{ flex: "1 0 auto"}} disableGutters={true}>
                <HeroBanner onPlay={handleClickModalOpen} />
                <MediaList sliderId={1} headline="Trending" onMediaSelected={handleClickDetailsOpen} onPlay={handleClickModalOpen} apiVariables={{
                    sort: "TRENDING_DESC",
                    season: "SUMMER",
                    seasonYear: 2025
                }}/>
                <MediaList sliderId={2} headline="Most Popular" onMediaSelected={handleClickDetailsOpen} onPlay={handleClickModalOpen} apiVariables={{
                    sort: "POPULARITY_DESC",
                }} />
                <MediaList sliderId={3} headline="Highest Rated" onMediaSelected={handleClickDetailsOpen} onPlay={handleClickModalOpen} apiVariables={{
                    sort: "SCORE_DESC",
                }} />
            </Container>
            <Footer/>

            <MediaDetailsPanel
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                media={selected}
                onPlayTrailer={(selected) => handleClickModalOpen(selected)}
            />
            <VideoModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                media={modalData}
            />
        </Box>
    )
}

export default App
