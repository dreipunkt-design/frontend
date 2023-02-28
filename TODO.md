# TODO drepunkt Website

## Allgemeines

* Button 'MEHR ERFAHREN'
Bei hover funktioniert die underline-Animation nicht.

* Layout.js
Die Anweisung
ScrollTrigger.getAll().forEach(t => t.kill());
löscht alle ScrollTrigger. Eventuell müssen die Timelines
auch gelöscht werden. Prüfen!

* Transition Project-Detail => Home
Ist die Project-Detail-Seite nicht an der Position Top, dann
ist die Transition-Animation fehlerhaft. Kurzes scrollen.
Vermutlich wird das Headerbild gelöscht und der weitere 
Inhalt rutscht etwas nach oben. Eine Maske Position absolut 
über Gesamten Inhalt.

## mobile Version

* globals.scss  
Für die mobile Version müssen die Einstellungen
overscroll-behavior-y: none;
overflow: hidden;
deaktiviert werden.

* Transition Home-Teaser => Project-Detail
Animation bei Page-Transition Teaser to Project-Detail
funktioniert nicht.

.env.development
NEXT_PUBLIC_STRAPI_API_URL = http://localhost:1337
NEXT_PUBLIC_MEDIA_API_URL = http://dreipunkt.agentur-dreipunkt.de


