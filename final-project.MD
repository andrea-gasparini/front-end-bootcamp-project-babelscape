# Final project
Salve a tutti! Ecco a voi il progetto finale del JS-Bootcamp.

Come già anticipatovi il progetto prevederà la realizzazione di una UI-Kit composta da diversi componenti di uso molto comune nell'ambiente Web. In particolare, i seguenti punti sono necessari per concludere il progetto:

* Design, stilizzazione (SCSS/CSS) e logica (TS/JS) di ogni componente descritto sotto
* Documentazione HTML, da produrre per ogni componente nello stile [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) 

Quest'ultima è necessaria per documentare casi d'uso (mostrando il plug-in in caso di configurazioni diverse) e, banalmente, a dare una overview sulle [options e i metodi esposti](https://getbootstrap.com/docs/4.3/components/modal/#options).

> **Imporante** Per questo progetto l'utilizzo di Typescript/SCSS è OBBLIGATORIO. Ovviamente, sarà possibile usare CSS e JS qualora necessario.

## Glossario del tipi 
Di seguito sono elencate classi o enum di valori utilizzati per descrivere i requirements del progetto.

### KeyValue
Un oggetto `JSON` composto da: 
```
{
    key: string,
    value: string
}
```

### State
Un enum che può assumere valore: `READY`, `DISABLED`, `ERROR`, `PENDING`

### Alert
Un enum che può assumere valore: `SUCCESS`, `WARNING`, `DANGER`, `INFO`

### DropdownType
Un enum che può assumere valore: `SINGLE`, `MULTI`

### ModalType
Un enum che può assumere valore: `DIALOG`, `CONFIRM`

## Componenti
Di seguito sono elencati i componenti da implementare. Ognuno di questi dovrà essere contenuto in una classe Typescript.
I requirements come sempre sono "elastici", cioè, sarete liberi di estendere opzioni di configurazione e metodi esposti qualora lo riteniate opportuno purchè sia documentato a sufficienza.

### Message
Il message è un componente molto semplice, che si occupa di mostrare un messaggio preso in input.

In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type     | Description |
| ---           | ---      | --- |
| message       | `string` | Il messaggio da mostrare |
| type          | `Alert`  | Di che tipo di messaggio si tratta |

### Button
Il button è un semplice bottone. Può contenere un testo, un icona oppure entrambi. Se specificati entrambi, l'icona si dovrà vedere alla sinistra del testo.

Il bottone può assumere vari stati:
- `READY`, lo stato non prevede alcun comportamento specifico
- `DISABLED`, lo stato non permette di eseguire click sul bottone perchè disabilitato
- `ERROR`, lo stato notifica una situazione di errore (magari cambiando colore di sfondo, colore del testo...), ma è comunque cliccabile
- `PENDING`, lo stato notifica che il bottone ha eseguito un operazione che non è stata completata; questo stato non permette di eseguire il click.

In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type              | Description |
| ---           | ---               | --- |
| text          | `string`          | Il testo da mostrare all'interno del bottone |
| icon          | `JQuery`          | L'icona da mostrare all'interno del bottone. Es. `<i class="fas fa-envelope"></i>` | 
| initialState  | `STATE`           | Lo stato iniziale del bottone |
| onClick       | `function<Event>` | Una funzione (callback) che viene invocata ogni qualvolta che l'utente clicca sul bottone. Attenzione al bottone quando è in uno stato dove non è permesso il click |

il plugin dovrà esporre i seguenti metodi:

| method    | arguments         | return            | description |
| ---       | ---               | ---               | --- |
| setState  | state: `STATE`    |                   | Il metodo serve a settare lo stato del button |
| getState  |                   | state: `STATE`    | Il metodo ritorna lo stato del bottone | 

### Dropdown
Il dropdown è un componente che permette la sezione di elementi da una lista predefinita. Può essere di due tipi: single-selection o multiple-selection.
Nel primo caso l'utente può selezionare al più un valore dalla lista dei valori forniti; nel secondo caso anche più di uno. 
Il plugin consiste di due componenti: label e body. 

Il label è la sezione sempre visibile che si occuperà di mantenere informazioni circa: 
- il placeholder, se nessun elemento del dropdown è stato ancora selezionato (Es. Linguaggi conosciuti)
- un testo con il valore/i selezionato/i separati dalla virgola (Es. Javascript, CSS, HTML, Java).

Il body invece è la sezione nascosta. E' un menu a tendina che viene mostrato/nascosto solo quando l'utente clicca sul componente label. 

Questo componente dovrà contenere:
- la lista dei valori disponibili sul quale l'utente effettuerà la selezione (Es. [Java, Python, C, C++])
- un checkbox per ogni valore mostrato che ne indica lo stato che può essere [checked, unchecked] 
- un input box di tipo text, per effettuare la ricerca veloce di un elemento nella lista.

In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type                                      | Description |
| ---           | ---                                       | --- |
| type          | `DropdownType`                            | Specifica il tipo del dropdown (single-selection o multi-selection) |
| data          | `Array<T>`                                | La lista dei valori da mostrare all'interno del dropdown. Il tipo generico T indica che è possibile passare qualsiasi tipo permesso da javascript. Es. `[{id: 1, nome:"Javascript", img: "http://myhost.com/javascript.png"}, {id: 2, nome:"Java", img: "http://myhost.com/java-icon.png"}, {id: 3, nome:"C++", img: "http://myhost.com/c-plus-plus.png"}]`|
| selected      | `Array<string>`                           | La lista dei valori selezionati di default | 
| dataMapper    | `function<T, KeyValue>`                   | Una funzione che mappa ogni elemento della lista in input, in un oggetto KeyValue. Es. considerando l'array di input di prima, `function(t){ return { key: t.id, value: t.nome }; }` |
| labelMapper   | `function<Array<KeyValue>, string>`       | Una funziona che mappa una lista di oggetti `KeyValue` (che rappresentano i valori selezionati nel dropdown) in una stringa rappresentativa mostrata all'utente. Es. `[{ key: 1, value: "Javascript" }, { key: 2, value: "Java" }] -> "Selected: Javascript, Java"` |
| onChange      | `function<Array<KeyValue>>`               | Una funzione (callback) che viene invocata ogni qualvolta che la selezione cambia. Es. `function(values){ console.log("Valori selezionati " + values.map(function(value){ return value.name; }).join(",")); }`|

il plugin dovrà esporre i seguenti metodi:

| method    | arguments                 | return                        | description |
| ---       | ---                       | ---                           | --- |
| setValues | values: `Array<string>`   |                               | Il metodo prende in input una lista di stringhe (gli id degli oggetti `KeyValue`) da selezionare |
| getValues |                           | values: `Array<KeyValue>`     | Il metodo ritorna la lista degli elementi selezionati |
| show      |                           |                               | Il metodo permetterà di visualizzare il body |
| hide      |                           |                               | Il metodo permetterà di nascondere il body |
| toggle    |                           |                               | Il metodo permetterà di nascondere il body, se già visibile; visualizzarlo, se nascosto |

### Toggle
Il toggle è un componente che permette di fare lo switch tra due valori. Tipico esempio è il bottoncino ON/OFF.
Il plugin consiste di un solo componente grafico che deve mostrare i due valori possibili (ON/OFF, SI/NO, white/black...), e quale di questi due è selezionato.

In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type                      | Description |
| ---           | ---                       | --- |
| value1        | `T`                       | Uno dei due valori. Es. `{ id: "on", label: "ON" }` |
| value2        | `T`                       | Uno dei due valori. Es. `{ id: "off", label: "OFF" }` |
| dataMapper    | `function<T, KeyValue>`   | Una funzione che mappa value1 e value2 in un oggetti KeyValue. Es. considerando gli esempi di prima, `function(v){ return { key: v.id, value: v.label }; }` |
| onChange      | `function<KeyValue>`      | Una funzione (callback) che viene invocata ogni qualvolta che la selezione cambia. Es. `function(v){ console.log("Valore selezionato " + v.value); }`|

il plugin dovrà esporre i seguenti metodi:

| method            | arguments | return    | description |
| ---               | ---       | ---       | --- |
| setFirstValue     |           |           | Il metodo seleziona il valore `value1` |
| setSecondValue    |           |           | Il metodo seleziona il valore `value2` |
| getValue          |           | `T`       | Il metodo ritorna il valore selezionato |

### Table
La table, anch'essa, è un componente molto semplice che visualizza una serie di dati presi in input in fase di creazione.
A differenza delle semplici tabelle, questo plugin permette di:
- ordinare le singole colonne in ordine alfabetico
- nell'ultima riga 
    - nella prima colonna dovrà contenere un messaggio `Totale righe %rowCount%`, dove `%rowCount%` è il totale delle righe (escluso l'header)
    - per ogni colonna `j` > 1, la somma dei valori delle singole righe (solo se di tipo numerico)
    
Esempio

| Nome      | Cognome   | Sesso | Figli a carico |
| ---       | ---       | ---   | --- |
| Mario     | Rossi     | M     | 2 |
| Roberto   | Bianchi   | M     | 0 |
| Giovanni  | Verdi     | M     | 4 |
| Maria     | Neri      | F     | 2 |
| Totale righe 4|       |       | 8 |

In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type                      | Description |
| ---           | ---                       | --- |
| data          | `Array<Array<T>>`         | La matrice dei dati da mostrare | 
| firstRowHeader| `boolean`                 | Se `true` la prima riga viene considerata header |

### Autocomplete
L'autocomplete è un componente che permette di mostrare dei suggerimenti per l'autocompletamento di una stringa. Es. scrivo all'interno di un input box `babel` l'autocompleter mostrerà `[babelscape, babelnet, babelfy, babel-bootcamp]`.
E' molto simile al `dropdown`; il plugin è composto da due componenti: input box e il body.

Sull'input box non c'è molto da dire. Un campo dove l'utente può inserire una stringa di testo.

Il body invece, è la sezione che mostrerà i suggerimenti. E' nascosto finchè dei suggerimenti risulteranno disponibili al plugin. 
Es. l'utente digita `dsjfhdsfd` probabilmente non esisteranno suggerimenti, quindi il componente non verrà visualizzato.
Nel caso in cui ci fossero suggerimenti da mostrare, il componente verrà visualizzato; se l'utente clicca su uno di questi risultati, la stringa corrispondente verrà sostituita all'interno dell'input box.
Es. scrivo all'interno di un input box `babel` l'autocompleter mostrerà `[babelscape, babelnet, babelfy, babel-bootcamp]`, clicco su `babel-bootcamp` la stringa `babel-bootcamp` verrà sostituita a `babel` all'interno dell'input box e il body verrà nascosto.


In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type      | Description |
| ---           | ---       | --- |
| placeholder   | `string`  | Il messaggio mostrato nell'input box quando nessuna stringa di testo è stata ancora inserita |
| restURL       | `URL`     | L'indirizzo del servizio web che, data una stringa come parametro in input, restituisce la lista delle parole più simili |
| minTextLength | `number`  | Il minimo numero di caratteri per permettere al plugin di effettuare una richiesta al servizio web. Es. `minTextLength=5`, `babe` non parte alcuna richiesta, `babel` la richiesta viene inviata al server. |

> Cos'è un REST API URL?

Non è niente altro che un indirizzo Web utilizzato per richiedere ad un server la risposta di un qualche particolare servizio. 
Es. `https://openweathermap.org/data/2.5/find?q=roma&type=like&sort=population&cnt=30&appid=b6907d289e10d714a6e88b30761fae22&_=1564491143959` è un REST API URL per un servizio Web che ritorna delle informazioni circa il meteo di Roma.
Per questo progetto troverete un file `server.jar` che dovrete lanciare da console mediante il comando `java -jar server.jar`; lanciando il jar avrete in locale un servizio per l'autosuggerimento di stringhe. Da questo momento il servizio di autocomplete sarà accessibile mediante l'URL `http://localhost:30000/autocomplete?word=<LA_TUA_PAROLA_DA AUTOCOMPLETARE>`. Per poter chiamare questo servizio sarà necessario utilizzare il metodo `ajax()` di [jQuery](https://api.jquery.com/jquery.ajax/).

### Modal
La modal è un componente che permette di mostrare una finestra in rilievo, per evidenziare particolari condizioni in cui si trova la UI in quel momento. Es. l'utente sta cancellando un prodotto dal proprio carrello, l'UI mostrerà un finestra dove chiede di confermare l'eliminazione.

Il box che verrà mostrato dovrà apparire sopra l'intera interfaccia, quindi non dovrà essere possibile cliccare sugli elementi della pagina finchè non verrà chiusa. Potrà essere di due tipi: dialog oppure confirmation.
Nel primo caso verrà mostrato solamente un messaggio; nel secondo verrà chiesto all'utente di confermare oppure annullare un operazione (vedi esempio del prodotto nel carrello).

Il plugin è composto da 2 sezioni:
- header, il titolo della modal
- body, il corpo centrale

In fase di instanziazione il plugin dovrà accettare una configurazione che preveda:

| parameter     | type                  | Description |
| ---           | ---                   | --- |
| type          | `ModalType`           | Il tipo di modal che verrà visualizzata |
| header        | `string` / `JQuery`   | L'header della modal |
| body          | `string` / `JQuery`   | Il body della modal |
| onConfirm     | `function`            | Una funzione (callback) invocata solamente nel caso in cui la modal sia di tipo `CONFIRM` e l'utente ha confermato l'operazione. Es. `function(){ console.log("conferma!"); }`|

il plugin dovrà esporre i seguenti metodi:

| method            | arguments | return    | description |
| ---               | ---       | ---       | --- |
| dispose           |           |           | Il metodo rimuoverà la modal dal `DOM` |

## Setup & Compilazione
Di seguito sono elencati i tool per il setup del progetto e la sua compilazione.

### Webpack & NPM
> Webpack viene definito dai suoi stessi sviluppatori come uno static module bundler per applicazioni JavaScript. Il suo scopo è quindi quello di creare un pacchetto di assets utilizzabile direttamente nel browser a partire da un insieme di file sorgenti strutturati su diversi file e con schemi di dipendenze complessi. (Continuate a leggere [qui](https://www.html.it/articoli/webpack-il-module-bundler-per-javascript/))

[NPM](https://www.npmjs.com/get-npm) sta per Node Package Manager ed è un tool oggi essenziale per lo sviluppo Web. Vi permette di gestire dipendenze, configurazioni e task da lanciare del vostro progetto. Una volta creato mediante `npm init` potrete procedere all'installazione di tutte le vostre dipendenze... 

Non vi preoccupate! Abbiamo previsto un basic setup del progetto per voi al fine di facilitarvi il lavoro durante lo svolgimento del progetto. Per lanciare l'installazione di tutte le dipendenze che abbiamo preparato (es. Typescript, SCSS, webpack) vi basterà entrare nella directory del progetto e lanciare il comando `npm install` dove risiede il file `packages.json`.

Una volta finito il processo di setup, avrete a disposizione i seguenti npm tasks:

* `npm run start` il quale vi faciliterà lo sviluppo fornendovi un piccolo server HTTP tramite il quale verrà visualizzato quello a cui state lavorando
* `npm run dist` il quale vi permetterà di produrre una build da distribuire in produzione contenuta nella cartella `dist`
* `npm run create-plugin <plugin-name>` il quale creerà per voi lo scheletro del package di un nuovo plug-in che intendete sviluppare nella cartella src. Es. `npm run create-plugin autocomplete` questo creerà la directory `src/autocomplete` con i file .ts/.scss pronti per essere editati. Per una questione di ordine e manutenibilità del codice, cercate di mantenere sempre lo standard dei file generato dal suddetto script.

### Sviluppo di un plug-in
Per far si che voi entriate nell'ottica di come organizzare e scrivere il codice dei vari plug-in, ne abbiamo creato uno d'esempio dal nome "logo". Esso non fa altro che aggiungere il logo di [Babelscape](http://babelscape.com) alla vostra pagina.
In genere, tenete a mente che tramite il `main.ts` potrete esporre metodi pubblici (utiizzando l'oggetto `methods`) e definire come la vostra libreria potrà essere chiamata da jQuery una volta compilato il progetto... Date un'occhiata al file main.ts!

Ricapitolando, non dovrete inserire dipendenze note come jQuery o Font Awesome in quanto sono gestite da webpack/npm e saranno già riportate nella pagina `index.html`. Ovviamente, qualora doveste avere il bisogno di lavorare con altre dipendenze esterne, potrete installarle usando `npm install <nome-package>` e successivamente importare nella pagina HTML la nuova libreria.

### Font Awesome
Abbiamo incluso [questa libreria](https://fontawesome.com/) per facilitare l'inserimento delle icone nel vostro progetto. Non dovrete fare altro che visitare il sito web ufficiale, scegliere le vostre icone e inserirle nella vostra pagina (o plug-in), in questo modo:

```html
<i class="fas fa-ad"></i>
```

## Come consegnare
Stavolta la consegna sarà fatta tramite GitHub. Nessuno zip questa volta... ci servirà solamente l'URL del vostro repository. Ricordatevi di creare un nuovo repository sul vostro profilo [usando questa modalità](https://help.github.com/en/articles/adding-an-existing-project-to-github-using-the-command-line).

Ad ogni modo, GitHub vi aiuterà nel processo mostrandovi i comandi necessari per creare un nuovo repo a partire da uno già esistente:

```bash
git remote add origin https://github.com/fabriziobrignone/babelscape-bootcamp-ui-kit.git
git push -u origin master
```