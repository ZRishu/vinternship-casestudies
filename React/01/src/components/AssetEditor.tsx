import React from "react";
import type { Asset } from "../types/asset";

interface AssetEditorProps {
  onUpdate: (asset: Asset) => void;
}

interface AssetEditorState {
  name: string;
  symbol: string;
  value: string;
  change: string;
}

class AssetEditor extends React.Component<AssetEditorProps, AssetEditorState> {
  state: AssetEditorState = { name: "", symbol: "", value: "", change: "" };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof AssetEditorState;
    this.setState({
      [field]: e.target.value,
    } as Pick<AssetEditorState, keyof AssetEditorState>);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = Number.parseFloat(this.state.value);
    const change = Number.parseFloat(this.state.change);

    if (
      !this.state.name.trim() ||
      !this.state.symbol.trim() ||
      Number.isNaN(value) ||
      Number.isNaN(change)
    ) {
      return;
    }

    this.props.onUpdate({
      name: this.state.name.trim(),
      symbol: this.state.symbol.trim().toUpperCase(),
      value,
      change,
    });

    this.setState({ name: "", symbol: "", value: "", change: "" });
  };

  render() {
    return (
      <form className="panel editor" onSubmit={this.handleSubmit}>
        <h2>Asset Editor</h2>
        <label>
          Name
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Apple Inc."
          />
        </label>
        <label>
          Symbol
          <input
            name="symbol"
            value={this.state.symbol}
            onChange={this.handleChange}
            placeholder="AAPL"
          />
        </label>
        <label>
          Value
          <input
            name="value"
            type="number"
            value={this.state.value}
            onChange={this.handleChange}
            step="0.01"
            placeholder="0.00"
          />
        </label>
        <label>
          Change (%)
          <input
            name="change"
            type="number"
            value={this.state.change}
            onChange={this.handleChange}
            step="0.01"
            placeholder="0.00"
          />
        </label>
        <button type="submit">Update Asset</button>
      </form>
    );
  }
}

export default AssetEditor;
