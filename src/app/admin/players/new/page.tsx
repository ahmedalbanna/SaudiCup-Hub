
'use client';
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { teams } from "@/lib/mock-data";

export default function NewPlayerPage() {
    return (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/players">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">العودة</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                لاعب جديد
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  تجاهل
                </Button>
                <Button size="sm">حفظ اللاعب</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل اللاعب</CardTitle>
                    <CardDescription>
                      املأ التفاصيل الرئيسية للاعب الجديد.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">اسم اللاعب</Label>
                                <Input id="name" type="text" className="w-full" placeholder="مثال: عادل السالم"/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="team">الفريق</Label>
                                <Select>
                                    <SelectTrigger id="team" aria-label="اختر الفريق">
                                        <SelectValue placeholder="اختر الفريق" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.map(team => (
                                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="position">المركز</Label>
                                <Input id="position" type="text" placeholder="ST, CM, GK..." />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="number">رقم القميص</Label>
                                <Input id="number" type="number" placeholder="10" />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="rating">التقييم العام</Label>
                                <Input id="rating" type="number" placeholder="92" />
                            </div>
                        </div>
                        <div>
                            <Label>إحصائيات اللاعب</Label>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-2">
                                {['pac', 'sho', 'pas', 'dri', 'def', 'phy'].map(stat => (
                                    <div key={stat} className="grid gap-2">
                                        <Label htmlFor={stat} className="text-xs uppercase">{stat}</Label>
                                        <Input id={stat} type="number" defaultValue="80" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>صورة اللاعب</CardTitle>
                    <CardDescription>
                      أضف صورة شخصية للاعب.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                       <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">تحميل</span>
                      </div>
                       <Button size="sm" variant="outline" className="w-full mt-2">
                            تحميل صورة
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                تجاهل
              </Button>
              <Button size="sm">حفظ اللاعب</Button>
            </div>
          </div>
    )
}
