# anime-schedule-plan (ASP)

![Logo](/frontend/public/logo.svg)

Ein Projekt zum Erstellen und Verwalten von Filmen und Serien und zum Erstellen und Verwalten von Plänen, um diese anzuschauen.

## Bilder der Applikation

Im Nachfolgenden sind Bilder des aktuellen Frontend-Standes zu sehen.

### Abbildung 1: Startseite

![Abbildung 1: Startseite (Bild)](/pictures/ASP_Startseite.png)

### Abbildung 2: Loginseite

![Abbildung 2: Loginseite (Bild)](/pictures/ASP_Login.png)

### Abbildung 3: Registrierungsseite

![Abbildung 3: Registrierungsseite (Bild)](/pictures/ASP_Registrierung.png)

## Allgemeines

Für die Nutzung der App ist eine Registrierung erforderlich. Die Lizenz zur Nutzung dieser Applikation befindet sich ebenfalls in diesem Repository.

Dieses Projekt dient für private Nutzer zum Erstellen von Plänen ihrer Serien und Filme. Dabei können Nutzer eintragen, an welchen Wochentagen sie ihre Serien schauen, z. B. beim Schauen von Simulcast-Anime, welche einem solchen Release-Zyklus folgen. Zudem können Nutzer eigene Pläne anlegen, wenn sie z. B. ältere Serien nachholen.

Nutzer können dabei für jede Folge einer Serie bzw. für einen Film eintragen, wann der geplante Release-Zeitpunkt für den Film bzw. die Episode war und wann sie diese tatsächlich geschaut haben. Somit können Nutzer Abweichungen in ihrem Schauverhalten in Bezug zum tatsächlichen Ausstrahlungstermin nachverfolgen.
Ein weiteres Feature der App ist die Darstellung der Filme bzw. Serien in einem Kalender, um eine bessere Übersicht über geschaute Filme und Serien zu erhalten. Alles ist dabei individuell anpassbar.

Ein weiteres Feature ist zudem das automatisierte Setzen von Serien, ob diese komplett geschaut wurden. Für Serien erstellen Nutzer Staffeln und können zu den Staffeln wiederum Episoden hinzufügen. Hierbei müssen Nutzer für jede Episode angeben, ob sie diese bereits geschaut haben. Intern ermittelt dann die App, ob alle Episoden einer Staffel geschaut wurden. Nur dann wird eine Staffel als "komplett geschaut" markiert. Analog geschieht dies mit den Staffeln für die Serie. Eine Serie wird also nur dann als "komplett geschaut" markiert, wenn alle Staffeln der Serie als "komplett geschaut" markiert sind. Der Vorteil ist hier, dass Nutzer keine Episoden "vergessen" können. Wenn eine Serie oder eine Staffel also nicht als "komplett geschaut" markiert sind, so weiß der Nutzer, dass es mindestens eine Episode gibt, die er/ sie noch nicht geschaut hat. Wenn Nutzer wiederum eine neue Staffel hinzufügen, so wird die Serie als "nicht komplett geschaut" markiert (analog ist dies ebenso der Fall, wenn zu einer Staffel eine neue Episode hinzugefügt wird).

## Funktionen der App als Übersicht

### Nutzer

-   Registrieren innerhalb der App mit:
    -   Nutzername (muss in der App einzigartig sein)
    -   Passwort
    -   Informationen zur weiteren Authentifizierung (diese müssen nur in bestimmten Fällen angegeben werden, z. B. bei Änderung des Passwortes):
        -   eine selbst gewählte Frage aus einem durch die App vorgegebenen Fragenpool
        -   eine Antwort (diese wird wie das Passwort gehasht)

### Serien/ Filme

Eine Serie ist wie folgt aufgebaut:
Serie > Staffel(n) > Episode(n)

-   Anlegen neuer Filme, Serien, Staffeln und Episoden
-   Bearbeiten bestehender Filme, Serien, Staffeln und Episoden
-   Löschen bestender Filme, Serien, Staffeln und Episoden
    -   bei Löschen des Films wird der Film gelöscht
    -   bei Löschen einer Episode wird die Episode gelöscht und es werden die zugehörige Staffel und Serie hinsichtlich des "komplett geschaut"-Zustandes überprüft und ggf. automatisiert angepasst
    -   bei Löschen einer Staffel wird die Staffel und alle ihr zugehörigen Episoden gelöscht und es erfolgt eine Prüfung des "komplett geschaut"-Zustandes der Serie und ggf. eine automatisierte Anpassung
    -   bei Löschen einer Serie werden alle zugehörigen Staffeln und Episoden gelöscht

### Authentifizierung des Nutzers

Registrierte Nutzer erhalten beim Login einen "JSON Web Token" (JWT), mit welchem sie sich authentifizieren können. Dabei können alle Funktionen der App bis auf die Registrierung eines neuen Accounts und den Login in einen bestehenden Account nur mit einem gültigen JWT durchgeführt werden.

## Genutzte Technologien

Im Nachfolgenden werden kurz die für das Projekt genutzten Technologien vorgestellt.

### Frontend: Angular mit "Server-Side-Rendering" (SSR)

Angular ist ein Frontend-Web-Framework von Google und ist für große und komplexe Enterprise-Applikationen designt und entwickelt worden. Es nutzt erzeugt eine "Single Page Application" (SPA) und nutzt eine Komponentenhierarchie. Entwickler können damit die App in wiederverwendbare Komponenten unterteilen. Vorteile sind u. a. die Nutzung wiederverwendbarer Komponenten, "Dependency Injection", "Guards" und SSR für ein schnelleres Laden und eine Verbesserung für "Search Engine Optimization" (SEO).

Der Entwicklungsserver kann bei Installation der entsprechenden Angular CLI wie folgt gestartet werden:

```bash
cd .\frontend\
ng serve -o
```

Der Server wird dann auf Port 4200 gestartet (vollständige Adresse: http://localhost:4200/).

#### Frontend-Komponentenbibliothek: PrimeNG

Zur Erstellung der Frontend-Komponenten innerhalb des Webinterfaces wird PrimeNG in der aktuellen Version 20 (genaue Version ist in der package.json im Frontend zu finden) verwendet. Diese werden dabei mit entsprechendem CSS angepasst. Für weitere Informationen kann die [offizielle Dokumentation](https://primeng.org/) genutzt werden.

### Backend: NodeJS Express mit TypeScript (TS)

Der Express-Server in NodeJS lässt Entwickler einfach einen skalierbaren Server mit selbst definierten Endpunkten aufbauen. TypeScript dient hier für die Entwicklung als eine sehr gute Überprüfung hinsichtlich Typen und Interfaces und fängt dabei viele Fehler ab. Weitere Funktionen wie die Implementierung einer Middleware können dabei sehr gut realisiert werden. Durch die Nutzung von "Node Package Manager" (npm)-Paketen können viele Funktionen (wie z. B. die Anbindung verschiedenster Datenbanken) realisiert werden.

Der Entwicklungsserver kann bei Installation von NodeJS und der entsprechenden Pakete wie folgt gestartet werden:

```bash
cd .\backend\
npm run dev
```

Der Server wird dann auf Port 3000 (oder bei Angabe in der .env-Datei) auf einem definierten Port gestartet (vollständige Adresse: http://localhost:3000/api/).

### Datenbank: MongoDB

MongoDB ist eine "NoSQL"-Datenbank und kann Objekte beliebiger Struktur speichern. Damit ist es auch für semi-strukturierte Daten geeignet. Durch die Nutzung von Indizes und anderen Funktionen können Daten damit schnell durchsucht werden. Daten werden als binäre JSON-Dokumente gespeichet, wodurch sich das JSON-Format nativ nutzen lässt. Ein weiterer Vorteil ist die hohe Skalierbarkeit und damit die Möglichkeit für z. B. Georedundanz. Für die lokale Installation wird der offizielle MongoDB Compass der offiziellen Webseite (mit integrierter GUI) empfohlen.

## Architektur im Frontend

Im Frontend dieser Applikation wird eine Version der Angular Clean Architecture (Domain Driven Architecture) verwendet. Im `core`-Ordner sind dabei die formalen Definitionen der Interfaces und Use Cases der Services (formal Repositories) zu finden sowie generelle Modelle der Anwendung.

Die Implementierung der Use Cases und Repositories erfolgt dann im `infrastructure`-Ordner, in welchem die Repositories als Services implementiert werden.

Im `presentation`-Ordner sind alle Komponenten für das User Interface im Browser beinhaltet.

Die Provider für die Use Cases sind in der `app.providers.ts` zu finden.