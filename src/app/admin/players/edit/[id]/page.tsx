
'use client';
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { players, teams } from '@/lib/mock-data';
import { notFound } from "next/navigation";

export default function EditPlayerPage({ params }: { params: { id: string } }) {
    const player = players.find(p => p.id === params.id);
    if (!player) {
        notFound();
    }

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
                تعديل اللاعب
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
                    <CardTitle>تفاصيل اللاعب</CardTitle>
                    <CardDescription>
                      قم بتحديث تفاصيل اللاعب.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">اسم اللاعب</Label>
                                <Input id="name" type="text" className="w-full" defaultValue={player.name}/>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="team">الفريق</Label>
                                <Select defaultValue={player.teamId}>
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
                                <Input id="position" type="text" defaultValue={player.position} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="number">رقم القميص</Label>
                                <Input id="number" type="number" defaultValue={player.number} />
                            </div>
                             <div className="grid gap-3">
                                <Label htmlFor="rating">التقييم العام</Label>
                                <Input id="rating" type="number" defaultValue={player.rating} />
                            </div>
                        </div>
                        <div>
                            <Label>إحصائيات اللاعب</Label>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-2">
                                {(Object.keys(player.stats) as Array<keyof typeof player.stats>).map(stat => (
                                    <div key={stat} className="grid gap-2">
                                        <Label htmlFor={stat} className="text-xs uppercase">{stat}</Label>
                                        <Input id={stat} type="number" defaultValue={player.stats[stat]} />
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
                      تغيير الصورة الشخصية للاعب.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                       <Image
                        alt={player.name}
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={player.imageUrl}
                        width="300"
                        data-ai-hint="male portrait"
                        />
                       <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="w-full mt-2">
                                تغيير الصورة
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
