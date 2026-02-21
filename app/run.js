var shown = false;
var hash = undefined;

function refreshOutput () {
    hash = undefined;
    shown = false;
    document.getElementById("copymessage").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("showbutton").innerHTML = "Compute and show hash";
}

function shiftString (str, amt) {
    var res = ""
    for (var i = 0; i < str.length; i++) {
        res += String.fromCharCode((str[i].charCodeAt(0) + amt) % 128);
    }
    return res
}

function getHashFromHTML () {
    var keyword = document.getElementById("configKeyword").value;
    var publicStr = document.getElementById("publicStr").value;
    var publicStrPatch = parseInt(document.getElementById("publicStrPatch").value);
    var choiceStr = document.getElementById("choiceStr").value;
    var shuffleStr = document.getElementById("shuffleStr").value;
    try {
        return getFinalHash(determineConfiguration(keyword), shiftString(publicStr, publicStrPatch), choiceStr, shuffleStr);
    } catch (e) {
        return "Incorrect input!"
    }
}

function copyToClipboard() {
    hash = getHashFromHTML();
    if (hash == "Incorrect input!") {
        document.getElementById("copymessage").innerHTML = "Incorrect input!";
    } else {
        navigator.clipboard.writeText(hash);
        document.getElementById("copymessage").innerHTML = "(copied)";
    }
}

function showHash() {
    if (!shown)
    {
        hash = getHashFromHTML();
        computed = true;
    }
    if (!shown)
    {
        document.getElementById("output").innerHTML = hash;
        document.getElementById("showbutton").innerHTML = "Hide hash";
        shown = true;
    }
    else
    {
        document.getElementById("output").innerHTML = "";
        document.getElementById("showbutton").innerHTML = "Compute and show hash";
        shown = false;
    }
}
