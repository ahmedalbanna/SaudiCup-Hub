
'use client';
import { ChevronLeft, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function NewStadiumPage() {
    return (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/stadiums">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">العودة</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                ملعب جديد
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  تجاهل
                </Button>
                <Button size="sm">حفظ الملعب</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>تفاصيل الملعب</CardTitle>
                    <CardDescription>
                      املأ التفاصيل الرئيسية للملعب الجديد.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-3">
                              <Label htmlFor="name">اسم الملعب</Label>
                              <Input id="name" type="text" className="w-full" placeholder="مثال: استاد الملك فهد الدولي"/>
                          </div>
                          <div className="grid gap-3">
                              <Label htmlFor="city">المدينة</Label>
                              <Input id="city" type="text" className="w-full" placeholder="مثال: الرياض"/>
                          </div>
                      </div>
                      <div className="grid gap-3">
                          <Label htmlFor="capacity">السعة</Label>
                          <Input id="capacity" type="number" placeholder="68000" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>صورة الملعب</CardTitle>
                    <CardDescription>
                      أضف صورة للملعب.
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
              <Button size="sm">حفظ الملعب</Button>
            </div>
          </div>
    )
}
