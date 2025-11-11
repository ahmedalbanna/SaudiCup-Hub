
import { NewsCard } from '@/components/cards/NewsCard';
import { news } from '@/lib/mock-data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function NewsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          News & Articles
        </h1>
        <div className="flex items-center gap-2">
            <Input placeholder="Search articles..." className="w-48"/>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="match-report">Match Report</SelectItem>
              <SelectItem value="transfers">Transfers</SelectItem>
              <SelectItem value="features">Features</SelectItem>
              <SelectItem value="awards">Awards</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
        {news.map((article) => (
          <NewsCard key={`${article.id}-2`} article={{...article, id: `${article.id}-2`}} />
        ))}
      </div>
    </>
  );
}
