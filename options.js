// Saves options to chrome.storage.local.
function save_options() {
  var keywords = document.getElementById('keywords').value;
  var message = document.getElementById('message').value;
  var subject = document.getElementById('subject').value;
  chrome.storage.local.set({
    keywords: keywords,
    message: message,
    subject: subject, 
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.local.get({
    keywords: "Java,C++,Python",
    message: "Hi {first}!",
    subject: "How's {company} lately?"
  }, function(items) {
    document.getElementById('keywords').value = items.keywords;
    document.getElementById('message').value = items.message;
    document.getElementById('subject').value = items.subject;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
