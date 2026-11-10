---
title: Copista
year: 2026
type: Mac-app
summary: En Mac-app för notbibliotekarien som sorterar PDF:er i stämmor och skriver ut rätt antal av varje.
link: https://github.com/WheresMarco/Copista
image: /img/copista.png
featured: true
tech: [Swift, SwiftUI, PDFKit, Vision, Foundation Models, Sparkle]
gallery:
  - src: /img/copista/1.webp
    caption: Granskningen flaggar det som är osäkert och föreslår hur det rättas.
  - src: /img/copista/2.webp
    caption: En inskannad låt där alla stämmor hittades automatiskt.
  - src: /img/copista/3.webp
    caption: Antal exemplar per instrument, med totalt antal sidor.
  - src: /img/copista/4.webp
    caption: Utskriften, där varje låt blir ett eget jobb.
  - src: /img/copista/5.webp
    caption: Instrumentkatalogen med de namn Copista känner igen.
  - src: /img/copista/6.webp
    caption: Välkomstguiden vid första starten.
  - src: /img/copista/7.webp
    caption: Standardantal per stämma ställs in en gång.
  - src: /img/copista/8.webp
    caption: Släpp in PDF:er eller hela mappar.
---
Copista är en Mac-app jag byggde för notbiblioteket i en svensk blåsorkester. En låt kan komma som en PDF per stämma, som en enda inskannad bunt med alla stämmor eller som något däremellan. Copista hittar var varje stämma börjar och vilket instrument den är till, låter en rätta det som blev fel och skriver sedan ut varje låt sorterad per stämma med rätt antal exemplar.

Appen är skriven i Swift med SwiftUI och Observation, och PDF:erna läses och ritas med PDFKit och Core Graphics. Allt körs lokalt och originalfilerna ändras aldrig.

Kärnan är detekteringen. För varje PDF provas den mest pålitliga signalen först. Sparade rättelser kommer först, och filer känns igen på en SHA-256 av innehållet via CryptoKit, inte på filnamnet. Sedan bokmärken i PDF:en, filnamnet, textlagret i sidans övre hörn och till sist OCR med Vision, där överkanten av sidan läses av `RecognizeTextRequest` på svenska, engelska, tyska och norska. Roterade skanningar provas i varje riktning. En sida utan eget namn hör till stämman före, och en ny stämma börjar där ett instrumentnamn dyker upp i ett övre hörn eller på en egen rad.

Namnmatchningen hanterar svenska och engelska stämnamn, vanliga tyska namn, förkortningar, kombinationer som Horn 1/3 och fuzzy matchning för förvanskad gammal handtextning. Gamla handskrivna skanningar med två stämmor på samma sida delas genom att leta efter ett brett vitt band mitt på sidan, och säkerheten höjs om ett instrumentnamn också hittas i nedre halvan. På macOS 26 med Apple Intelligence frågas dessutom den lokala modellen via Foundation Models om etiketter som den egna matchningen inte kan placera. Modellen ser bara texten på etikettens position.

Utskriften planeras per låt, så att varje låt blir ett eget utskriftsjobb och en egen PDF. Vid dubbelsidig utskrift läggs tomma baksidor in där det behövs, så att varje exemplar börjar på ett nytt ark. Inställningar och rättelser sparas som JSON, och uppdateringar distribueras via Sparkle med signerade releaser från GitHub. Testerna är skrivna med Swift Testing och genererar sina PDF:er direkt i koden.
