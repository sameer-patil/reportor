/*
 * This code reads the current list of tor exit nodes from the internet
 * and displays suggestions based on what the user is tying in to the exit node box.
 *
 * Last Updated: 08/09/2025
 * Author: Cameron Cartier
 */
const $input = document.getElementById('exit');
const dropdown = document.getElementById('myDropdown');
let INPUT_DEBOUNCE = null;
let trie = null;

// Hide the dropdown menu if the user clicks outside of it.
window.onclick = function(event) {
    if (!(event.target == dropdown)) {
        dropdown.style.display = "none";
    }
}

class Trie {
    constructor() {
        this.trie = null;
        this.suggestions = [];
    }

    newNode() {
        return {
            isLeaf: false,
            children: {}
        }
    }

    add(address) {

        if (!this.trie) this.trie = this.newNode();

        let root = this.trie;
        for (const character of address) {
            if (!(character in root.children)) {
                root.children[character] = this.newNode();
            }
            root = root.children[character];
        }
        root.isLeaf = true;
    }

    find(address) {
        let root = this.trie;
        for (const character of address) {
            if (character in root.children) {
                root = root.children[character];
            } else {
                return null;
            }
        }
        return root;
    }

    traverse(curr, address) {
        if (curr.isLeaf) {
            this.suggestions.push(address);
            return;
        } else {
            for (const character in curr.children) {
                this.traverse(curr.children[character], address + character);
            }
        }
    }

    complete(address, CHILDREN = null) {
        trie.clear()
        const root = this.find(address);

        if (!root) {
            changeColor();
            return this.suggestions; // cannot suggest anything
        }
        const children = root.children;

        let spread = 0;

        for (const character in children) {
            this.traverse(children[character], address + character);
            spread++;

            if (CHILDREN && spread === CHILDREN) break;
        }

        return this.suggestions;
    }

    clear() {
        this.suggestions = [];
    }

}

function changeColor() {
    $input.style.backgroundColor = "red";
}


const init = async () => {

    dropdown.style.display = "none";

    // download the current list of tor exit nodes
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://check.torproject.org/torbulkexitlist", true);
    xhr.responseType = "text";
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {  // Makes sure the document is ready to parse.
                allText = xhr.responseText;
                lines = xhr.responseText.split("\n"); // split elements on newline, store all as array
                lines.forEach(line => trie.add(line));
                return lines;
            }
    };

    xhr.send();
    trie = new Trie();
}


// This function runs when a user gives input to the exitnode field
const main = (e) => {
    $input.style.backgroundColor = "#333A41";
    let tocomplete = document.getElementById('exit').value;

    if (tocomplete !== '') {
        trie.complete(tocomplete);
        if ((trie.suggestions).length > 0) {
            displayOptions(trie.suggestions);
            trie.clear();
        }
    }
}

init();

/* Prevent accidental form submission if enter is pressed */
$input.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        console.log("shouldn't submit");
        return false;
    }

});

$input.addEventListener('input', e => {
    trie.clear()
    dropdown.style.display = '';
    clearTimeout(INPUT_DEBOUNCE);
    INPUT_DEBOUNCE = setTimeout(() => main(e), 200);
});

function displayOptions(suggestions) {

    let input = document.getElementById("exit");
    let dropdownDiv = document.getElementById("myDropdown");
    dropdownDiv.style.display = "";
    let filter = input.value;

    let a = dropdownDiv.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        a[i].style.display = "none";
    }
    var i;
    for (i = 0; i < suggestions.length; i++) {
        const newOpt = document.createElement("a");
        const node = document.createTextNode(suggestions[i]);
        if (suggestions[i].startsWith(filter)) {
            newOpt.appendChild(node);
            dropdownDiv.appendChild(newOpt);
            newOpt.addEventListener('click', e => {
                input.value = e.target.innerHTML;
                dropdownDiv.style.display = "none";
            });
        }
    }
}
