'use client';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { news } from '@/lib/mock-data';
import Link from 'next/link';

export default function AdminNewsPage() {
    return (
        <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="published">منشور</TabsTrigger>
            <TabsTrigger value="draft">مسودة</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              مؤرشف
            </TabsTrigger>
          </TabsList>
          <div className="mr-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    تصفية
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>تصفية حسب</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  نشط
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>مسودة</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  مؤرشف
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                تصدير
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1" asChild>
              <Link href="/admin/news/new">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  إضافة مقال
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>مقالات الأخبار</CardTitle>
              <CardDescription>
                إدارة المقالات الإخبارية الخاصة بك وتتبع أدائها.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">صورة</span>
                    </TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="hidden md:table-cell">
                      الفئة
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      تاريخ الإنشاء
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">الإجراءات</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {news.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={article.title}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={article.imageUrl}
                          width="64"
                          data-ai-hint="football action"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {article.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">منشور</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {article.category}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                         {new Date(article.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">قائمة الإجراءات</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/news/edit/${article.id}`}>تعديل</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>حذف</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                عرض <strong>1-10</strong> من <strong>{news.length}</strong> مقالات
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    )
}
