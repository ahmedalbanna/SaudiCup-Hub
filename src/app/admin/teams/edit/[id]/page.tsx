
'use client';
import { use } from 'react';
import { ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { teams } from '@/lib/mock-data';
import { notFound } from "next/navigation";

export default function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const team = teams.find(t => t.id === id);
    if (!team) {
        notFound();
    }

    return (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/teams">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">العودة</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                تعديل الفريق
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  تجاهل
                </Button>
                <Button size="sm">حفظ التغييرات</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل الفريق</CardTitle>
                    <CardDescription>
                      قم بتحديث تفاصيل فريقك.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">اسم الفريق</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue={team.name}
                        />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="rating">التقييم</Label>
                                <Input id="rating" type="number" defaultValue={team.rating} />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="att">الهجوم</Label>
                                <Input id="att" type="number" defaultValue={team.stats.att} />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="mid">الوسط</Label>
                                <Input id="mid" type="number" defaultValue={team.stats.mid} />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="def">الدفاع</Label>
                                <Input id="def" type="number" defaultValue={team.stats.def} />
                            </div>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>شعار الفريق</CardTitle>
                    <CardDescription>
                      تغيير شعار الفريق.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                       <Image
                        alt={team.name}
                        className="aspect-square w-full rounded-md object-contain"
                        height="300"
                        src={team.logoUrl}
                        width="300"
                        data-ai-hint="team logo"
                        />
                       <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="w-full mt-2">
                                تغيير الشعار
                            </Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                تجاهل
              </Button>
              <Button size="sm">حفظ التغييرات</Button>
            </div>
          </div>
    )
}
