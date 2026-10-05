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

`./deploy.sh`, prípadne s `--dry` na výpis zoznamu, `--all` na prvé nasadenie alebo
`--only cesta` na nahratie jediného súboru.
Skript používa `curl`, ktorý je súčasťou macOS. Nepotrebuje `lftp` ani nič iné.

Skript odmietne bežať, ak pracovný strom nie je čistý alebo `HEAD` nie je na `origin/main`.
Nahrá súbory zmenené od lokálneho tagu `deployed`, nič nemaže okrem vlastného dočasného súboru pri chybe, a po úspechu tag
posunie na nasadený commit. Do nasadenia nepatria `CLAUDE.md`, `DECISIONS.md`,
`deploy.sh`, `.gitignore` a `docs/`.

Upload na ostrý server agent spúšťa len na pokyn operátora. Pred ním ukáže výstup
`./deploy.sh --dry`.

## Formát `.ftp.env`

Súbor založil agent, je v `.gitignore` a agent ho nevypisuje ani nekopíruje. Heslo
do neho dopísal operátor sám, aby ostalo mimo prepisu relácie.

Súbor má mať práva `600`.

```
FTP_URL=ftp://host/web/
FTP_USER=...
FTP_PASS=...
SITE_URL=https://adresa-webu/
```

`FTP_URL` musí začínať na `ftp://` a končiť na `/web/`, inak `deploy.sh` odmietne bežať.
TLS si skript vynúti sám cez `--ssl-reqd` a bez TLS sa nepripojí. `SITE_URL` je nepovinná
a slúži na kontrolu stavového kódu po uploade.

## Server

Hosting je Websupport. Doména `gavalier.sk` ukazuje na `37.9.175.156`, čo je
`ing.r2.websupport.sk`. Overené 2026-10-05.

- Pripájame sa na `ing.r2.websupport.sk`, nie na `gavalier.sk`. Certifikát FTP servera
  je `*.r2.websupport.sk`, takže na `gavalier.sk` overenie certifikátu zlyhá.
- Explicitné FTPS na porte 21 funguje, handshake s overeným certifikátom prešiel.
- Port 22 odpovedá ako SFTP, ale `curl` v macOS nemá podporu `sftp`, preto SFTP nepoužívame.
- Používateľ je `gavo.gavalier.sk`.

## Chyba 450 pri uploade, príčina a oprava

Prvé nasadenie 2026-10-05 skončilo na `assets/clients/elmino.png` chybou
`450 Transfer aborted. Link to file server lost`. Server súbor pred chybou založil s 0 bajtami
a živé logo sa rozbilo. Agent najprv bez overenia tvrdil, že server odmieta obsah súboru.
To nebola pravda. Overenie, ktoré chýbalo, bolo `curl -v` s čítaním celej odpovede servera
a skúšobný upload náhodných dát pod novým menom.

Príčina súvisí s TLS 1.3, presný mechanizmus overený nie je. Zlyhal aj beh
s `--ssl-control`, pri ktorom `curl` dátový kanál nešifruje, takže samotné šifrovanie
dátového kanála príčinou nie je. Namerané výsledky na 57 kB súbore.

- TLS 1.3 s EPSV, s PASV, s obmedzenou rýchlosťou, s `--ssl-control` aj s `APPE` zlyhalo v každom pokuse.
  Súbory od 150 kB vyššie prechádzali, súbory od 20 do 100 kB väčšinou nie.
- TLS 1.2 prešlo vo všetkých 14 pokusoch pre veľkosti od 1 kB po 100 kB.

Oprava je v `deploy.sh`. Skript vynúti `--tlsv1.2 --tls-max 1.2`, nahráva pod dočasným menom
`<súbor>.deploy_tmp`, overí veľkosť cez `SIZE` a až potom premenuje na cieľ. Pri chybe zmaže
len vlastný dočasný súbor a živý súbor sa nezmení. Pri zlyhaní skript skončí s chybou a tag
`deployed` sa neposunie.

Pri každom novom postupe proti serveru najprv `./deploy.sh --all --only <jeden súbor>`
a hromadný beh až po úspešnej skúške.

## Stav

`.ftp.env` je kompletný a prihlásenie funguje. Koreň webu je `web/` v domovskom adresári
FTP účtu, čiže `FTP_URL=ftp://ing.r2.websupport.sk/web/`. `SITE_URL` je
`https://www.gavalier.sk/`, lebo `gavalier.sk` presmeruje na `www`.

Prvé nasadenie prebehlo 2026-10-05, tag `deployed` je na `752bd50`. Všetkých 79 súborov
na živom webe má rovnaký odtlačok SHA-256 ako v gite. Ďalšie nasadenia idú ako `./deploy.sh`.

Na serveri ležia veci, ktoré nie sú v gite, a skript sa ich nedotkne, lebo nahráva len
súbory z gitu.

- `web/.htaccess` patrí serveru a v repozitári nie je.
- `sub/` vedľa `web/` obsahuje iné weby, napríklad `forestshop`, `baofeng`, `cp`, `cdn`.
  Operátor rozhodol, že tento projekt nasadzuje len do `web/` a ostatné adresáre sú mimo
  zadania. `deploy.sh` odmietne bežať, ak `FTP_URL` nekončí na `/web/`.
- `logs/` patrí serveru.

## Čo skript nerieši

Ak niekto zmenil súbor priamo na serveri, upload ho prepíše. Zmena mimo gitu sa
nedá vrátiť, lebo ju git nepozná. Operátor sa rozhodol toto riziko prijať.
