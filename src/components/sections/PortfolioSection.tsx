'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye } from 'lucide-react'
import type { Video } from '@/types'

interface PortfolioSectionProps {
  videos: Video[]
}

const categories = ['الكل', 'UGC', 'إعلان', 'ريلز', 'تيك توك', 'منتج', 'أخرى']

function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[9/16] bg-[#111827]"
    >
      {/* Thumbnail */}
      {video.thumbnailUrl ? (
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#C66CFF]/10 to-[#FF5ACD]/10" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Play size={22} className="fill-white text-white ms-1" />
        </div>
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-semibold truncate">{video.title}</p>
          <span className="flex items-center gap-1 text-white/60 text-xs">
            <Eye size={12} />
            {video.views > 1000 ? `${(video.views / 1000).toFixed(0)}k` : video.views}
          </span>
        </div>
        {video.brand && (
          <p className="text-white/50 text-xs mt-0.5">{video.brand}</p>
        )}
      </div>

      {/* Category Badge */}
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
          {video.category}
        </span>
      </div>
    </motion.div>
  )
}

export default function PortfolioSection({ videos }: PortfolioSectionProps) {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const filtered =
    activeCategory === 'الكل' ? videos : videos.filter((v) => v.category === activeCategory)

  const openVideo = (video: Video) => {
    setSelectedVideo(video)
    // increment view count silently
    fetch(`/api/videos/${video._id}/view`, { method: 'POST' }).catch(() => {})
  }

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF5ACD]/10 text-[#FF5ACD] border border-[#FF5ACD]/20 mb-4">
            معرض الأعمال
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">أعمالي المميزة</h2>
          <p className="text-white/50 max-w-xl mx-auto">محتوى حقيقي حقق نتائج حقيقية لبراندات عالمية</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] text-white'
                  : 'glass text-white/60 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <p>لا توجد أعمال في هذه الفئة حتى الآن</p>
          </div>
        ) : (
          <motion.div layout className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((video) => (
                <div key={video._id} className="break-inside-avoid mb-4">
                  <VideoCard video={video} onClick={() => openVideo(video)} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md mx-auto glass-card rounded-2xl overflow-hidden"
            >
              <video
                src={selectedVideo.cloudinaryUrl}
                controls
                autoPlay
                className="w-full aspect-[9/16] object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-bold">{selectedVideo.title}</h3>
                {selectedVideo.description && (
                  <p className="text-white/50 text-sm mt-1">{selectedVideo.description}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white/70 hover:text-white"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
