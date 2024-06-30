document.querySelectorAll('#toggle-aside-menu').forEach(button => {
    button.addEventListener('click', function() {
        var aside = document.querySelector('aside');
        var labels = document.querySelectorAll('.icon-label');
        if (aside.classList.contains('expanded')) {
            aside.style.width = '10%';
            aside.classList.remove('expanded');
            labels.forEach(label => {
                label.style.maxWidth = '0px';
            });
        } else {
            aside.style.width = '20%';
            aside.classList.add('expanded');
            setTimeout(function() {
                labels.forEach(label => {
                    label.style.maxWidth = '100px';
                });
            },0);
        }
    });
});