"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/marcs-movies/expo-service-worker.js",{scope:"/marcs-movies/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}));