import "reflect-metadata";
import assert from "node:assert/strict";
import { Container } from "typedi";
import { NewsAggregator } from "./NewsAggregator";
import { RSSFeedSource } from "./RSSFeedSource";
import { NewsSource } from "./NewsSource";

class MockSource implements NewsSource {
  async fetchArticles(): Promise<string[]> {
    return ["Mock: One", "Mock: Two"];
  }
}

async function run() {
  const testContainer = Container.of("news-aggregator-test");
  testContainer.set(RSSFeedSource, new MockSource());

  const aggregator = testContainer.get(NewsAggregator);

  const output: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    output.push(String(args[0]));
  };

  try {
    await aggregator.getLatestArticles();
  } finally {
    console.log = originalLog;
    testContainer.reset();
  }

  assert.deepEqual(output, ["Mock: One", "Mock: Two"]);
  console.log("NewsAggregator mock injection test passed");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
