const socket = io();

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

window.onload = function () {
    var storyButton = document.getElementById('story-button');
    var storyLine = document.getElementById('story-line');
    var colorPicker = document.getElementById('color-picker');


    storyButton.addEventListener('click', function () {
        var storyInput = document.getElementById('story-input');
        var inputValue = storyInput.value;
        var color = colorPicker.value;

        socket.emit('new-story-line', { text: inputValue, color: color });
        
        // Clear inputs
        storyInput.value = '';
        colorPicker.value = '#000000';
    });

    socket.on('story-lines-updated', (data) => {
        console.log("story-lines-updated", data);
        storyLine.innerHTML = '';
        data.lines.forEach(line => {
            storyLine.innerHTML += `<span style="color: ${line.color}">${line.text} </span>`;
        });
    });


};