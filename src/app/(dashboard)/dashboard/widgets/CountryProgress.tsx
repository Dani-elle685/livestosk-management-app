import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { UserCountry } from "@/infrastructure/dashboard/dto/user.countries";
import Image from "next/image";


interface CountryProgressProps {
  countries: UserCountry[];
}

export function CountryProgress({ countries }: CountryProgressProps) {
  return (
    <Card className="rounded">
      <CardHeader>
        <CardTitle className="text-base">Active users in country</CardTitle>
      </CardHeader>
      <Separator className="" />
      <CardContent className="space-y-4">
        {countries.map((country) => (
          <div className="flex items-center gap-2 w-full" key={country.name}>
            <div className="rounded-full overflow-hidden w-6 h-6 flex items-center justify-center aspect-square">
              <Image
                src={country.flag}
                alt={`${country.name}`}
                width={24}
                height={24}
                className=""
                />
            </div>
            <div key={country.name} className="space-y-2 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{country.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {country.percentage}%
                </span>
              </div>
              <Progress value={country.percentage} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
