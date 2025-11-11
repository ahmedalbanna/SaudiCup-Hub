export type Team = {
  id: string;
  name: string;
  logoUrl: string;
};

export type Player = {
  id: string;
  name: string;
  teamId: string;
  position: string;
  imageUrl: string;
  number: number;
};

export type Match = {
  id: string;
  team1: Team;
  team2: Team;
  date: string;
  time: string;
  venue: string;
  score?: string;
  status: 'scheduled' | 'live' | 'finished';
};

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  author: string;
};

export type Stadium = {
  id: string;
  name: string;
  city: string;
  capacity: number;
  imageUrl: string;
};

export const teams: Team[] = [
  { id: 't1', name: 'Riyadh Rovers', logoUrl: 'https://picsum.photos/seed/t1_logo/100/100' },
  { id: 't2', name: 'Jeddah Jets', logoUrl: 'https://picsum.photos/seed/t2_logo/100/100' },
  { id: 't3', name: 'Dammam Dynamos', logoUrl: 'https://picsum.photos/seed/t3_logo/100/100' },
  { id: 't4', name: 'Mecca Monarchs', logoUrl: 'https://picsum.photos/seed/t4_logo/100/100' },
  { id: 't5', name: 'Medina Stallions', logoUrl: 'https://picsum.photos/seed/t5_logo/100/100' },
  { id: 't6', name: 'Taif Tigers', logoUrl: 'https://picsum.photos/seed/t6_logo/100/100' },
];

export const players: Player[] = [
  { id: 'p1', name: 'Adel Al-Salem', teamId: 't1', position: 'Forward', imageUrl: 'https://picsum.photos/seed/p1/400/400', number: 10 },
  { id: 'p2', name: 'Fahd Al-Muwallad', teamId: 't2', position: 'Midfielder', imageUrl: 'https://picsum.photos/seed/p2/400/400', number: 8 },
  { id: 'p3', name: 'Khalid Eisa', teamId: 't3', position: 'Goalkeeper', imageUrl: 'https://picsum.photos/seed/p3/400/400', number: 1 },
  { id: 'p4', name: 'Sultan Al-Ghannam', teamId: 't1', position: 'Defender', imageUrl: 'https://picsum.photos/seed/p4/400/400', number: 2 },
  { id: 'p5', name: 'Yasir Al-Shahrani', teamId: 't2', position: 'Defender', imageUrl: 'https://picsum.photos/seed/p5/400/400', number: 12 },
  { id: 'p6', name: 'Abdullah Otayf', teamId: 't3', position: 'Midfielder', imageUrl: 'https://picsum.photos/seed/p6/400/400', number: 14 },
];

export const matches: Match[] = [
  { id: 'm1', team1: teams[0], team2: teams[1], date: '2024-10-26', time: '19:00', venue: 'King Fahd Stadium', status: 'scheduled' },
  { id: 'm2', team1: teams[2], team2: teams[3], date: '2024-10-26', time: '21:00', venue: 'Mrsool Park', status: 'scheduled' },
  { id: 'm3', team1: teams[4], team2: teams[5], date: '2024-10-27', time: '18:00', venue: 'King Abdullah Sports City', status: 'scheduled' },
  { id: 'm4', team1: teams[0], team2: teams[3], date: '2024-11-02', time: '20:00', venue: 'King Fahd Stadium', score: '2 - 1', status: 'finished' },
  { id: 'm5', team1: teams[1], team2: teams[2], date: '2024-11-02', time: '20:00', venue: 'King Abdullah Sports City', score: '0 - 0', status: 'finished' },
  { id: 'm6', team1: teams[0], team2: teams[5], date: '2024-10-20', time: '20:00', venue: 'Mrsool Park', score: '3 - 2', status: 'finished' },
];

export const news: NewsArticle[] = [
  {
    id: 'n1',
    title: 'Riyadh Rovers Secure Dramatic Last-Minute Victory',
    excerpt: 'A stunning goal in the 93rd minute gave Riyadh Rovers a crucial win against their rivals, keeping their championship hopes alive.',
    imageUrl: 'https://picsum.photos/seed/n1/600/400',
    category: 'Match Report',
    date: '2024-10-25',
    author: 'Admin',
  },
  {
    id: 'n2',
    title: 'Jeddah Jets Announce New Star Signing',
    excerpt: 'The Jets have officially unveiled their new forward, a prolific scorer from the international stage, in a record-breaking transfer.',
    imageUrl: 'https://picsum.photos/seed/n2/600/400',
    category: 'Transfers',
    date: '2024-10-24',
    author: 'Admin',
  },
  {
    id: 'n3',
    title: 'A Look Inside the New Dammam Stadium',
    excerpt: 'We take you on an exclusive tour of the state-of-the-art stadium that will host the semi-finals of the SaudiCup.',
    imageUrl: 'https://picsum.photos/seed/n3/600/400',
    category: 'Features',
    date: '2024-10-23',
    author: 'Admin',
  },
  {
    id: 'n4',
    title: 'Player of the Week: Fahd Al-Muwallad',
    excerpt: 'With two goals and an assist, the Jeddah Jets midfielder has been named the standout player of the latest round of matches.',
    imageUrl: 'https://picsum.photos/seed/n4/600/400',
    category: 'Awards',
    date: '2024-10-22',
    author: 'Admin',
  },
];

export const stadiums: Stadium[] = [
    { id: 's1', name: 'King Fahd International Stadium', city: 'Riyadh', capacity: 68752, imageUrl: 'https://picsum.photos/seed/s1/600/400' },
    { id: 's2', name: 'King Abdullah Sports City', city: 'Jeddah', capacity: 62345, imageUrl: 'https://picsum.photos/seed/s2/600/400' },
    { id: 's3', name: 'Mrsool Park', city: 'Riyadh', capacity: 25000, imageUrl: 'https://picsum.photos/seed/s3/600/400' },
    { id: 's4', name: 'Prince Mohamed bin Fahd Stadium', city: 'Dammam', capacity: 26000, imageUrl: 'https://picsum.photos/seed/s4/600/400' },
];
