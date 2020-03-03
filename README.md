# Progetto finale Bootcamp Front-End Babelscape

Le specifiche del progetto sono consultabili nel file [final-project.MD](./final-project.MD).

La documentazione è consultabile tramite un piccolo server HTTP che viene avviato eseguendo `loadDocumentation.sh` dalla directory _documentation_.

Lo script si occupa di generare i file - _up to date_ - necessari per istanziare i componenti di esempio presenti nelle pagine di documentazione e di avviare il server sulla porta 1337. Una volta eseguito, la documentazione sarà quindi disponibile all'indirizzo [localhost:1337](http://localhost:1337).

```bash
cd documentation && ./loadDocumentation.sh
```

## Dipendenze

- Per avviare correttamente il server relativo alla documentazione è necessario che `python3` sia installato.

- Per il corretto funzionamento del componente _Autocomplete_ è necessario eseguire `java -jar server.jar`, che avvia localmente un server per il suggerimento di stringhe, e abilitare il **CORS** ([qui un'estensione per Firefox](https://addons.mozilla.org/it/firefox/addon/cors-everywhere/)).

- Per la corretta installazione di tutte le dipendenze è necessario eseguire `npm install` nella root del progetto (dove si trova`packages.json`).
