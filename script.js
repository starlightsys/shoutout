const preview = document.getElementById('preview');
const previewBg = document.getElementById('preview-background');
const render = document.getElementById('render');
const supporters = document.getElementById('supporters');

const nameInput = document.getElementById('nameInput');
const backgroundInput = document.getElementById('backgroundInput');
const toggleBackground = document.getElementById('toggleBackground');
let backgroundImage = null;

function setBackground() {
  const file = backgroundInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      backgroundImage = e.target.result;
      previewBg.style.backgroundImage = `url('${backgroundImage}')`;
    };
    reader.readAsDataURL(file);
  }
}

window.onload = function() {
  generatePreview();
};

function toggleBackgroundVisibility() {
  previewBg.style.visibility = toggleBackground.checked ? 'visible' : 'hidden';
}

function generatePreview() {
  // Clear existing content
  supporters.innerHTML = '';

  // Get names from the textarea
  const names = nameInput.value.trim().split('\n');

  const useColumns = false;

  if (useColumns) {
    // Split names into groups of up to 8
    for (let i = 0; i < names.length; i += 8) {
      const column = document.createElement('div');
      column.classList.add('column');

      // Add remaining names to the current column
      names.slice(i, i + 8).forEach(name => {
        const nameElement = document.createElement('div');
        nameElement.classList.add('name');
        nameElement.textContent = name;
        column.appendChild(nameElement);
      });

      supporters.appendChild(column);
    }
  } else {
    // Add all names directly under supporters
    names.forEach(name => {
      const nameElement = document.createElement('div');
      nameElement.classList.add('name');
      nameElement.textContent = name;
      supporters.appendChild(nameElement);
    });
  }
}

function downloadImage() {
  html2canvas(render, {
    width: 1920,
    height: 1080,
    backgroundColor: null,
    useCORS: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'patreon_shoutout.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(error => {
    console.error("Error generating the image: ", error);
    alert("Failed to generate image. Please try again.");
  });
}
