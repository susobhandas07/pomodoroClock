const colors = document.getElementsByClassName("setting-option-radio");
const colorLabels = document.getElementsByClassName("color-label");

for (let colorInput of colors) {
    colorInput.addEventListener('change', (e => {
        const { name, value } = e.target;
        document.documentElement.style.setProperty(name, value);
    }));
};

for (let i = 0; i < colorLabels.length; i++) {
    let label = colorLabels[i], color = colorLabels[i].control.value;
    label.style.backgroundColor = color;
}