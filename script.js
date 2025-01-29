// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const rateSlider = document.querySelector('[name="rate"]');
const pitchSlider = document.querySelector('[name="pitch"]');
const textArea = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = voice.name;
        voicesDropdown.appendChild(option);
    });
}

voicesDropdown.addEventListener('change', (e) => {
    const selectedVoice = voices.find(voice => voice.name === e.target.value);
    msg.voice = selectedVoice;
});

rateSlider.addEventListener('input', () => {
    msg.rate = rateSlider.value;
});

pitchSlider.addEventListener('input', () => {
    msg.pitch = pitchSlider.value;
});

speakButton.addEventListener('click', () => {
    msg.text = textArea.value;
    speechSynthesis.speak(msg);
});

stopButton.addEventListener('click', () => {
    speechSynthesis.cancel();
});

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
} else {
    populateVoices();
}
