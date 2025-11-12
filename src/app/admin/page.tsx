'use client';
import {
  Activity,
  ArrowUpRight,
  Newspaper,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { news, teams, players, matches } from '@/lib/mock-data';

export default function AdminDashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي المقالات الإخبارية
            </CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{news.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 تم إنشاؤها هذا الشهر
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الفرق</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">
              +1 تم إنشاؤه هذا الشهر
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              إجمالي اللاعبين
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
            <p className="text-xs text-muted-foreground">
              +5 تم إنشاؤهم هذا الشهر
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              المباريات المجدولة
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{matches.filter(m => m.status === 'scheduled').length}</div>
            <p className="text-xs text-muted-foreground">
              +3 مباريات هذا الأسبوع
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>آخر المقالات الإخبارية</CardTitle>
              <CardDescription>
                أحدث المقالات المضافة إلى الموقع.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="mr-auto gap-1">
              <Link href="/admin/news">
                عرض الكل
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العنوان</TableHead>
                  <TableHead className="hidden xl:table-column">
                    الفئة
                  </TableHead>
                  <TableHead className="hidden xl:table-column">
                    الحالة
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    تاريخ النشر
                  </TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.slice(0, 5).map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div className="font-medium">{article.title}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        بواسطة {article.author}
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                       <Badge variant="outline">{article.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                       <Badge variant="secondary">منشور</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(article.date).toLocaleDateString()}
                    </TableCell>
                     <TableCell className="text-left">
                       <Link href={`/admin/news/edit/${article.id}`} className="text-sm font-medium text-primary hover:underline">
                        تعديل
                       </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>أحدث المستخدمين المسجلين</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={`https://picsum.photos/seed/user${i+1}/100/100`} alt="Avatar" />
                  <AvatarFallback>م{i+1}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">مستخدم جديد {i+1}</p>
                  <p className="text-sm text-muted-foreground">
                    user{i+1}@example.com
                  </p>
                </div>
                <div className="mr-auto font-medium">عضو جديد</div>
              </div>
            ))}

          </CardContent>
        </Card>
      </div>
    </>
  );
}
