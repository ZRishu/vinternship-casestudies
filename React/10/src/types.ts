export interface Product {
  id: string
  name: string
  category: string
  status: 'Stable' | 'Review' | 'Experiment'
  region: string
  updatedAt: Date
}

export interface SummaryMetric {
  label: string
  value: string
}

export interface AnalysisFinding {
  title: string
  detail: string
}
