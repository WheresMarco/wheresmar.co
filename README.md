# wheresmar.co

Källkoden till [wheresmar.co](https://wheresmar.co). Sajten byggs med Jekyll och publiceras via GitHub Pages.

## Köra lokalt

```sh
bundle install
bundle exec jekyll serve
```

Öppna sedan http://localhost:4000.

## Lägga till ett projekt

Varje projekt är en Markdown-fil i `_projects/`. Filnamnet blir adressen, så `_projects/billio.md` hamnar på `/projekt/billio/`.

```markdown
---
title: Billio
year: 2019
type: Sidoprojekt
client: Odd Alice          # valfritt, byrå eller uppdragsgivare
summary: En mening som syns i listor och som beskrivning.
link: https://billio.app   # valfritt
image: /img/billio.svg     # valfritt, logga eller skärmdump
tech: [PHP, React]         # valfritt
featured: true             # valfritt, visar projektet på startsidan
---

Längre beskrivning i vanlig Markdown.
```

Projektsidan (`/projekt/`) grupperar allt efter `year`, nyast först. Bilder läggs i `img/`.

## Ändra listan över kunder

Listan "Har arbetat med" på startsidan kommer från `_data/clients.yml`. Lägg till, ta bort eller ändra ordning där.

## Struktur

| Sökväg | Innehåll |
| --- | --- |
| `index.html` | Startsidan |
| `projekt/index.html` | Alla projekt per år |
| `_projects/` | Ett projekt per fil |
| `_data/clients.yml` | Kundlistan |
| `_layouts/`, `_includes/` | Mallar |
| `style.css` | All CSS, med färger som variabler överst (ljust och mörkt läge) |
