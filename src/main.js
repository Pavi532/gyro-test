import './style.css'

const btnPermission = document.getElementById('btnPermission')

btnPermission.addEventListener("click", async() => {

  if ( DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
    await DeviceMotionEvent.requestPermission();
  }

  window.addEventListener("devicemotion", (e) => {
    requestAnimationFrame(() => handleDeviceMotion(e));
  }, false);
  // window.addEventListener("deviceorientation", handleDeviceOrientation);
});

function updateField(elem, value) {
  if(value !== null){
    document.getElementById(elem).innerText = value.toFixed(3)
  }
}

function handleDeviceMotion(event) {
  
  updateField('acceleration_x', event.acceleration.x);
  updateField('acceleration_y', event.acceleration.y);
  updateField('acceleration_z', event.acceleration.z);
  
  updateField('acceleration_gravity_x', event.accelerationIncludingGravity.x);
  updateField('acceleration_gravity_y', event.accelerationIncludingGravity.y);
  updateField('acceleration_gravity_z', event.accelerationIncludingGravity.z);

  updateField('gyro_x', event.rotationRate.beta);
  updateField('gyro_y', event.rotationRate.gamma);
  updateField('gyro_z', event.rotationRate.alpha);
}

function handleDeviceOrientation(event) {
  updateField('orientation_x', event.beta);
  updateField('orientation_y', event.gamma);
  updateField('orientation_z', event.alpha);
}