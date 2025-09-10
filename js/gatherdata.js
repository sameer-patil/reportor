/*
 * Grab url of the open tab and strip the query string
 *
 * Last Updated: 08/09/2025
 * Author: Cameron Cartier
 */

var scrubbed_url;

function currentTab(tabs) {
    let tab = tabs[0];
    return (tab.url).split('?')[0];
}

const p = browser.tabs.query({currentWindow: true, active: true}).then(currentTab, console.error);
const get_url = async () => {
    scrubbed_url = await p;
    let ele = document.getElementById("url");
    ele.innerHTML = scrubbed_url.toString();
}

get_url();
