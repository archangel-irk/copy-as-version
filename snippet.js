// Just for information of this snippet.
var ASCopyVersion = '1.1.0';


// TESTED ON BROWSERS:
// * Chrome 56.0.2924.87
// * Firefox 52.0 - Use Scratchpad in devtools.
//                  Copying from scratchpad doesn't work, use generated button after versions table.
// * Safari 10.0.3 - Just run snippet from console.


// CHANGELOG
// 1.1.0 (March 7, 2017)
// * Added: usage `copy` method from chrome devtools api.
//
// 1.0.0 (March 7, 2017)
// * First version (added main functionality, button, logs).



// Clear previous elements
var logs = document.querySelectorAll('._clipboard_log_');
logs.forEach(function(log) {
  log.parentNode.removeChild(log);
});
var copyButtonId = '_mycustom-clipboard-button-id_'
var isButtonExist = document.getElementById(copyButtonId);
if (isButtonExist) {
  document.getElementById(copyButtonId).remove();
}


var versionsTable = document.querySelector('.Version_table');
// Markdown view
var md = '';
var headSeparator = '||';
var bodySeparator = '|';

function isTableHead(iter) {
  return iter == 0;
}

function add(string) {
  md = md + string;
}

function addSeparator(iter) {
  isTableHead(iter) ? add(headSeparator) : add(bodySeparator);
}

for (var i = 0; i < versionsTable.childNodes.length; i++) {
  var tr = versionsTable.childNodes[i].childNodes[0];

  addSeparator(i);
  tr.childNodes.forEach(function(td){
    add(td.innerText);
    addSeparator(i);
  });

  // Add line break
  md = md + '\n';
}

if (md != '') {
  var button = document.createElement('button');
  button.id = copyButtonId;
  button.innerText = 'Click me to copy versions';
  button.style = `
        margin: 20px 0px;
        height: 60px;
        width: 540px;
        font-size: 20pt;
    `;
  versionsTable.parentElement.appendChild(button);
  button.addEventListener('click', function() {
    copyToClipboard(md);
  });

  copy(md);
  console.log(md);
  console.log('Copied to clipboard!');
  log("Copied to clipboard!");
}

// ||Component||Version||Date||
// |UI|2.1.0-34-gb4d27a6|2017-03-06T10:03:51±10|
// |appservices|2.1.0-start-298-g01ddc8|2017-03-06T16:50:05.816-0500|
// |authservice|1.1.0-start-126-gcf045e|2017-02-28T11:15:04.436-0500|
// |discountservice|1.1.0-start-126-gcf045e|2017-02-28T11:16:44.286-0500|
// |notificationservice|1.1.0-start-126-gcf045e|2017-02-28T11:15:32.974-0500|
// |profileservice|1.1.0-start-126-gcf045e|2017-02-28T11:16:00.802-0500|
// |roleservice|1.1.0-start-126-gcf045e|2017-02-28T11:16:24.693-0500|

function copyToClipboard(text){
  var textarea = document.createElement("textarea");
  textarea.id = "mycustom-clipboard-textarea-hidden-id";
  // Place in top-left corner of screen regardless of scroll position.
  textarea.style.position = 'absolute';
  textarea.style.top = 0;
  textarea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textarea.style.width = '1px';
  textarea.style.height = '1px';

  // We don't need padding, reducing the size if it does flash render.
  textarea.style.padding = 0;

  // Clean up any borders.
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textarea.style.background = 'transparent';
  document.querySelector("body").appendChild(textarea);

  textarea.value = text;
  textarea.select();

  try {
    var status = document.execCommand('copy');
    if (!status){
      error("Cannot copy text. See snippet code.");
    } else {
      log("Copied to clipboard!");
    }
  } catch (err) {
    log('Unable to copy. See snippet code.');
  }

  textarea.remove();
}

function log(text) {
  var textElement = document.createElement("div");
  textElement.innerText = text;
  textElement.className = '_clipboard_log_';
  textElement.style = `
        width: 540px;
        text-align: center;
    `;

  versionsTable.parentElement.appendChild(textElement);
}
