const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing
  event.preventDefault();
  
  // Store the event so it can be triggered later
  deferredPrompt = event;

  // Remove the hidden class from the install button
  butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the install prompt

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // Reset the deferredPrompt variable since it can only be used once
    deferredPrompt = null;

    // Hide the install button after installation
    butInstall.style.display = 'none';
  }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed', event);
});
