
'use client';
import { use } from 'react';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { matches, teams } from '@/lib/mock-data';
import { notFound } from "next/navigation";

export default function EditMatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const match = matches.find(m => m.id === id);
    if (!match) {
        notFound();
    }

    return (
        <div className="mx-auto grid max-w-3xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/matches">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">العودة</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                تعديل المباراة
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  تجاهل
                </Button>
                <Button size="sm">حفظ التغييرات</Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل المباراة</CardTitle>
                <CardDescription>
                  قم بتحديث تفاصيل المباراة.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="team1">الفريق الأول</Label>
                            <Select defaultValue={match.team1.id}>
                                <SelectTrigger id="team1" aria-label="اختر الفريق الأول">
                                    <SelectValue placeholder="اختر الفريق الأول" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map(team => (
                                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="team2">الفريق الثاني</Label>
                            <Select defaultValue={match.team2.id}>
                                <SelectTrigger id="team2" aria-label="اختر الفريق الثاني">
                                    <SelectValue placeholder="اختر الفريق الثاني" />
                                </SelectTrigger>
                                <SelectContent>
                                    {teams.map(team => (
                                        <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="grid gap-3">
                            <Label htmlFor="venue">الملعب</Label>
                            <Input id="venue" type="text" defaultValue={match.venue} />
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="status">الحالة</Label>
                            <Select defaultValue={match.status}>
                              <SelectTrigger id="status" aria-label="اختر الحالة">
                                <SelectValue placeholder="اختر الحالة" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="scheduled">مجدولة</SelectItem>
                                <SelectItem value="live">مباشر</SelectItem>
                                <SelectItem value="finished">انتهت</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="date">التاريخ</Label>
                            <Input id="date" type="date" defaultValue={match.date.split('T')[0]} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="time">الوقت</Label>
                            <Input id="time" type="time" defaultValue={match.time} />
                        </div>
                         <div className="grid gap-3">
                            <Label htmlFor="score">النتيجة</Label>
                            <Input id="score" type="text" defaultValue={match.score} placeholder="مثال: 2-1" />
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                تجاهل
              </Button>
              <Button size="sm">حفظ التغييرات</Button>
            </div>
          </div>
    )
}
