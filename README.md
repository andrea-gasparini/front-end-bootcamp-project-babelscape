# Progetto finale Bootcamp Front-End Babelscape

La documentazione è consultabile tramite un piccolo server HTTP che viene avviato eseguendo `loadDocumentation.sh` dalla directory _documentation_. Per avviare correttamente il server è necessario che `python3` sia installato.

Lo script si occupa di generare i file - _up to date_ - necessari per istanziare i componenti di esempio presenti nelle pagine di documentazione e di avviare il server sulla porta 1337. Una volta eseguito, la documentazione sarà quindi disponibile all'indirizzo [localhost:1337](http://localhost:1337).

```bash
cd documentation && ./loadDocumentation.sh
```

Per il corretto funzionamento del componente _Autocomplete_ è necessario eseguire `java -jar server.jar`, che avvia localmente un server per il suggerimento di stringhe, e abilitare il **CORS** ([Estensione per Firefox](https://addons.mozilla.org/it/firefox/addon/cors-everywhere/)).

Per la corretta installazione di tutte le dipendenze è necessario eseguire `npm install` nella root del progetto (dove si trova`packages.json`).
