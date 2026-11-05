import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import VideoLibraryView from './components/VideoLibraryView';
import './index.css';

const VideoLibraryRoute = () => <VideoLibraryView onBack={() => { window.location.href = '/'; }} />;
const isVideoLibrary = window.location.pathname.replace(/\/$/, '') === '/videos';

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isVideoLibrary ? <VideoLibraryRoute /> : <App />}</StrictMode>,
);
