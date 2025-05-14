import { Movie, Episode } from '../models/types';

// Helper function to create a movie
const createMovie = (
  id: string,
  title: string,
  originalTitle: string,
  year: string,
  duration: string,
  genre: string[],
  description: string,
  rating: number,
  quality: string,
  posterFileName: string,
  backdropFileName: string,
  videoFileName?: string,
  downloadFileName?: string
): Movie => {
  return {
    id,
    title,
    originalTitle,
    posterUrl: `/assets/images/posters/${posterFileName}`,
    backdropUrl: `/assets/images/backdrops/${backdropFileName}`,
    year,
    duration,
    genre,
    description,
    rating,
    type: "movie",
    quality,
    videoUrl: videoFileName ? `/assets/videos/${videoFileName}` : undefined,
    downloadUrl: downloadFileName ? `/assets/downloads/${downloadFileName}` : undefined,
  };
};

// Helper function to create a series with episodes
const createSeries = (
  id: string,
  title: string,
  originalTitle: string,
  year: string,
  duration: string,
  genre: string[],
  description: string,
  rating: number,
  quality: string,
  posterFileName: string,
  backdropFileName: string,
  episodes: Episode[]
): Movie => {
  return {
    id,
    title,
    originalTitle,
    posterUrl: `/assets/images/posters/${posterFileName}`,
    backdropUrl: `/assets/images/backdrops/${backdropFileName}`,
    year,
    duration,
    genre,
    description,
    rating,
    type: "series",
    quality,
    episodes,
  };
};

// Helper function to create an episode
const createEpisode = (
  id: string,
  title: string,
  description: string,
  duration: string,
  videoFileName: string,
  downloadFileName: string,
  thumbnailFileName: string,
  seasonNumber: number,
  episodeNumber: number
): Episode => {
  return {
    id,
    title,
    description,
    duration,
    videoUrl: `/assets/videos/${videoFileName}`,
    downloadUrl: `/assets/downloads/${downloadFileName}`,
    thumbnailUrl: `/assets/images/thumbnails/${thumbnailFileName}`,
    seasonNumber,
    episodeNumber,
  };
};

// Movies and series data
export const movies: Movie[] = [
  createMovie(
    "m1",
    "نوفوكين",
    "Novocaine",
    "2023",
    "1h 47m",
    ["إثارة", "تشويق"],
    "قصة درامية عن طبيب أسنان يجد نفسه متورطًا في سلسلة من الأحداث المشوقة والخطيرة بعد لقائه مع مريضة جديدة.",
    7.2,
    "HD",
    "novocaine.jpg",
    "novocaine-backdrop.jpg",
    "novocaine.mp4",
    "novocaine.mp4"
  ),
  createMovie(
    "m2",
    "السرعة والغضب",
    "Fast & Furious",
    "2021",
    "2h 15m",
    ["أكشن", "إثارة"],
    "فريق من السائقين المحترفين يتحدون في سباقات خطيرة ومليئة بالإثارة.",
    8.1,
    "4K",
    "fast-and-furious.jpg",
    "fast-and-furious-backdrop.jpg",
    "fast-and-furious.mp4",
    "fast-and-furious.mp4"
  ),
  createSeries(
    "s1",
    "لعبة العروش",
    "Game of Thrones",
    "2011",
    "8 Seasons",
    ["دراما", "خيال"],
    "ملحمة خيالية عن صراع العائلات النبيلة على العرش الحديدي.",
    9.3,
    "HD",
    "game-of-thrones.jpg",
    "game-of-thrones-backdrop.jpg",
    [
      createEpisode(
        "e1",
        "الحلقة الأولى",
        "بداية الصراع على العرش الحديدي.",
        "1h 2m",
        "game-of-thrones-s1e1.mp4",
        "game-of-thrones-s1e1.mp4",
        "game-of-thrones-s1e1-thumbnail.jpg",
        1,
        1
      ),
      createEpisode(
        "e2",
        "الحلقة الثانية",
        "تصاعد الأحداث بين العائلات النبيلة.",
        "58m",
        "game-of-thrones-s1e2.mp4",
        "game-of-thrones-s1e2.mp4",
        "game-of-thrones-s1e2-thumbnail.jpg",
        1,
        2
      )
    ]
  ),
];

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: { plugins: [{ removeViewBox: false }] },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  envPrefix: "VITE_",
}));