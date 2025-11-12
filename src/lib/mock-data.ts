export type Team = {
  id: string;
  name: string;
  logoUrl: string;
};

export type PlayerStats = {
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
};

export type Nationality = {
  name: string;
  flagUrl: string;
};

export type Player = {
  id: string;
  name: string;
  teamId: string;
  position: string;
  imageUrl: string;
  number: number;
  rating: number;
  stats: PlayerStats;
  nationality: Nationality;
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
  content: string;
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
  { id: 't1', name: 'روفرز الرياض', logoUrl: 'https://picsum.photos/seed/t1_logo/100/100' },
  { id: 't2', name: 'جيتس جدة', logoUrl: 'https://picsum.photos/seed/t2_logo/100/100' },
  { id: 't3', name: 'ديناموز الدمام', logoUrl: 'https://picsum.photos/seed/t3_logo/100/100' },
  { id: 't4', name: 'ملوك مكة', logoUrl: 'https://picsum.photos/seed/t4_logo/100/100' },
  { id: 't5', name: 'خيول المدينة', logoUrl: 'https://picsum.photos/seed/t5_logo/100/100' },
  { id: 't6', name: 'نمور الطائف', logoUrl: 'https://picsum.photos/seed/t6_logo/100/100' },
];

const saudiArabia: Nationality = { name: 'Saudi Arabia', flagUrl: 'https://picsum.photos/seed/sa_flag/40/30' };

export const players: Player[] = [
  { 
    id: 'p1', name: 'عادل السالم', teamId: 't1', position: 'ST', imageUrl: 'https://picsum.photos/seed/p1/400/500', number: 10, rating: 92,
    stats: { pac: 91, sho: 93, pas: 85, dri: 94, def: 40, phy: 80 },
    nationality: saudiArabia,
  },
  { 
    id: 'p2', name: 'فهد المولد', teamId: 't2', position: 'CM', imageUrl: 'https://picsum.photos/seed/p2/400/500', number: 8, rating: 88,
    stats: { pac: 85, sho: 82, pas: 90, dri: 89, def: 75, phy: 81 },
    nationality: saudiArabia,
  },
  { 
    id: 'p3', name: 'خالد عيسى', teamId: 't3', position: 'GK', imageUrl: 'https://picsum.photos/seed/p3/400/500', number: 1, rating: 85,
    stats: { pac: 85, sho: 83, pas: 79, dri: 88, def: 45, phy: 80 }, // GK stats are different, but we use same structure for now
    nationality: saudiArabia,
  },
  { 
    id: 'p4', name: 'سلطان الغنام', teamId: 't1', position: 'RB', imageUrl: 'https://picsum.photos/seed/p4/400/500', number: 2, rating: 86,
    stats: { pac: 92, sho: 70, pas: 80, dri: 84, def: 81, phy: 84 },
    nationality: saudiArabia,
  },
  { 
    id: 'p5', name: 'ياسر الشهراني', teamId: 't2', position: 'LB', imageUrl: 'https://picsum.photos/seed/p5/400/500', number: 12, rating: 87,
    stats: { pac: 90, sho: 68, pas: 81, dri: 85, def: 82, phy: 83 },
    nationality: saudiArabia,
  },
  { 
    id: 'p6', name: 'عبدالله عطيف', teamId: 't3', position: 'CDM', imageUrl: 'https://picsum.photos/seed/p6/400/500', number: 14, rating: 84,
    stats: { pac: 75, sho: 72, pas: 86, dri: 83, def: 85, phy: 80 },
    nationality: saudiArabia,
  },
];

export const matches: Match[] = [
  { id: 'm1', team1: teams[0], team2: teams[1], date: '2024-10-26', time: '19:00', venue: 'استاد الملك فهد', status: 'live', score: '1 - 1' },
  { id: 'm2', team1: teams[2], team2: teams[3], date: '2024-10-26', time: '21:00', venue: 'مرسول بارك', status: 'scheduled' },
  { id: 'm3', team1: teams[4], team2: teams[5], date: '2024-10-27', time: '18:00', venue: 'مدينة الملك عبدالله الرياضية', status: 'scheduled' },
  { id: 'm4', team1: teams[0], team2: teams[3], date: '2024-11-02', time: '20:00', venue: 'استاد الملك فهد', score: '2 - 1', status: 'finished' },
  { id: 'm5', team1: teams[1], team2: teams[2], date: '2024-11-02', time: '20:00', venue: 'مدينة الملك عبدالله الرياضية', score: '0 - 0', status: 'finished' },
  { id: 'm6', team1: teams[0], team2: teams[5], date: '2024-10-20', time: '20:00', venue: 'مرسول بارك', score: '3 - 2', status: 'finished' },
];

export const news: NewsArticle[] = [
  {
    id: 'n1',
    title: 'روفرز الرياض يحقق فوزًا دراماتيكيًا في اللحظات الأخيرة',
    excerpt: 'هدف مذهل في الدقيقة 93 منح روفرز الرياض فوزًا حاسمًا على منافسهم، محافظًا على آمالهم في البطولة.',
    content: 'في مباراة مثيرة حبست الأنفاس، تمكن فريق روفرز الرياض من تحقيق فوز ثمين على غريمه التقليدي بهدف في الدقيقة الثالثة من الوقت بدل الضائع. جاء الهدف بعد هجمة مرتدة سريعة أنهاها المهاجم المتألق في الشباك، مما أشعل حماس الجماهير التي احتشدت في المدرجات. بهذا الفوز، يعزز روفرز موقعه في صدارة الترتيب ويقترب خطوة كبيرة من حسم لقب البطولة لهذا الموسم.',
    imageUrl: 'https://picsum.photos/seed/n1/600/400',
    category: 'تقرير المباراة',
    date: '2024-10-25',
    author: 'Admin',
  },
  {
    id: 'n2',
    title: 'جيتس جدة يعلن عن توقيع نجم جديد',
    excerpt: 'كشف جيتس رسميًا عن مهاجمهم الجديد، وهو هداف غزير من الساحة الدولية، في صفقة انتقال قياسية.',
    content: 'أعلن نادي جيتس جدة رسميًا عن تعاقده مع المهاجم الدولي الشهير في صفقة وصفت بأنها الأضخم في تاريخ النادي. وقد عبر اللاعب عن سعادته بالانضمام إلى الفريق، مؤكدًا أنه سيبذل قصارى جهده للمساهمة في تحقيق الألقاب. ومن المتوقع أن يشكل هذا التعاقد إضافة قوية لخط هجوم الفريق في الموسم المقبل، مما يرفع من سقف طموحات الجماهير.',
    imageUrl: 'https://picsum.photos/seed/n2/600/400',
    category: 'الانتقالات',
    date: '2024-10-24',
    author: 'Admin',
  },
  {
    id: 'n3',
    title: 'نظرة داخل استاد الدمام الجديد',
    excerpt: 'نأخذكم في جولة حصرية داخل الاستاد الحديث الذي سيستضيف نصف نهائي كأس السعودية.',
    content: 'تم الكشف عن استاد الدمام الجديد الذي يعد تحفة معمارية رياضية متكاملة. يتميز الاستاد بتصميمه الفريد وسعته الجماهيرية الكبيرة، بالإضافة إلى أحدث التقنيات المستخدمة في الإضاءة والصوت. سيستضيف هذا الصرح الرياضي الكبير مباريات الدور نصف النهائي من بطولة كأس السعودية، ومن المتوقع أن يوفر تجربة استثنائية للاعبين والجماهير على حد سواء.',
    imageUrl: 'https://picsum.photos/seed/n3/600/400',
    category: 'مقالات خاصة',
    date: '2024-10-23',
    author: 'Admin',
  },
  {
    id: 'n4',
    title: 'لاعب الأسبوع: فهد المولد',
    excerpt: 'بهدفين وتمريرة حاسمة، تم اختيار لاعب وسط جيتس جدة كأفضل لاعب في الجولة الأخيرة من المباريات.',
    content: 'تألق لاعب الوسط فهد المولد بشكل لافت في الجولة الأخيرة، حيث سجل هدفين وصنع آخر، ليقود فريقه لتحقيق فوز مهم. وبفضل أدائه المتميز، تم اختياره بالإجماع كأفضل لاعب في الأسبوع. يواصل المولد تقديم مستويات رائعة هذا الموسم، مما يجعله أحد أبرز اللاعبين في البطولة وعنصرًا أساسيًا في تشكيلة فريقه.',
    imageUrl: 'https://picsum.photos/seed/n4/600/400',
    category: 'جوائز',
    date: '2024-10-22',
    author: 'Admin',
  },
];

export const stadiums: Stadium[] = [
    { id: 's1', name: 'استاد الملك فهد الدولي', city: 'الرياض', capacity: 68752, imageUrl: 'https://picsum.photos/seed/s1/600/400' },
    { id: 's2', name: 'مدينة الملك عبدالله الرياضية', city: 'جدة', capacity: 62345, imageUrl: 'https://picsum.photos/seed/s2/600/400' },
    { id: 's3', name: 'مرسول بارك', city: 'الرياض', capacity: 25000, imageUrl: 'https://picsum.photos/seed/s3/600/400' },
    { id: 's4', name: 'استاد الأمير محمد بن فهد', city: 'الدمام', capacity: 26000, imageUrl: 'https://picsum.photos/seed/s4/600/400' },
];
