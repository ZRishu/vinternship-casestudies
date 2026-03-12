import { useState } from "react";
import AssetEditor from "./components/AssetEditor";
import AssetList from "./components/AssetList";
import PortfolioSummary from "./components/PortfolioSummary";
import type { Asset } from "./types/asset";
import "./App.css";

const initialAssets: Asset[] = [
  { name: "Apple", symbol: "AAPL", value: 191.5, change: 1.25 },
  { name: "Tesla", symbol: "TSLA", value: 238.3, change: -2.1 },
  { name: "Bitcoin", symbol: "BTC", value: 61250, change: 3.4 },
];

function App() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  const handleUpdate = (updatedAsset: Asset) => {
    setAssets((currentAssets) => {
      const index = currentAssets.findIndex(
        (asset) => asset.symbol === updatedAsset.symbol,
      );

      if (index === -1) {
        return [...currentAssets, updatedAsset];
      }

      const nextAssets = [...currentAssets];
      nextAssets[index] = updatedAsset;
      return nextAssets;
    });
  };

  const handleRemove = (symbol: string) => {
    setAssets((currentAssets) =>
      currentAssets.filter((asset) => asset.symbol !== symbol),
    );
  };

  return (
    <main className="app">
      <h1>Smart Portfolio Dashboard</h1>
      <div className="grid">
        <AssetEditor onUpdate={handleUpdate} />
        <PortfolioSummary assets={assets} />
      </div>
      <AssetList assets={assets} onRemove={handleRemove} />
    </main>
  );
}

export default App;
