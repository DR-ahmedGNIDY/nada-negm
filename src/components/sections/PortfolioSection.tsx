'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, ChevronRight, ChevronLeft } from 'lucide-react'
import type { Video } from '@/types'

interface PortfolioSectionProps {
  videos: Video[]
}

const categories = ['الكل', 'UGC', 'إعلان', 'ريلز', 'تيك توك', 'منتج', 'أخرى']

// =============================================
// DESKTOP VIDEO CARD
// =============================================
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
      {video.thumbnailUrl ? (
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#C66CFF]/10 to-[#FF5ACD]/10" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Play size={22} className="fill-white text-white ms-1" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <div className="flex items-center justify-between">
          <p className="text-white text-sm font-semibold truncate">{video.title}</p>
          <span className="flex items-center gap-1 text-white/60 text-xs">
            <Eye size={12} />
            {video.views > 1000 ? `${(video.views / 1000).toFixed(0)}k` : video.views}
          </span>
        </div>
        {video.brand && <p className="text-white/50 text-xs mt-0.5">{video.brand}</p>}
      </div>
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
          {video.category}
        </span>
      </div>
    </motion.div>
  )
}

// =============================================
// MOBILE VIDEO CARD — بطاقة عمودية ضيقة
// =============================================
function MobileVideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-[155px] cursor-pointer rounded-2xl overflow-hidden bg-[#111827]"
      style={{ aspectRatio: '9/16' }}
    >
      {video.thumbnailUrl ? (
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#C66CFF]/10 to-[#FF5ACD]/10" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <Play size={17} className="fill-white text-white ms-0.5" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-semibold truncate">{video.title}</p>
        {video.brand && <p className="text-white/50 text-[10px] mt-0.5 truncate">{video.brand}</p>}
      </div>
      <div className="absolute top-2 right-2">
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/50 backdrop-blur-sm text-white/80">
          {video.category}
        </span>
      </div>
    </div>
  )
}

// =============================================
// VIDEO MODAL — مشترك
// =============================================
function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md mx-auto glass-card rounded-2xl overflow-hidden"
      >
        <video src={video.cloudinaryUrl} controls autoPlay className="w-full aspect-[9/16] object-cover" />
        <div className="p-4">
          <h3 className="text-white font-bold">{video.title}</h3>
          {video.description && <p className="text-white/50 text-sm mt-1">{video.description}</p>}
        </div>
        <button onClick={onClose} className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white" aria-label="إغلاق">✕</button>
      </motion.div>
    </motion.div>
  )
}

// =============================================
// DESKTOP PORTFOLIO — masonry
// =============================================
function DesktopPortfolio({ videos }: { videos: Video[] }) {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const filtered = activeCategory === 'الكل' ? videos : videos.filter((v) => v.category === activeCategory)
  const openVideo = (video: Video) => {
    setSelectedVideo(video)
    fetch(`/api/videos/${video._id}/view`, { method: 'POST' }).catch(() => {})
  }
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] text-white' : 'glass text-white/60 hover:text-white border border-white/10 hover:border-white/20'}`}>
            {cat}
          </button>
        ))}
      </motion.div>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/30"><p>لا توجد أعمال في هذه الفئة حتى الآن</p></div>
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
      <AnimatePresence>{selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}</AnimatePresence>
    </>
  )
}

// =============================================
// MOBILE PORTFOLIO — paginated slider (3 per page)
// =============================================
function MobilePortfolio({ videos }: { videos: Video[] }) {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const ITEMS_PER_PAGE = 3

  const filtered = activeCategory === 'الكل' ? videos : videos.filter((v) => v.category === activeCategory)
  const pages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const currentVideos = filtered.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE)

  const openVideo = (video: Video) => {
    setSelectedVideo(video)
    fetch(`/api/videos/${video._id}/view`, { method: 'POST' }).catch(() => {})
  }
  const handleCategory = (cat: string) => { setActiveCategory(cat); setCurrentPage(0) }

  return (
    <>
      {/* Filter — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat ? 'bg-gradient-to-r from-[#C66CFF] to-[#FF5ACD] text-white' : 'text-white/60 border border-white/10'}`}
            style={activeCategory !== cat ? { background: 'rgba(255,255,255,0.04)' } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-white/30 text-sm">لا توجد أعمال في هذه الفئة</div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex gap-3 justify-center"
            >
              {currentVideos.map((video) => (
                <MobileVideoCard key={video._id} video={video} onClick={() => openVideo(video)} />
              ))}
            </motion.div>
          </AnimatePresence>

          {pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/60 disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <ChevronRight size={18} />
              </button>
              <div className="flex gap-1.5">
                {Array.from({ length: pages }).map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-[#C66CFF]' : 'w-1.5 bg-white/20'}`} />
                ))}
              </div>
              <button onClick={() => setCurrentPage((p) => Math.min(pages - 1, p + 1))} disabled={currentPage === pages - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/60 disabled:opacity-30"
                style={{ background: 'rgba(255,255,255,0.04)' }}>
                <ChevronLeft size={18} />
              </button>
            </div>
          )}
        </>
      )}

      <AnimatePresence>{selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}</AnimatePresence>
    </>
  )
}

// =============================================
// EXPORT
// =============================================
export default function PortfolioSection({ videos }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FF5ACD]/10 text-[#FF5ACD] border border-[#FF5ACD]/20 mb-4">معرض الأعمال</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 md:mb-4">أعمالي المميزة</h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm md:text-base">محتوى حقيقي حقق نتائج حقيقية لبراندات عالمية</p>
        </motion.div>

        <div className="hidden md:block"><DesktopPortfolio videos={videos} /></div>
        <div className="md:hidden"><MobilePortfolio videos={videos} /></div>
      </div>
    </section>
  )
}
