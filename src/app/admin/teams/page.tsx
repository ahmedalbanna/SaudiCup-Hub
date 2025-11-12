
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
import { teams } from '@/lib/mock-data';
import Link from 'next/link';
import { Star } from 'lucide-react';

export default function AdminTeamsPage() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center">
                    <div>
                        <CardTitle>الفرق</CardTitle>
                        <CardDescription>
                            إدارة الفرق المشاركة في البطولة.
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
                        <Link href="/admin/teams/new">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            إضافة فريق
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
                      <span className="sr-only">الشعار</span>
                    </TableHead>
                    <TableHead>الاسم</TableHead>
                    <TableHead className="hidden md:table-cell">التقييم</TableHead>
                    <TableHead className="hidden md:table-cell">ATT</TableHead>
                    <TableHead className="hidden md:table-cell">MID</TableHead>
                    <TableHead className="hidden md:table-cell">DEF</TableHead>
                    <TableHead>
                      <span className="sr-only">الإجراءات</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={`${team.name} logo`}
                          className="aspect-square rounded-md object-contain"
                          height="64"
                          src={team.logoUrl}
                          width="64"
                          data-ai-hint="team logo"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {team.name}
                      </TableCell>
                       <TableCell className="hidden md:table-cell">
                         <div className="flex items-center">
                            {team.rating} 
                            <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />
                         </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{team.stats.att}</TableCell>
                      <TableCell className="hidden md:table-cell">{team.stats.mid}</TableCell>
                      <TableCell className="hidden md:table-cell">{team.stats.def}</TableCell>
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
                                <Link href={`/admin/teams/edit/${team.id}`}>تعديل</Link>
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
                عرض <strong>1-{teams.length}</strong> من <strong>{teams.length}</strong> فرق
              </div>
            </CardFooter>
          </Card>
    )
}
