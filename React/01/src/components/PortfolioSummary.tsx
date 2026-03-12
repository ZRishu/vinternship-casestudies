import type { Asset } from "../types/asset";

interface PortfolioSummaryProps {
  assets: Asset[];
}

const PortfolioSummary = ({ assets }: PortfolioSummaryProps) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalChange = assets.reduce((sum, asset) => sum + asset.change, 0);
  const averageChange = assets.length > 0 ? totalChange / assets.length : 0;

  return (
    <section className="panel">
      <h2>Portfolio Summary</h2>
      <p>
        Total Value: <strong>${totalValue.toFixed(2)}</strong>
      </p>
      <p className={averageChange >= 0 ? "positive" : "negative"}>
        Average Change: {averageChange >= 0 ? "+" : ""}
        {averageChange.toFixed(2)}%
      </p>
    </section>
  );
};

export default PortfolioSummary;
