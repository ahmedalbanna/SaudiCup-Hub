

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
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewsPage() {
  const categories = [...new Set(news.map(n => n.category))];
  
  return (
    <>
      <div className="mb-6">
        <h1 className="font-headline text-2xl font-bold text-white md:text-3xl">
          الأخبار والمقالات
        </h1>
        <p className="mt-1 text-gray-400">
          آخر التحديثات والمقالات الحصرية من قلب الحدث.
        </p>
      </div>

       <Card className="mb-6 bg-gray-800/50 border-gray-700/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="ابحث في المقالات..." className="w-full pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500" />
            </div>
            <div className="flex gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px] bg-gray-900/50 border-gray-700 text-white">
                  <SelectValue placeholder="تصفية حسب الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase().replace(' ', '-')}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

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
