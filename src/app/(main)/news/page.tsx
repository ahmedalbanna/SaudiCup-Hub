
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
          الأخبار والمقالات
        </h1>
        <div className="flex items-center gap-2">
            <Input placeholder="ابحث في المقالات..." className="w-48"/>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="تصفية حسب الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="match-report">تقرير المباراة</SelectItem>
              <SelectItem value="transfers">الانتقالات</SelectItem>
              <SelectItem value="features">مقالات خاصة</SelectItem>
              <SelectItem value="awards">الجوائز</SelectItem>
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
