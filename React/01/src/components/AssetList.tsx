import type { Asset } from "../types/asset";

interface AssetListProps {
  assets: Asset[];
  onRemove: (symbol: string) => void;
}

const AssetList = ({ assets, onRemove }: AssetListProps) => (
  <section className="panel">
    <h2>Assets</h2>
    <ul className="asset-list">
      {assets.map((asset) => (
        <li key={asset.symbol}>
          <span>
            {asset.name} ({asset.symbol})
          </span>
          <span>${asset.value.toFixed(2)}</span>
          <span className={asset.change >= 0 ? "positive" : "negative"}>
            {asset.change >= 0 ? "+" : ""}
            {asset.change.toFixed(2)}%
          </span>
          <button type="button" onClick={() => onRemove(asset.symbol)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default AssetList;
