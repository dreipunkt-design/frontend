# TODO drepunkt Website

## Allgemeines

* Button 'MEHR ERFAHREN'
Bei hover funktioniert die underline-Animation nicht.

* Layout.js
Die Anweisung
ScrollTrigger.getAll().forEach(t => t.kill());
löscht alle ScrollTrigger. Eventuell müssen die Timelines
auch gelöscht werden. Prüfen!
Ein weitere Lösungsansatz ist es mit dem gsap context zu arbeiten. 
Dieser räumt nach dem Remove der Komponente auf.

* Animationen laufen nicht immer. Eventuell könnte ein ScrollTrigger refresh helfen!
# Erledigt! 
# Im Layout ResizeOberver eingebaut. Bei jeder resize des LayoutContainerss wird die Funktion ScrollTrigger.refresh() aufgerufen.

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


