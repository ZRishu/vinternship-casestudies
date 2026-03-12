import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
  type ChartConfiguration,
} from 'chart.js'
import { useEffect, useRef } from 'react'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const chartConfig: ChartConfiguration<'bar'> = {
  type: 'bar',
  data: {
    labels: ['Cart', 'Checkout', 'Orders', 'Returns'],
    datasets: [
      {
        label: 'Requests per minute',
        data: [92, 61, 48, 19],
        backgroundColor: '#7f9bd1',
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
}

export default function AdminPanel() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    const chart = new Chart(canvasRef.current, chartConfig)

    return () => {
      chart.destroy()
    }
  }, [])

  return (
    <section className="surface">
      <div className="panel__header">
        <div>
          <strong>Admin analytics</strong>
          <p>This panel is lazy-loaded, so chart code stays out of the initial bundle.</p>
        </div>
        <span className="badge">Lazy chunk</span>
      </div>

      <div className="chart-shell">
        <canvas ref={canvasRef} aria-label="ShopEase admin analytics chart" />
      </div>
    </section>
  )
}
