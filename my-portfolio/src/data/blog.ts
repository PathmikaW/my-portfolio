export interface BlogPost {
  /** Diary entry number, e.g. 3 for "Garden Diary #3" */
  entry: number;
  /** Part within the entry, e.g. 2 for "(2/3)"; omit for single-part entries */
  part?: number;
  totalParts?: number;
  title: string;
  /** 2-4 short bullet points, each under ~70 characters */
  highlights: string[];
  url: string;
  /** ISO date (YYYY-MM-DD) the post went live on Medium */
  date?: string;
  tags: string[];
  /** Cover image from Medium's CDN */
  cover?: string;
}

export interface BlogSeriesGoal {
  icon: 'code' | 'study' | 'farm';
  title: string;
  text: string;
}

export interface BlogSeries {
  id: string;
  name: string;
  emoji: string;
  status: 'ongoing' | 'coming-soon';
  tagline: string;
  /** Short intro paragraph under the tagline */
  description: string;
  /** Optional tiles shown under the description, e.g. the series' goals */
  goals?: BlogSeriesGoal[];
  /** Optional line after the goals */
  closing?: string;
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
    description: "I'm growing in three ways at once:",
    goals: [
      { icon: 'code', title: 'Tech career', text: 'Projects that keep building my skills' },
      { icon: 'study', title: "Master's degree", text: 'Continuing my MSc in Artificial Intelligence' },
      { icon: 'farm', title: 'Farming', text: "Something I've always wanted to try" },
    ],
    closing:
      "I'm a complete beginner in agriculture, so I'm sharing the whole journey from Sri Lanka's wet zone.",
    posts: [
      {
        entry: 1,
        part: 1,
        totalParts: 3,
        title: 'From 5 Years in Tech to My First Home Farm',
        highlights: [
          "Why I'm starting a home farm during my career break",
          'How my first day of research went',
          'Advice from my parents and in-laws',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-1-from-5-years-in-tech-to-my-first-home-farm-part-1-5a9fd5f80461',
        tags: ['Career Break', 'Learning in Public'],
      },
      {
        entry: 1,
        part: 2,
        totalParts: 3,
        title: 'Soil, Raised Beds, and Choosing My Crops',
        highlights: [
          'Testing soil pH with vinegar and baking soda',
          "Why raised beds matter in Sri Lanka's wet zone",
          'Choosing my first crops',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-1-soil-raised-beds-and-choosing-my-crops-part-2-5c6c98d3e494',
        tags: ['Soil Health'],
      },
      {
        entry: 1,
        part: 3,
        totalParts: 3,
        title: "Pests, Saving Water, and Where I'll Buy My Seeds",
        highlights: [
          'Natural pest control',
          'Cheap ways to save water',
          'Where to buy seeds near Gonapola',
          'Next step: my first seedling nursery',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-1-pests-saving-water-and-where-ill-buy-my-seeds-part-3-924a018b9c7d',
        tags: ['Organic Farming'],
      },
      {
        entry: 2,
        part: 1,
        totalParts: 3,
        title: 'Rain, Research, and Reading the Market',
        highlights: [
          'Rain kept me indoors, so Day 2 became a research day',
          'Picking seed varieties',
          'Checking real vegetable prices at Dambulla market',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-2-1-3-rain-research-and-reading-the-market-6e7c953df217',
        tags: ['Market Research'],
      },
      {
        entry: 2,
        part: 2,
        totalParts: 3,
        title: 'The Seed Shopping Trip',
        highlights: [
          'A visit to the Agrarian Service Centre',
          'A full seed-shopping trip to Horana',
          '13 crops for Rs. 9,640, with one item still missing',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-2-2-3-the-seed-shopping-trip-28fc840cc07a',
        tags: ['Seeds'],
      },
      {
        entry: 2,
        part: 3,
        totalParts: 3,
        title: "Building the Nursery Shelter, and What's Next",
        highlights: [
          'Built a nursery shade house with my father-in-law',
          'Stopped only when the mosquitoes won',
        ],
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
        highlights: [
          'Fixed a leaky nursery roof',
          'Checked whether I need fungicide (not yet)',
          'Learned the right time to sow seeds',
        ],
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
        highlights: [
          "A Master's lecture, then 2 hours of hand-sowing",
          'Nearly 1,000 seeds: 4 crops now in the nursery',
          'Tomato and capsicum are still waiting',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-3-2-2-a-long-night-four-crops-and-nearly-1-000-seeds-9b9a55516c1d',
        date: '2026-09-26',
        tags: ['Seed Starting'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*gGilrFbwNcRxiKjXhOtflw.jpeg',
      },
      {
        entry: 4,
        title: 'Skipping the Expensive Seeds, and a New Excavator Plan',
        highlights: [
          'Skipping the expensive seeds',
          'A new plan for the excavator',
        ],
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
        highlights: [
          'A cat knocked over a seed tray',
          'Built a sun shade for the nursery',
          'The excavator finally confirmed its arrival',
        ],
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
        highlights: [
          'Plot twist: our back land is actually 1 acre',
          '7 hours of clearing, 90 perches done',
          'A smarter plan: fewer crops, more of each',
        ],
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
        highlights: [
          'Researched diseases crop by crop',
          'Worked out an irrigation plan for an acre of land',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-6-1-2-digging-into-diseases-and-drip-lines-94868a7828dd',
        date: '2026-10-03',
        tags: ['Irrigation', 'Plant Health'],
      },
      {
        entry: 6,
        part: 2,
        totalParts: 2,
        title: 'What Two Farm Visits Taught Us',
        highlights: [
          'Visited a commercial chili farm with 13,000 planned plants',
          'Then a brinjal grower nearby',
          'Decided to scale back to half an acre, with cassava on the rest',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-6-2-2-what-two-farm-visits-taught-us-544a86c97a2c',
        date: '2026-10-03',
        tags: ['Farm Visits'],
      },
      {
        entry: 7,
        title: 'The Excavator Work Is Done, and So Are the ROI Predictions and Plan for the Worst',
        highlights: [
          'Ran the real numbers: ROI and a worst-case harvest',
          "Weighed what it means for my parents' time",
          'Scaled back: cloth fencing instead of insect nets, simpler irrigation',
          'Excavator work finished, land fully cleared',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-7-the-excavator-work-is-done-and-so-are-the-roi-predictions-and-plan-for-the-worst-b62609c00f47',
        date: '2026-10-04',
        tags: ['Planning', 'Land Preparation'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*rQZ5NVvqNgT1a2ZJGY9zrQ.jpeg',
      },
      {
        entry: 8,
        title: 'Manure, Dolomite, and a Family Decision About Fencing',
        highlights: [
          'Stocked up on dolomite and chicken manure',
          'Cleared the last banana trees',
          'The first tiny seedlings are starting to show',
          'A chain-link fence for the land, a family decision years in the making',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-8-manure-dolomite-and-a-family-decision-about-fencing-7c4cd1f91eb1',
        date: '2026-10-05',
        tags: ['Soil Health', 'Family'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*KrWGLP_FScdB5XQppD3yjA.jpeg',
      },
      {
        entry: 9,
        part: 1,
        totalParts: 2,
        title: 'Dolomite Goes Down, and the Rain Has Other Plan',
        highlights: [
          'Dolomite spread across the land',
          'The rain had other plans for the tractor',
          'Tried (unsuccessfully) to pick up some anthurium plants',
          'Finally got proper shoes for farm work',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-9-1-2-dolomite-goes-down-and-the-rain-has-other-plan-7526cec30612',
        date: '2026-10-08',
        tags: ['Land Preparation', 'Soil Health'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*6bQsCnqtSV7UjVnHKUxLIw.jpeg',
      },
      {
        entry: 9,
        part: 2,
        totalParts: 2,
        title: 'Ploughing Begins, and the First Seedlings Break Through',
        highlights: [
          'Ploughing started today',
          'Hit a mechanical snag',
          'The nursery is finally showing real growth',
          'Tiny seedlings pushing through after days of waiting',
        ],
        url: 'https://medium.com/@pathmikaweerarathna/garden-diary-9-2-2-ploughing-begins-and-the-first-seedlings-break-through-464dea7100d0',
        date: '2026-10-08',
        tags: ['Land Preparation', 'Nursery'],
        cover: 'https://cdn-images-1.medium.com/max/1024/1*OUje8IVB8FcxQTb7SGHq2Q.jpeg',
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
