import "reflect-metadata";
import { Container } from "typedi";
import { NewsAggregator } from "./NewsAggregator";
import { RSSFeedSource } from "./RSSFeedSource";
import { APISource } from "./APISource";

// Keep NewsAggregator unchanged by rebinding the RSSFeedSource token.
Container.set(RSSFeedSource, Container.get(APISource));

const aggregator: NewsAggregator = Container.get(NewsAggregator);
aggregator.getLatestArticles();
