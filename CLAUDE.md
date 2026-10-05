# gavalier_web

Statický web, čisté HTML, CSS a JS bez build kroku. Zdroj pravdy je git repozitár
`gavalierm/gavalier-web`, vetva `main`. Ak sa niečo pokazí, vraciame sa cez git.
Web na ostro beží z FTP servera, nie z GitHubu. Push web nezmení, zmení ho až upload.

## Rozhodnutia operátora

- Žiadne zálohy ani sťahovanie stavu servera. Git je jediná záloha.
- Všetko k nasadeniu leží v tomto priečinku. Nič sa neinštaluje ani neukladá inde v systéme.
- Prihlasovacie údaje ležia v tomto priečinku v `.ftp.env`, ktorý je v `.gitignore`.
- Nasadenie je jeden skript, ktorý agent len spustí.

## Nasadenie

`./deploy.sh`, prípadne s `--dry` na výpis zoznamu alebo `--all` na prvé nasadenie.
Skript používa `curl`, ktorý je súčasťou macOS. Nepotrebuje `lftp` ani nič iné.

Skript odmietne bežať, ak pracovný strom nie je čistý alebo `HEAD` nie je na `origin/main`.
Nahrá súbory zmenené od lokálneho tagu `deployed`, nikdy nič nemaže, a po úspechu tag
posunie na nasadený commit. Do nasadenia nepatria `CLAUDE.md`, `DECISIONS.md`,
`deploy.sh`, `.gitignore` a `docs/`.

Upload na ostrý server agent spúšťa len na pokyn operátora. Pred ním ukáže výstup
`./deploy.sh --dry`.

## Formát `.ftp.env`

Súbor zakladá operátor sám, agent ho nevypisuje ani nekopíruje.

```
FTP_URL=ftps://host/cesta/k/webu/
FTP_USER=...
FTP_PASS=...
SITE_URL=https://adresa-webu/
```

`SITE_URL` je nepovinná a slúži na kontrolu stavového kódu po uploade. Pri `ftp://` skript
sám vyžiada TLS cez `--ssl-reqd` a bez TLS sa nepripojí.

## Server

Hosting je Websupport. Doména `gavalier.sk` ukazuje na `37.9.175.156`, čo je
`ing.r2.websupport.sk`. Overené 2026-10-05.

- Pripájame sa na `ing.r2.websupport.sk`, nie na `gavalier.sk`. Certifikát FTP servera
  je `*.r2.websupport.sk`, takže na `gavalier.sk` overenie certifikátu zlyhá.
- Explicitné FTPS na porte 21 funguje, handshake s overeným certifikátom prešiel.
- Port 22 odpovedá ako SFTP, ale `curl` v macOS nemá podporu `sftp`, preto SFTP nepoužívame.
- Používateľ je `gavo.gavalier.sk`.

## Stav

`.ftp.env` je kompletný a prihlásenie funguje. Koreň webu je `web/` v domovskom adresári
FTP účtu, čiže `FTP_URL=ftp://ing.r2.websupport.sk/web/`. Tag `deployed` zatiaľ neexistuje,
prvé nasadenie ide ako `./deploy.sh --all`.

Na serveri ležia veci, ktoré nie sú v gite, a skript sa ich nedotkne, lebo nahráva len
súbory z gitu.

- `web/.htaccess` patrí serveru a v repozitári nie je.
- `sub/` vedľa `web/` obsahuje iné weby, napríklad `forestshop`, `baofeng`, `cp`, `cdn`. Do `sub/` sa
  nikdy nezapisuje. `FTP_URL` musí vždy končiť na `/web/`.
- `logs/` patrí serveru.

## Čo skript nerieši

Ak niekto zmenil súbor priamo na serveri, upload ho prepíše. Zmena mimo gitu sa
nedá vrátiť, lebo ju git nepozná. Operátor sa rozhodol toto riziko prijať.
