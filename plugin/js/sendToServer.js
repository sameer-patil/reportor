/*
 * Collect the data from the html form and send it to the onion address of the server.
 *
 * Last Updated: 08/09/2025
 * Author: Cameron Cartier
 */


// IP Regex:
// ^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$

function gatherFormData () {

    let problems = document.getElementsByName('problem');
    let the_list = []
    for( i = 0; i < problems.length; i++) {
        if (problems[i].checked) {
            the_list.push(problems[i].value);
        }
    }

    let security = document.getElementsByName('cc');
    let cc = "Unknown";
    if (security[0].checked) {
        cc = "Standard";
    } else if (security[1].checked) {
        cc = "Safer";
    } else if (security[2].checked) {
        cc = "Safest";
    } else if (security[3].checked) {
        cc = "Custom";
    }

    browser.storage.local.set({['security']: cc});

    let telemetry = {
        url: document.getElementById("url").innerHTML.toString(),
        security_setting: cc,
        exit_node: document.getElementById('exit').value,
        date_utc: "",
        problem: the_list,
        comments: document.getElementById("comments").value
    };
    return telemetry;
}

let form_data = document.getElementById("Form");

form_data.addEventListener("submit", (e) => {
    e.preventDefault();
    let report = gatherFormData();

    var headers = {type: "application/json;charset=UTF-8"};
    var blob = new Blob([JSON.stringify(report)], headers);
    navigator.sendBeacon("http://qimchlfgh7bhrucjgemvuwyqxyzes7zv3bvwryvfbnbeqfctwat4rgid.onion:80", blob);

    // clear local storage after report sends
    browser.storage.local.remove("exitnode");
    browser.storage.local.remove("comments");
    browser.storage.local.remove("box0");
    browser.storage.local.remove("box1");
    browser.storage.local.remove("box2");
    browser.storage.local.remove("box3");
    browser.storage.local.remove("box4");
    browser.storage.local.remove("box5");
    window.location.href='../thankyou.html';
});

form_data.addEventListener("reset", (e) =>
{
    // clear local storage if reset button is pressed
    e.preventDefault();
    browser.storage.local.remove("exitnode");
    browser.storage.local.remove("comments");
    browser.storage.local.remove("box0");
    browser.storage.local.remove("box1");
    browser.storage.local.remove("box2");
    browser.storage.local.remove("box3");
    browser.storage.local.remove("box4");
    browser.storage.local.remove("box5");
    window.close();
})
