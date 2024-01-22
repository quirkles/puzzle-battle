import { gql } from '../../../__generated__';

export const LIVE_SUMMARY = gql(`
  query getLiveSummary {
    liveSummary {
      type
      activePlayerCount
    }
  }
`);
