// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('twitter.com') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

// Toggle caption as necessary
function toggleCaption(tab) {
	var code = '';
	code += 'el = document.getElementsByClassName("tweet-inverted gallery-tweet");';
	code += 'if (el && el.length > 0) { ';
	code += 'current = el[0].style.display;';
	code += 'newVal = (current === "block" || current === "") ? "none" : "block";';
	code += 'el[0].style.display = newVal';
	code += ' }';

	chrome.tabs.executeScript(tab.id, {
    code: code
  });
	// Toggle title
  chrome.pageAction.getTitle({tabId: tab.id}, function(title){ 
		var newTitle = title === 'Show Caption' ? 'Hide Caption' : 'Show Caption';
		chrome.pageAction.setTitle({title: newTitle, tabId: tab.id});	
	});
}
// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// Listen for page action click
chrome.pageAction.onClicked.addListener(toggleCaption);
