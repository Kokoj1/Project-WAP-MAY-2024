## → → PROJEKT SI STÁHNĚTE NA PLOCHU ← ←

Jak projekt spustit:

Otevřte si 2 příkázové řádky, jeden bude sloužit jako klient a druhý jako server.

Poté do jednoho napište následující příkaz:
```batch
cd "C:\Users\%USERNAME%\Desktop\Project-WAP-MAY-2024\client" && npm run dev
```
A do druhého tento:
```batch
cd "C:\Users\%USERNAME%\Desktop\Project-WAP-MAY-2024\server" && npm start
```
Pokuď příkaz výše vyhodí chybu tak to nevadí jenom to znamená že nemáte nainstalovaný nodemon, proto použite tento příkaz:
```batch
cd "C:\Users\%USERNAME%\Desktop\Project-WAP-MAY-2024\server" && node app.js
```
