import type { Product, SummaryMetric } from '../types'

export const summaryMetrics: SummaryMetric[] = [
  { label: 'Initial JS chunk', value: '210.82 KiB' },
  { label: 'Lazy admin chunk', value: '159.29 KiB' },
  { label: 'Total gzip size', value: '183.81 KiB' },
]

export const products: Product[] = [
  {
    id: 'product-1',
    name: 'Wireless Headphones',
    category: 'Audio',
    status: 'Stable',
    region: 'North America',
    updatedAt: new Date('2026-03-12T06:15:00.000Z'),
  },
  {
    id: 'product-2',
    name: 'Travel Backpack',
    category: 'Accessories',
    status: 'Review',
    region: 'Europe',
    updatedAt: new Date('2026-03-12T08:45:00.000Z'),
  },
  {
    id: 'product-3',
    name: 'Standing Desk',
    category: 'Furniture',
    status: 'Stable',
    region: 'Asia',
    updatedAt: new Date('2026-03-12T10:05:00.000Z'),
  },
  {
    id: 'product-4',
    name: 'Smart Watch',
    category: 'Wearables',
    status: 'Experiment',
    region: 'North America',
    updatedAt: new Date('2026-03-12T11:30:00.000Z'),
  },
]
