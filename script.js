const imgSelect = document.getElementById('imgNum');
const distSelect = document.getElementById('distType');
const renderBtn = document.getElementById('renderBtn');
const confirmBtn = document.getElementById('confirmBtn');
const resultDiv = document.getElementById('result');
const submitContainer = document.getElementById('submitContainer');
const selectedLevelText = document.getElementById('selectedLevelText');

for (let i = 1; i <= 25; i++) {
    imgSelect.options[imgSelect.options.length] = new Option(`Reference Image ${i}`, i);
}

for (let i = 1; i <= 24; i++) {
    distSelect.options[distSelect.options.length] = new Option(`Distortion Type ${i}`, i);
}

let currentImgObjectUrl = null;
let selectedLevel = null;

renderBtn.addEventListener('click', generateImage);

confirmBtn.addEventListener('click', goToEvaluation);

function generateImage() {
    const imgNum = imgSelect.value;
    const distType = distSelect.value;

    selectedLevel = null;
    submitContainer.style.display = 'none';

    const serverUrl = "https://donut-footwork-refinery.ngrok-free.dev"; 
    const finalUrl = `${serverUrl}/generate-image?img_num=${imgNum}&dist_type=${distType}`;

    resultDiv.innerHTML = "<span class='loading-text'>Fetching and processing image from server...</span>";

    fetch(finalUrl, {
        method: "GET",
        headers: {
            "ngrok-skip-browser-warning": "any_value_works"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server responded with an error status");
        }
        return response.blob(); 
    })
    .then(blob => {
        if (currentImgObjectUrl) {
            URL.revokeObjectURL(currentImgObjectUrl);
        }

        currentImgObjectUrl = URL.createObjectURL(blob);

        const gridContainer = document.createElement('div');
        gridContainer.className = 'cards-grid';

        for (let i = 0; i < 5; i++) {
            const card = document.createElement('div');
            card.className = 'level-card';
            card.setAttribute('data-level', i + 1);
            
            card.onclick = function() {
                selectLevel(i + 1);
            };

            const clipper = document.createElement('div');
            clipper.className = 'image-clipper';

            const img = document.createElement('img');
            img.src = currentImgObjectUrl;
            img.style.left = `-${i * 100}%`;

            const indicator = document.createElement('div');
            indicator.className = 'selection-indicator';

            const caption = document.createElement('div');
            caption.className = 'card-caption';
            caption.innerText = `Level ${i + 1}`;

            clipper.appendChild(img);
            card.appendChild(indicator);
            clipper.appendChild(indicator);
            card.appendChild(clipper);
            card.appendChild(caption);
            
            gridContainer.appendChild(card);
        }
        
        resultDiv.innerHTML = ""; 
        resultDiv.appendChild(gridContainer);
    })
    .catch(error => {
        console.error("Fetch error:", error);
        resultDiv.innerHTML = "<p style='color:#ef4444; font-size: 0.9rem;'>❌ Connection Error! Make sure FastAPI server is running and Ngrok URL is correct.</p>";
    });
}

function selectLevel(level) {
    selectedLevel = level;
    
    document.querySelectorAll('.level-card').forEach(card => {
        card.classList.remove('selected');
    });

    const targetCard = document.querySelector(`.level-card[data-level='${level}']`);
    if (targetCard) {
        targetCard.classList.add('selected');
    }

    selectedLevelText.innerHTML = `<strong>Level ${level}</strong> successfully selected!`;
    submitContainer.style.display = 'block';

    console.log(`[SYSTEM INFO] User selected Distortion Level: ${level}`);
}

function goToEvaluation() {
    if (selectedLevel) {
        window.location.href = `a.html?level=${selectedLevel}`;
    }
}