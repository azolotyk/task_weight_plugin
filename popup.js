// Формула расчёта оценки для задач техдолга
function techdebtMeasurement() {
    let tabs_indexes = ['1', '2', '3', '4', '5', '6'];
    tabs_indexes.forEach((id) => {
        let panel = document.getElementById('panel-' + id);
        let innovation = +panel.querySelector('input[name="innovation"]:checked').value;
        let risk = +panel.querySelector('input[name="risk"]:checked').value;
        let level = +panel.querySelector('input[name="level"]:checked').value;
        document.getElementById("total-" + id).innerHTML = Math.round(((innovation + risk) / level) * 10)
    })
}

const techdebt_total = document.querySelectorAll('[data-action="measurement"]');
techdebt_total.forEach((element) => {
    element.addEventListener('change', window.techdebtMeasurement)
});

// Формула расчёта оценки для багов
function bugMeasurement() {
    let panel = document.getElementById('panel-0');
    let mass = +panel.querySelector('input[name="mass"]:checked').value;
    let block = +panel.querySelector('input[name="block"]:checked').value;
    let critical = +panel.querySelector('input[name="critical"]:checked').value;
    document.getElementById("total-0").innerHTML = mass * block * critical
}

const bug_total = document.querySelectorAll('[data-action="bug_weight"]');
bug_total.forEach((element) => {
    element.addEventListener('change', window.bugMeasurement)
});


// Определяем id выбранного таба
function getCurrentId() {
    // Ищем все элементы с классом panel
    const panels = document.querySelectorAll('.panel');

    // Перебираем найденные элементы
    for (const panel of panels) {
        // Проверяем, является ли его display равным 'block'
        if (getComputedStyle(panel).display === 'block') {
            return panel.getAttribute('id').split('-')[1];
        }
    }
}

// Собираем текст из выбранных опций
function getSelectedOptions() {
    let panel_id = window.getCurrentId();

    let final_text = [];

    final_text.push('Категория — ' + document.getElementById('tab-' + panel_id).textContent)

    let criterias_type = panel_id === '0' ? ["mass", "block", "critical"] : ["innovation", "risk", "level"]

    let panel = document.getElementById('panel-' + panel_id);
    let criterias = panel.querySelectorAll("[class='panel-subtitle']")
    criterias.forEach((criteria, key) => {
        let selected_id = panel.querySelector('input[name="' + criterias_type[key] + '"]:checked').id;
        let value = panel.querySelector('label[for="' + selected_id +'"]').innerHTML;
        final_text.push(criteria.textContent + ' ' + value)
    })

    final_text.push('Итоговая оценка: ' + document.getElementById('total-' + panel_id).textContent)
    return final_text
}

// Копируем итоговый текст в буфер обмена
function copyResultsToClipboard() {
    let final_text = getSelectedOptions()

    let area = document.createElement('textarea');
    document.body.appendChild(area);
    area.value = final_text.join('\n');
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
}

const copyElement = document.querySelectorAll('[data-action="copyElement"]');
copyElement.forEach((element) => {
    element.addEventListener('click', window.copyResultsToClipboard)
});
