
'use client';
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { teams } from "@/lib/mock-data";

export default function NewMatchPage() {
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
                مباراة جديدة
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  تجاهل
                </Button>
                <Button size="sm">حفظ المباراة</Button>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل المباراة</CardTitle>
                <CardDescription>
                  املأ التفاصيل الرئيسية للمباراة الجديدة.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="team1">الفريق الأول</Label>
                            <Select>
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
                            <Select>
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
                            <Input id="venue" type="text" placeholder="مثال: استاد الملك فهد" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="status">الحالة</Label>
                            <Select defaultValue="scheduled">
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
                            <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="time">الوقت</Label>
                            <Input id="time" type="time" defaultValue="21:00" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="score">النتيجة</Label>
                            <Input id="score" type="text" placeholder="مثال: 2-1" />
                        </div>
                    </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                تجاهل
              </Button>
              <Button size="sm">حفظ المباراة</Button>
            </div>
          </div>
    )
}
