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

`SITE_URL` je nepovinná a slúži na kontrolu stavového kódu po uploade. Schéma v `FTP_URL`
určuje protokol. Ak server vie, použi `ftps://` alebo `sftp://`, obyčajné `ftp://`
posiela heslo nešifrované.

## Stav

`.ftp.env` zatiaľ neexistuje a tag `deployed` tiež nie. Prvé nasadenie ide ako
`./deploy.sh --all` až po tom, čo operátor súbor založí.

## Čo skript nerieši

Ak niekto zmenil súbor priamo na serveri, upload ho prepíše. Zmena mimo gitu sa
nedá vrátiť, lebo ju git nepozná. Operátor sa rozhodol toto riziko prijať.
