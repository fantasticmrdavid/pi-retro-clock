$(function(){
    const $arrows = $('.arrows');
    const symbols = $arrows.text().split('');
    $arrows.empty();
    symbols.forEach(sym => $arrows.append(`<span>${sym}</span>`));

    // cycle .active every 0.5s
    const $spans = $arrows.children('span');
    let idx = 0;
    setInterval(() => {
        $spans.removeClass('active').eq(idx).addClass('active');
        idx = (idx + 1) % $spans.length;
    }, 500);

    const loadTime = moment();

    function updateClockInfo() {
        // weekday
        const dayAbbrev = moment().format('ddd');
        document.querySelector('.weekday').textContent = dayAbbrev;

        // date
        const formattedDate = moment().format('DD/MM');
        document.querySelector('.date').textContent = formattedDate;

        // 12 h AM/PM
        const ampm = moment().format('A');
        document.querySelector('.ampm').textContent = ampm;

        // current time in 12-hour format
        const time12hr = moment().format('hh:mm');
        document.querySelector('#clock .digits').textContent = time12hr;

        // elapsed counter since page load with clamp
        const elapsed = moment.duration(moment().diff(loadTime));
        const rawH = Math.floor(elapsed.asHours());
        const rawM = elapsed.minutes();
        const rawS = elapsed.seconds();

        const h = rawH > 99 ? 99 : rawH;
        const m = rawM > 99 ? 99 : rawM;
        const s = rawS > 99 ? 99 : rawS;

        document.querySelector('.countHours').textContent   = String(h).padStart(2, '0');
        document.querySelector('.countMinutes').textContent = String(m).padStart(2, '0');
        document.querySelector('.countSeconds').textContent = String(s).padStart(2, '0');

        if (rawH >= 99) {
            clearInterval(timer);
        }
    }

    // initial render
    updateClockInfo();

    // refresh every second
    setInterval(updateClockInfo, 1000);
});