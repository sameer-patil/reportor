/*
 * This file is responsible for remembering user input for the security setting and date checkbox.
 * These are stored in local storage so the user does not have to re-enter their preferences every time.
 *
 * Last Updated: 08/09/2025
 * Author: Cameron Cartier
 */

function saveProblemBox(box, i) {
    return function() {
        if (box.checked) {
            browser.storage.local.set({['box' + i]: 1});
        }
        else {
            browser.storage.local.set({['box' + i]: 0});
        }
    };
}

function saveSecurity(security) {
    return function() {
        cc = ''
        if (security[0].checked) {
            console.log("oof")
            cc = "Standard";
        } else if (security[1].checked) {
            cc = "Safer";
        } else if (security[2].checked) {
            cc = "Safest";
        } else if (security[3].checked) {
            cc = "Unknown";
        }
        browser.storage.local.set({['security']: cc});
    }

}
function helper(index) {
    checked = browser.storage.local.get('box' + index.toString());
    checked.then(v => {
        let x = 'box' + index.toString();
        if (v['box' + index.toString()] == 1) {
            document.getElementById("box"+index).checked = true;
        }
    })
}

function restoreOptions() {

    // Loads the last clicked security setting.
    let radios = document.getElementsByName('cc');
    var r = browser.storage.local.get('security');
    r.then(value => {
    for (var i = 0; i < radios.length; i++) {
        if(radios[i].value == value.security) {
            radios[i].checked = true;
        }
    }});

    // Holds current values of exit node and aditional comments.
    // These are cleared by send_data() when the user clicks the submit button.
    let exitnode = document.getElementById('exit');
    let comments = document.getElementById('comments');
    let val = browser.storage.local.get('exitnode');
    val.then(value => {

        if (typeof value.exitnode !== 'undefined') {
            exitnode.value = value.exitnode;
        }
    })
    let val2 = browser.storage.local.get('comments');
    val2.then(value => {
        if (typeof value.comments !== 'undefined') {
            comments.value = value.comments;
        }
    })

    // Holds the currently checked 'problem' boxes. These are also cleared on submit
    let problems = document.getElementsByName('problem');
    for(var i = 0; i < problems.length; i++) {
        helper(i, problems);
    }
}

document.addEventListener("DOMContentLoaded", restoreOptions);

window.onload = function () {

    let exitnode = document.getElementById('exit');
    let comments = document.getElementById('comments');
    let security = document.getElementsByName('cc');
    let problems = document.getElementsByName('problem');

    exitnode.addEventListener("keyup", (event) => {
        let e = document.getElementById('exit').value;
        browser.storage.local.set({['exitnode']: e});
    });

    comments.addEventListener("keyup", (event) => {
        let c = comments.value;
        browser.storage.local.set({['comments']: c});
    });

    for (i = 0; i < security.length; i++) {
        security[i].addEventListener("change", saveSecurity(security));
    }

    for (var i = 0; i < problems.length; i++) {
        problems[i].addEventListener("change", saveProblemBox(problems[i], i));
    }

}
