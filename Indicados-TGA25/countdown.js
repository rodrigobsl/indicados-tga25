document.addEventListener('DOMContentLoaded', () => {

    // Data e hora do evento
    const targetDate = new Date('2025-12-11T21:30:00').getTime();

    const countdownElement = document.getElementById('countdown');

    if (!countdownElement) return;

    const interval = setInterval(() => {
        const now = new Date().getTime();

        const distance = targetDate - now;
        // Mensagem ao fim do countdown
        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "O The Game Awards já começou!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Adicionar um zero à esquerda se o número for menor que 10
        const format = (num) => String(num).padStart(2, '0');

        // Exibe o resultado no elemento com id="countdown"
        countdownElement.innerHTML = `${format(days)}:${format(hours)}:${format(minutes)}:${format(seconds)}`;
    }, 1000);
});
