document.addEventListener('DOMContentLoaded', function() {
    const html = document.documentElement;
    const fontSize = parseInt(getComputedStyle(html).fontSize);
    const minFontSize = fontSize * 0.5;
    const maxFontSize = fontSize * 3;
    let currentFontSize = fontSize;
    
    document.getElementById('font-increase').addEventListener('click', function() {
        if (currentFontSize < maxFontSize) {
            currentFontSize += 2;
            html.style.fontSize = currentFontSize + 'px';
        }
    });
    
    document.getElementById('font-decrease').addEventListener('click', function() {
        if (currentFontSize > minFontSize) {
            currentFontSize -= 2;
            html.style.fontSize = currentFontSize + 'px';
        }
    });
    
    document.getElementById('font-reset').addEventListener('click', function() {
        currentFontSize = fontSize;
        html.style.fontSize = '';
    });
    
    const darkModeToggle = document.getElementById('toggle-dark');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    document.getElementById('toggle-contrast').addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    });
    
    document.getElementById('toggle-dyslexia').addEventListener('click', function() {
        document.body.classList.toggle('dyslexia-mode');
        localStorage.setItem('dyslexiaMode', document.body.classList.contains('dyslexia-mode'));
    });

    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    if (localStorage.getItem('dyslexiaMode') === 'true') {
        document.body.classList.add('dyslexia-mode');
    }

    document.getElementById('daltonismo-selector').addEventListener('change', function(e) {
        document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
        if (e.target.value !== 'none') {
            document.body.classList.add(e.target.value);
        }
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    document.getElementById('toggle-images').addEventListener('click', function() {
        document.body.classList.toggle('hidden-images');
        localStorage.setItem('imagesHidden', document.body.classList.contains('hidden-images'));
    });

    document.getElementById('toggle-links').addEventListener('click', function() {
        document.body.classList.toggle('highlight-links');
        localStorage.setItem('linksHighlighted', document.body.classList.contains('highlight-links'));
    });

    document.getElementById('font-selector').addEventListener('change', function(e) {
        document.body.style.fontFamily = e.target.value;
        localStorage.setItem('selectedFont', e.target.value);
    });

    if (localStorage.getItem('imagesHidden') === 'true') {
        document.body.classList.add('hidden-images');
    }

    if (localStorage.getItem('linksHighlighted') === 'true') {
        document.body.classList.add('highlight-links');
    }

    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
        document.getElementById('font-selector').value = savedFont;
    }
});