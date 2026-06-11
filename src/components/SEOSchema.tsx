export default function SEOSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nada Negm',
    alternateName: 'ندى نجم',
    description: 'خبيرة محتوى UGC ومحتوى البراندات — تنتج محتوى أصيل يحرك العواطف ويزيد المبيعات',
    url: 'https://nadanegm.com',
    image: 'https://nadanegm.com/og-image.jpg',
    jobTitle: 'UGC Creator & Brand Content Specialist',
    sameAs: [
      'https://www.instagram.com/nada_negm1',
      'https://www.tiktok.com/@nada_ugc10',
      'https://www.facebook.com/nada.611390',
    ],
    knowsAbout: ['UGC Content', 'Video Marketing', 'Social Media Content', 'Brand Strategy'],
    offers: {
      '@type': 'Offer',
      name: 'خدمات إنتاج محتوى UGC',
      description: 'إنتاج محتوى UGC أصيل للبراندات',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
