
'use client';
import {
  File,
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
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { stadiums } from '@/lib/mock-data';
import Link from 'next/link';

export default function AdminStadiumsPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div>
                        <CardTitle>الملاعب</CardTitle>
                        <CardDescription>
                            إدارة ملاعب البطولة.
                        </CardDescription>
                    </div>
                    <div className="mr-auto flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            تصدير
                        </span>
                        </Button>
                        <Button size="sm" className="h-8 gap-1" asChild>
                        <Link href="/admin/stadiums/new">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            إضافة ملعب
                            </span>
                        </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">الصورة</span>
                    </TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead>المدينة</TableHead>
                    <TableHead className="hidden md:table-cell">السعة</TableHead>
                    <TableHead>
                      <span className="sr-only">الإجراءات</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stadiums.map((stadium) => (
                    <TableRow key={stadium.id}>
                       <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={stadium.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={stadium.imageUrl}
                          width="64"
                          data-ai-hint="stadium exterior"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {stadium.name}
                      </TableCell>
                      <TableCell>{stadium.city}</TableCell>
                      <TableCell className="hidden md:table-cell">{stadium.capacity.toLocaleString()}</TableCell>
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
                                <Link href={`/admin/stadiums/edit/${stadium.id}`}>تعديل</Link>
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
                عرض <strong>1-{stadiums.length}</strong> من <strong>{stadiums.length}</strong> ملاعب
              </div>
            </CardFooter>
          </Card>
    )
}
