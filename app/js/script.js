/*
scripts
 */
'use strict';

let root = document.documentElement;

let dayNightToggle = document.getElementById('dayNightToggle');

dayNightToggle.addEventListener('change', () => {
  if(dayNightToggle.checked == true) {
    root.style.setProperty('--circle-color', "#666");
    root.style.setProperty('--bg-color', "#404040");
    root.style.setProperty('--color', "#b0b0b0");
    root.style.setProperty('--slider-color', "#323232");
    root.style.setProperty('--btn-dark-shadow', "black");
    root.style.setProperty('--btn-light-shadow', "#666");
  } else {
    root.style.setProperty('--circle-color', "#fff");
    root.style.setProperty('--bg-color', "#f6f6f6");
    root.style.setProperty('--color', "#666666");
    root.style.setProperty('--slider-color', "#efefef");
    root.style.setProperty('--btn-dark-shadow', "rgba(0,0,0,0.2)");
    root.style.setProperty('--btn-light-shadow', "rgba(255,255,255,1)");
  }
});

