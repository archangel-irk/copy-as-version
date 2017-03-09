javascript:(function(){'use strict';var versionASCopy='1.1.1',logs=document.querySelectorAll('._clipboard_log_');logs.forEach(function(a){a.parentNode.removeChild(a)});var copyButtonId='_mycustom-clipboard-button-id_',isButtonExist=document.getElementById(copyButtonId);isButtonExist&&document.getElementById(copyButtonId).remove();var versionsTable=document.querySelector('.Version_table'),md='',headSeparator='||',bodySeparator='|';function isTableHead(a){return 0==a}function add(a){md+=a}function addSeparator(a){isTableHead(a)?add(headSeparator):add(bodySeparator)}for(var tr,i=0;i<versionsTable.childNodes.length;i++)tr=versionsTable.childNodes[i].childNodes[0],addSeparator(i),tr.childNodes.forEach(function(a){add(a.innerText),addSeparator(i)}),md+='\n';if(''!=md){var button=document.createElement('button');button.id=copyButtonId,button.innerText='Click me to copy versions',button.style='\n        margin: 20px 0px;\n        height: 60px;\n        width: 540px;\n        font-size: 20pt;\n    ',versionsTable.parentElement.appendChild(button),button.addEventListener('click',function(){copyToClipboard(md)}),window.copy&&(copy(md),console.log(md),console.log('Copied to clipboard!'),log('Copied to clipboard!'))}function copyToClipboard(a){var b=document.createElement('textarea');b.id='mycustom-clipboard-textarea-hidden-id',b.style.position='absolute',b.style.top=0,b.style.left=0,b.style.width='1px',b.style.height='1px',b.style.padding=0,b.style.border='none',b.style.outline='none',b.style.boxShadow='none',b.style.background='transparent',document.querySelector('body').appendChild(b),b.value=a,b.select();try{var c=document.execCommand('copy');c?log('Copied to clipboard!'):error('Cannot copy text. See snippet code.')}catch(d){log('Unable to copy. See snippet code.')}b.remove()}function log(a){var b=document.createElement('div');b.innerText=a,b.className='_clipboard_log_',b.style='\n        width: 540px;\n        text-align: center;\n    ',versionsTable.parentElement.appendChild(b)} })();
