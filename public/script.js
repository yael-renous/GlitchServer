window.onload = function () {
    var storyButton = document.getElementById('story-button');
    var storyLine = document.getElementById('story-line');
    var colorPicker = document.getElementById('color-picker');

    setStoryLines();


    storyButton.addEventListener('click', function () {
        var storyInput = document.getElementById('story-input');
        var inputValue = storyInput.value;
        var color = colorPicker.value;

        console.log(inputValue, color);

        // Send POST request to add new story line
        fetch('/new-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputValue, color: color }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                storyInput.value = '';
                colorPicker.value = '#000000';
                setStoryLines();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });


    function setStoryLines() {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                storyLine.innerHTML = '';
                data.lines.forEach(line => {
                    storyLine.innerHTML += `<spane style="color: ${line.color}">${line.text} </span>`;
                });
            });
    }

};