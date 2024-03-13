document.addEventListener('DOMContentLoaded', function() {
    const btnBuscar = document.getElementById('btnBuscar');
    const btnLimpar = document.getElementById('btnLimpar');
    const inputCountry = document.getElementById('inputCountry');
    const feriadosElement = document.getElementById('feriados');

    btnBuscar.addEventListener('click', function(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário
        const countryCode = inputCountry.value.trim().toUpperCase(); // Garante que o código do país esteja em maiúsculas

        if (countryCode) {
            fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`)
                .then(response => response.json())
                .then(data => {
                    displayHolidays(data);
                })
                .catch(error => {
                    console.error('Erro ao buscar os feriados:', error);
                    feriadosElement.innerHTML = 'Não foi possível buscar os feriados. Verifique o código do país e tente novamente.';
                });
        } else {
            alert('Por favor, insira o código do país.');
        }
    });

    btnLimpar.addEventListener('click', function() {
        inputCountry.value = ''; // Limpa o input
        feriadosElement.innerHTML = 'Feriados'; // Reseta o texto padrão
    });

    function displayHolidays(holidays) {
        let htmlContent = '<ul>';
        if (holidays && holidays.length > 0) {
            holidays.forEach(holiday => {
                htmlContent += `<li>${holiday.date}: ${holiday.localName}</li>`;
            });
        } else {
            htmlContent = 'Não foram encontrados feriados para este país ou o código do país é inválido.';
        }
        htmlContent += '</ul>';
        feriadosElement.innerHTML = htmlContent;
    }
});

