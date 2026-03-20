import './style.css'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.js'


const gyroDiv = document.getElementById('gyrodiv');
const paraX = document.getElementById('x')
const paraY = document.getElementById('y')
const paraZ = document.getElementById('z')
const btnPermission = document.getElementById('btnPermission')

btnPermission.addEventListener("click", (e) => {
  e.preventDefault()
  if (typeof window.DeviceMotionEvent.requestPermission !== "function") {
    // The feature is not available, or does not need permission.
    gyroDiv.innerHTML = "Not Supported"
    return;
  }

  const permission = DeviceMotionEvent.requestPermission();
  gyroDiv.innerHTML = permission
  if (permission === "granted"){
    alert("granted")
    window.addEventListener("devicemotion", (event) => {
      console.log(`${event.acceleration.x} m/s2`);
      console.log(`${event.acceleration.y} m/s2`);
      console.log(`${event.acceleration.z} m/s2`);
    
     paraX.innerText = `${event.acceleration.x} m/s2`;
     paraY.innerText = `${event.acceleration.y} m/s2`;
     paraZ.innerText = `${event.acceleration.z} m/s2`;
      
    });
  }
});