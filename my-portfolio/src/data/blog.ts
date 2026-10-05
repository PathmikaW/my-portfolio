export interface BlogPost {
  /** Diary entry number, e.g. 3 for "Garden Diary #3" */
  entry: number;
  /** Part within the entry, e.g. 2 for "(2/3)"; omit for single-part entries */
  part?: number;
  totalParts?: number;
  title: string;
  summary: string;
  url: string;
  /** ISO date (YYYY-MM-DD) the post went live on Medium */
  date?: string;
  tags: string[];
  /** Cover image from Medium's CDN */
  cover?: string;
}

export interface BlogSeries {
  id: string;
  name: string;
  emoji: string;
  status: 'ongoing' | 'coming-soon';
  tagline: string;
  description: string;
  /** Teaser for the next entry; shown while the series is ongoing */
  upNext?: string;
  posts: BlogPost[];
}

export const MEDIUM_PROFILE_URL = 'https://medium.com/@pathmikaweerarathna';

/*
 * To publish a new post: append it to the series' `posts` array.
 * Order does not matter; the page sorts by entry and part (newest first).
 */
export const blogSeries: BlogSeries[] = [
  {
    id: 'garden-diary',
    name: 'Garden Diary',
    emoji: '🌱',
    status: 'ongoing',
    tagline: 'From 5 years in tech to my first home farm, from the first seed to the first harvest.',
    description:
      "I'm on a career break and using it to grow in three ways: freelancing and personal projects, my Master's studies, and something I've always wanted to try, farming. I'm a complete beginner in agriculture, so I'm documenting the whole journey in Sri Lanka's wet zone.",
    posts: [
      {
        entry: 1,
        part: 1,
        totalParts: 3,
        title: 'From 5 Years in Tech to My First Home Farm',
        summary:
          'Why I am starting, and how my first day of research went, including advice from my parents and in-laws.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-1-from-5-years-in-tech-to-my-first-home-farm-part-1-5a9fd5f80461',
        tags: ['Career Break', 'Learning in Public'],
      },
      {
        entry: 1,
        part: 2,
        totalParts: 3,
        title: 'Soil, Raised Beds, and Choosing My Crops',
        summary:
          "Testing soil pH with vinegar and baking soda, why raised beds matter in Sri Lanka's wet zone, and how I'm choosing my first crops.",
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-1-soil-raised-beds-and-choosing-my-crops-part-2-5c6c98d3e494',
        tags: ['Soil Health'],
      },
      {
        entry: 1,
        part: 3,
        totalParts: 3,
        title: "Pests, Saving Water, and Where I'll Buy My Seeds",
        summary:
          'Natural pest control, cheap ways to save water, and where to buy seeds near Gonapola. Next step: my first seedling nursery.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-1-pests-saving-water-and-where-ill-buy-my-seeds-part-3-924a018b9c7d',
        tags: ['Organic Farming'],
      },
      {
        entry: 2,
        part: 1,
        totalParts: 3,
        title: 'Rain, Research, and Reading the Market',
        summary:
          'Rain kept me indoors, so Day 2 became a research day: picking seed varieties and checking real vegetable prices at Dambulla market.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-2-1-3-rain-research-and-reading-the-market-6e7c953df217',
        tags: ['Market Research'],
      },
      {
        entry: 2,
        part: 2,
        totalParts: 3,
        title: 'The Seed Shopping Trip',
        summary:
          'An Agrarian Service Centre visit, then a full trip to Horana. 13 crops, Rs. 9,640, and one item still missing.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-2-2-3-the-seed-shopping-trip-28fc840cc07a',
        tags: ['Seeds'],
      },
      {
        entry: 2,
        part: 3,
        totalParts: 3,
        title: "Building the Nursery Shelter, and What's Next",
        summary: 'Built a nursery shade house with my father-in-law. Stopped only when the mosquitoes won.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-2-3-3-building-the-nursery-shelter-and-whats-next-f87eda0bd648',
        date: '2026-09-25',
        tags: ['DIY', 'Nursery'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*XiwUlCLoH7lcrs1304ZDKA.jpeg',
      },
      {
        entry: 3,
        part: 1,
        totalParts: 2,
        title: 'Fixing the Roof, and a Few Things I Needed to Check First',
        summary:
          'Fixed a leaky nursery roof, figured out whether I need fungicide (turns out, not yet), and learned the right time to sow seeds.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-3-1-2-fixing-the-roof-and-a-few-things-i-needed-to-check-first-51810a608f63',
        date: '2026-09-26',
        tags: ['Nursery'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*JgUXIumY01hd79sWjijAhQ.jpeg',
      },
      {
        entry: 3,
        part: 2,
        totalParts: 2,
        title: 'A Long Night, Four Crops, and Nearly 1,000 Seeds',
        summary:
          "A Master's lecture, 2 hours of hand-sowing, and nearly 1,000 seeds later: 4 crops are now in the nursery. Tomato and capsicum are still waiting.",
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-3-2-2-a-long-night-four-crops-and-nearly-1-000-seeds-9b9a55516c1d',
        date: '2026-09-26',
        tags: ['Seed Starting'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*gGilrFbwNcRxiKjXhOtflw.jpeg',
      },
      {
        entry: 4,
        title: 'Skipping the Expensive Seeds, and a New Excavator Plan',
        summary: 'Deciding against the expensive seeds, and a new plan to bring in an excavator to prepare the land.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-4-skipping-the-expensive-seeds-and-a-new-excavator-plan-db5577cdfdd6',
        date: '2026-09-27',
        tags: ['Seeds', 'Land Preparation'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*B1dgnPi3Y4RAtvfJgLm12w.jpeg',
      },
      {
        entry: 5,
        part: 1,
        totalParts: 2,
        title: 'A Fallen Tray, a New Shade, and Waiting on the Excavator',
        summary:
          'A cat knocked over a seed tray, we built a sun shade for the nursery, and the excavator finally confirmed its arrival.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-5-1-2-a-fallen-tray-a-new-shade-and-waiting-on-the-excavator-0d09bc5c3cae',
        date: '2026-10-01',
        tags: ['Nursery'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*WoLSIFVpZhQWFsea9rLnmQ.jpeg',
      },
      {
        entry: 5,
        part: 2,
        totalParts: 2,
        title: 'The Land Just Got Much Bigger',
        summary:
          'Plot twist: our back land is actually 1 acre, and we started clearing all of it. 7 hours, 90 perches done, and a smarter plan: fewer crops, more of each.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-5-2-2-the-land-just-got-much-bigger-4757d400db85',
        date: '2026-10-01',
        tags: ['Land Preparation'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*WiIy5uIyApYnbFrpU2eU0w.jpeg',
      },
      {
        entry: 6,
        part: 1,
        totalParts: 2,
        title: 'Digging Into Diseases and Drip Lines',
        summary: 'A day researching crop-by-crop diseases and working out an irrigation plan for an acre of land.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-6-1-2-digging-into-diseases-and-drip-lines-94868a7828dd',
        date: '2026-10-03',
        tags: ['Irrigation', 'Plant Health'],
      },
      {
        entry: 6,
        part: 2,
        totalParts: 2,
        title: 'What Two Farm Visits Taught Us',
        summary:
          'Visited a commercial chili farm with 13,000 planned plants, then a brinjal grower nearby. Came home and made the call to scale back to half an acre, with cassava on the rest.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-6-2-2-what-two-farm-visits-taught-us-544a86c97a2c',
        date: '2026-10-03',
        tags: ['Farm Visits'],
      },
      {
        entry: 7,
        title: 'The Excavator Work Is Done, and So Are the ROI Predictions and Plan for the Worst',
        summary:
          "Running the real numbers: ROI, worst-case harvest, and what it means for my parents' time. Scaled back again with cloth fencing and simpler irrigation, and the land is fully cleared.",
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-7-the-excavator-work-is-done-and-so-are-the-roi-predictions-and-plan-for-the-worst-b62609c00f47',
        date: '2026-10-04',
        tags: ['Planning', 'Land Preparation'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*rQZ5NVvqNgT1a2ZJGY9zrQ.jpeg',
      },
      {
        entry: 8,
        title: 'Manure, Dolomite, and a Family Decision About Fencing',
        summary:
          'Stocked up on dolomite and chicken manure, cleared the last banana trees, and watched the first tiny seedlings appear. Plus a chain-link fence decision years in the making.',
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-8-manure-dolomite-and-a-family-decision-about-fencing-7c4cd1f91eb1',
        date: '2026-10-05',
        tags: ['Soil Health', 'Family'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*KrWGLP_FScdB5XQppD3yjA.jpeg',
      },
    ],
  },
  {
    id: 'dev-journal',
    name: 'Dev Journal',
    emoji: '💻',
    status: 'coming-soon',
    tagline: 'Notes on what I build and learn as a software engineer.',
    description:
      'Freelance work, personal projects, and lessons from my MSc in Artificial Intelligence, written up as I go.',
    posts: [],
  },
];
