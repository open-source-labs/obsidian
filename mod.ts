import {
  ObsidianWrapper,
  useObsidian,
  ObsidianClient,
} from './ObsidianWrapper/ObsidianWrapper.jsx';
import { ObsidianRouter } from './src/obsidian.ts';
import gql from 'https://deno.land/x/oak_graphql@0.6.1/graphql-tag/index.ts';

export { ObsidianWrapper, useObsidian, ObsidianClient, ObsidianRouter, gql };
