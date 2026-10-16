---
title: Billio
year: 2023
type: Biljettsystem
summary: Biljettsystemet för föreningar och arrangörer, från försäljning till incheckning.
link: https://billio.app
image: /img/billio.png
featured: true
gallery:
  - src: /img/billio/1.webp
    caption: Startsidan med kommande evenemang.
  - src: /img/billio/2.webp
    caption: Om Billio, med de viktigaste funktionerna.
  - src: /img/billio/3.webp
    caption: Evenemangssidan för LiTHe Blås 50-årsjubileum, med biljetter och donationer.
tech: [PHP, Laravel, React Native, Stripe]
---
Billio började med en enkel tanke: att sälja biljetter ska vara enkelt. Det har vuxit till ett komplett biljettsystem som tar hand om allt från försäljning till incheckning, och som används av föreningar och arrangörer i Linköping.

Första versionen byggde jag ovanpå WordPress. När kraven växte skrev jag om systemet som en renodlad Laravel-applikation, vilket gav full kontroll över datamodell, behörigheter och betalflöden i stället för att arbeta runt ett CMS.

Kärnan är datamodellen för evenemang. Varje evenemang har biljettyper med egna priser, tillägg som merch och varianter som kostalternativ. Förköpslänkar ger utvalda grupper tillgång till försäljningen innan den öppnar för alla, så att biljettsläpp kan ske i omgångar. Bland annat LiTHe Blås använde det för sitt 50-årsjubileum, där biljetterna släpptes i tre steg och besökarna även kunde skänka pengar till jubileet.

Betalningarna går via Stripe, så kortuppgifter hanteras aldrig av Billio och kraven på kortsäkerhet ligger hos Stripe. Varje köp genererar biljetter med QR-koder, och avgiften räknas per såld biljett så att gratisevenemang inte kostar något.

Incheckningen sker i en egen app byggd i React Native. Arrangörens personal scannar gästernas QR-koder vid entrén och appen validerar biljetten mot Laravel-backenden, så att samma biljett inte kan användas två gånger.
