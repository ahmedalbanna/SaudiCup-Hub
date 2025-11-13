'use client';
import { use } from 'react';
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { news } from '@/lib/mock-data';
import { notFound } from "next/navigation";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const article = news.find(n => n.id === id);
    if (!article) {
        notFound();
    }

    return (
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link href="/admin/news">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">العودة</span>
                </Link>
              </Button>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                تعديل المقال
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                منشور
              </Badge>
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
                    <CardTitle>تفاصيل المقال</CardTitle>
                    <CardDescription>
                      قم بتحديث تفاصيل مقالك الإخباري.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="title">العنوان</Label>
                        <Input
                          id="title"
                          type="text"
                          className="w-full"
                          defaultValue={article.title}
                        />
                      </div>
                       <div className="grid gap-3">
                        <Label htmlFor="excerpt">مقتطف</Label>
                        <Textarea
                          id="excerpt"
                          defaultValue={article.excerpt}
                          className="min-h-24"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="content">المحتوى</Label>
                        <Textarea
                          id="content"
                          defaultValue={article.content}
                          className="min-h-48"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>حالة المقال</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">الحالة</Label>
                        <Select defaultValue="published">
                          <SelectTrigger id="status" aria-label="اختر الحالة">
                            <SelectValue placeholder="اختر الحالة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">مسودة</SelectItem>
                            <SelectItem value="published">منشور</SelectItem>
                            <SelectItem value="archived">مؤرشف</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>صورة المقال</CardTitle>
                    <CardDescription>
                      تغيير الصورة الرئيسية للمقال.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                       <Image
                        alt={article.title}
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src={article.imageUrl}
                        width="300"
                        data-ai-hint="football action"
                        />
                       <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="w-full mt-2">
                                تغيير الصورة
                            </Button>
                       </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>الفئة</CardTitle>
                  </CardHeader>
                   <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="category">الفئة</Label>
                        <Select defaultValue={article.category.toLowerCase().replace(' ', '-')}>
                          <SelectTrigger id="category" aria-label="اختر الفئة">
                            <SelectValue placeholder="اختر الفئة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="match-report">تقرير المباراة</SelectItem>
                            <SelectItem value="transfers">الانتقالات</SelectItem>
                            <SelectItem value="features">مقالات خاصة</SelectItem>
                            <SelectItem value="awards">الجوائز</SelectItem>
                          </SelectContent>
                        </Select>
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
