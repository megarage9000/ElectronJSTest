// Browser window

window.addEventListener('DOMContentLoaded', ()=> {
    // Creating anonymous function to replaceText
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    }

    // Iterating through each HTML elements and replacing text
    // See: https://www.electronjs.org/docs/tutorial/process-model for process models
    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
})