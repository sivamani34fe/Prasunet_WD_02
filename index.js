let timer = 0;
        let startTime;
        let isRunning = false;
        let laps = [];

        function start() {
            if (isRunning) throw new Error('Stopwatch is already running.');
            isRunning = true;
            startTime = Date.now() - timer;
            timerId = setInterval(step, 10);
        }

        function stop() {
            if (!isRunning) throw new Error('Stopwatch is already stopped.');
            isRunning = false;
            clearInterval(timerId);
            timerId = undefined;
        }

        function reset() {
            start();
            stop();
            timer = 0;
            updateDisplay();
        }

        function lap() {
            const lapTime = getFormattedTime(timer);
            laps.push(lapTime);
            updateLaps();
        }

        function step() {
            timer = Date.now() - startTime;
            updateDisplay();
        }

        function getFormattedTime(time) {
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            const hundreds = Math.floor((time % 1000) / 10);
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${hundreds.toString().padStart(2, '0')}`;
        }

        function updateDisplay() {
            const display = document.getElementById('stopwatch');
            display.textContent = getFormattedTime(timer);
        }

        function updateLaps() {
            const lapList = document.getElementById('laps');
            lapList.innerHTML = '';
            laps.forEach((lap, index) => {
                const lapItem = document.createElement('li');
                lapItem.textContent = `${index + 1}. ${lap}`;
                lapList.appendChild(lapItem);
            });
        }

        const startBtn = document.getElementById('startBtn');
        startBtn.addEventListener('click', start);

        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.addEventListener('click', stop);

        const resetBtn = document.getElementById('resetBtn');
        resetBtn.addEventListener('click', reset);

        const lapBtn = document.getElementById('lapBtn');
        lapBtn.addEventListener('click', lap);