function HighlightedText({text}) {
  // Aufteilen des Textes an den '#' Zeichen
  const parts = text.split('##');
  
  // Durchlaufen der Teile und hervorheben des markierten Teils
  const highlightedText = parts.map((part, index) => {
    if (index % 2 === 1) { // ungerade Indizes entsprechen markierten Teilen
      return <span key={index} className='highlighted-text'>{part}</span>;
    } else {
      return part;
    }
  });

  return highlightedText;
}

export default HighlightedText;