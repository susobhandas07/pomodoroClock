const inputs = document.getElementsByClassName("setting-option-radio");
const colorLabels = document.getElementsByClassName("color-label");

inputs[0].checked = true;
inputs[3].checked = true;
for (let colorInput of inputs) {
    colorInput.addEventListener('change', (e => {
        const { name, value } = e.target;
        document.documentElement.style.setProperty(name, value);
    }));
};

for (let i = 0; i < colorLabels.length; i++) {
    let label = colorLabels[i], color = colorLabels[i].control.value;
    label.style.backgroundColor = color;
}