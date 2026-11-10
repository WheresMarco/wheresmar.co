---
title: Jobbie
year: 2026
type: Webbapp
summary: Samlar jobbannonser direkt från arbetsgivarnas egna karriärsidor och matchar dem mot ditt CV.
link: https://github.com/WheresMarco/jobbie
image: /img/jobbie.svg
featured: false
tech: [PHP, Laravel, Livewire, Tailwind CSS, MySQL, Redis, Claude API]
gallery:
  - src: /img/jobbie/1.webp
    caption: Startsidan för besökare, med aktuella siffror och källorna.
  - src: /img/jobbie/2.webp
    caption: Välkomstsidan för nya konton, med tre steg för att komma igång.
  - src: /img/jobbie/3.webp
    caption: Annonslistan grupperad per arbetsgivare, med filter och antal träffar per filter.
  - src: /img/jobbie/4.webp
    caption: CV-matchningen med en redigerbar profil och annonser bedömda från 0 till 100.
  - src: /img/jobbie/5.webp
    caption: Inloggningen.
---
Många jobb annonseras bara på företagens egna karriärsidor. Jobbie letar upp svenska arbetsgivare som rekryterar, läser deras annonser direkt från rekryteringssystemen och samlar allt i en sökbar lista. Man kan markera annonser som att hantera, ansökt eller ej relevant, dölja hela företag och se direkt vad som är nytt sedan sist.

Appen är byggd i Laravel 13 på PHP 8.4, med Livewire 4 och Tailwind CSS 4 i gränssnittet. Data ligger i MySQL, köer och cache i Redis, och allt tungt arbete körs som jobb via Horizon. Schemaläggaren läser av alla karriärsidor varje natt och letar efter nya arbetsgivare varje vecka.

Varje plattform har en egen adapter som känner igen konton i länkar och läser deras öppna annonser: Teamtailor via `jobs.json` och RSS, Varbi via RSS, SmartRecruiters, Workday, Greenhouse, Lever och Ashby via deras publika API:er, och Platsbanken via Arbetsförmedlingens JobStream. JobStream läses först som en ögonblicksbild på runt 300 MB som strömmas från disk och sedan bara som ändringar.

Det svåra är att hitta karriärsidorna. Kandidater samlas från flera källor: omdirigeringar vid varje skrapning, ansökningslänkar i Platsbanken, vanliga prefix som `jobb.` och `career.` provade mot kända domäner, Common Crawl och Internet Archive via deras CDX API:er, och Teamtailors verifieringsposter i DNS TXT. Varje kandidat verifieras sedan från billigt till dyrt. Först DNS över HTTPS med hela CNAME-kedjan, sedan en jämförelse mot kända fingeravtryck och till sist ett HTTP-anrop som bara godkänns om det ger ett läsbart jobbflöde. Registrerbara domäner räknas ut med Public Suffix List, och karriärsidor som visar sig vara samma sajt under olika värdnamn slås ihop.

Sökningen använder FULLTEXT i MySQL i boolean mode. Fritexten matchas i SQL, varje träff läses som en smal rad genom ett täckande index, och totalen, alla filterantal och grupperna räknas i ett enda pass i PHP. Bara annonserna som syns på skärmen laddas i sin helhet. En testsvit seedar 50 000 annonser och kräver att typiska sidor svarar inom 300 ms.

CV-matchningen skickar PDF:en direkt till Claude, som returnerar en strukturerad profil med roller, kompetenser, orter och söktermer. Filen raderas därefter och bara profilen sparas. Söktermerna plockar fram de 300 mest lika annonserna med FULLTEXT, där träffar i titeln väger tre gånger så mycket, och Claude bedömer dem i parallella jobb, 20 annonser per anrop, med en poäng och en motivering. En full matchning kostar runt sju amerikanska cent med Haiku.

Allt testas offline med Pest. `Http::preventStrayRequests()` är påslaget, och DNS och TLS ersätts av falska klienter. Koden analyseras med Larastan på nivå 6.
