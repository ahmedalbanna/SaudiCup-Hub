import { matches, players, teams } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MatchCard } from '@/components/cards/MatchCard';
import { PlayerCard } from '@/components/cards/PlayerCard';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  // Mock data for favorite matches and players
  const favoriteMatches = matches.slice(0, 2);
  const favoritePlayers = players.slice(0, 4);

  return (
    <>
      <div className="mb-6">
        <h1 className="font-headline text-2xl font-bold text-foreground md:text-3xl">
          المفضلة
        </h1>
        <p className="mt-1 text-muted-foreground">
          تتبع المباريات واللاعبين المفضلين لديك في مكان واحد.
        </p>
      </div>

      <Tabs defaultValue="matches" dir="rtl">
        <TabsList className="grid w-full grid-cols-2 bg-muted/80 border border-border">
          <TabsTrigger value="matches">المباريات المفضلة</TabsTrigger>
          <TabsTrigger value="players">اللاعبون المفضلون</TabsTrigger>
        </TabsList>
        <TabsContent value="matches" className="mt-6">
          {favoriteMatches.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {favoriteMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <Card className="bg-card/80 border-border">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Heart className="h-12 w-12 mb-4" />
                <p className="font-bold text-lg">لم تقم بإضافة أي مباريات مفضلة بعد</p>
                <p>انقر على أيقونة القلب في تفاصيل المباراة لإضافتها هنا.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="players" className="mt-6">
          {favoritePlayers.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {favoritePlayers.map((player) => {
                const team = teams.find((t) => t.id === player.teamId);
                if (!team) return null;
                return <PlayerCard key={player.id} player={player} team={team} />;
              })}
            </div>
          ) : (
            <Card className="bg-card/80 border-border">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Heart className="h-12 w-12 mb-4" />
                <p className="font-bold text-lg">لم تقم بإضافة أي لاعبين مفضلين بعد</p>
                <p>انقر على أيقونة القلب في صفحة اللاعب لإضافته هنا.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
