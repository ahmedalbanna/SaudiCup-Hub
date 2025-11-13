
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
import { matches } from '@/lib/mock-data';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function AdminMatchesPage() {
    const statusMap: {[key: string]: string} = {
        scheduled: 'مجدولة',
        live: 'مباشر',
        finished: 'انتهت'
    }

    const statusBadgeVariant: {[key: string]: "default" | "secondary" | "destructive" | "outline" | null | undefined} = {
        scheduled: 'default',
        live: 'destructive',
        finished: 'secondary'
    }


    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div>
                        <CardTitle>المباريات</CardTitle>
                        <CardDescription>
                            إدارة مباريات البطولة.
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
                        <Link href="/admin/matches/new">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            إضافة مباراة
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
                    <TableHead>الفرق</TableHead>
                    <TableHead>النتيجة</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="hidden md:table-cell">التاريخ</TableHead>
                    <TableHead className="hidden md:table-cell">الملعب</TableHead>
                    <TableHead>
                      <span className="sr-only">الإجراءات</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {matches.map((match) => (
                    <TableRow key={match.id}>
                      <TableCell className="font-medium">
                        {match.team1.name} ضد {match.team2.name}
                      </TableCell>
                      <TableCell>{match.score ?? '-'}</TableCell>
                      <TableCell>
                        <Badge variant={statusBadgeVariant[match.status]}>
                          {statusMap[match.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(match.date).toLocaleDateString('ar-SA')} - {match.time}
                      </TableCell>
                       <TableCell className="hidden md:table-cell">{match.venue}</TableCell>
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
                                <Link href={`/admin/matches/edit/${match.id}`}>تعديل</Link>
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
                عرض <strong>1-{matches.length}</strong> من <strong>{matches.length}</strong> مباريات
              </div>
            </CardFooter>
          </Card>
    )
}
