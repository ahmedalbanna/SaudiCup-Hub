import Image from 'next/image';
import { stadiums } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, Users } from 'lucide-react';

export default function StadiumsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="font-headline text-lg font-semibold md:text-2xl">
          Venues & Stadiums
        </h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {stadiums.map((stadium) => (
          <Card key={stadium.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={stadium.imageUrl}
                  alt={`Image of ${stadium.name}`}
                  fill
                  className="rounded-t-lg object-cover"
                  data-ai-hint="stadium exterior"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="font-headline text-xl">
                {stadium.name}
              </CardTitle>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-1.5 h-4 w-4" />
                <span>{stadium.city}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center text-sm">
                <Users className="mr-1.5 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {stadium.capacity.toLocaleString()}
                </span>
                <span className="ml-1 text-muted-foreground">Capacity</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}