let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

// // Hide the install button, it can't be called twice.
// evt.srcElement.setAttribute('hidden', true);
// // CODELAB: Log user response to prompt.
// deferredInstallPrompt.userChoice
//     .then((choice) => {
//       if (choice.outcome === 'accepted') {
//         console.log('User accepted the A2HS prompt', choice);
//       } else {
//         console.log('User dismissed the A2HS prompt', choice);
//       }
//       deferredInstallPrompt = null;
//     });
// // CODELAB: Add event listener for appinstalled event
// window.addEventListener('appinstalled', logAppInstalled);
// // CODELAB: Add code to log the event
// console.log('Weather App was installed.', evt);