import './style.css'

let isTicking = false;

const btnPermission = document.getElementById('btnPermission')

btnPermission.addEventListener("click", checkPermissionAndListenToSensors);

async function checkPermissionAndListenToSensors() {
  if (DeviceMotionEvent && typeof DeviceMotionEvent.requestPermission === "function") {
    try {
      const permission = await DeviceMotionEvent.requestPermission();
      if (permission === 'granted') {
        window.addEventListener("devicemotion", handleDeviceMotion);
      } else{
        alert("permission was not granted");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    // For non iOS devices and browsers that do not require permission
    window.addEventListener("devicemotion", handleDeviceMotion);
    // window.addEventListener("deviceorientation", handleDeviceOrientation);
  }

}

function updateField(event) {
  console.log(event);
  updateAcceleration(event);
  updateAccelerationIncludingGravity(event);
  updateRotationRate(event);
  isTicking = false;
}

function handleDeviceMotion(event) {
  if(!isTicking){
    requestAnimationFrame(() => {updateField(event)});
    isTicking = true
  }
}


function handleDeviceOrientation(event) {
  // updateField('orientation_x', event.beta);
  // updateField('orientation_y', event.gamma);
  // updateField('orientation_z', event.alpha);
}

function updateAcceleration(event) {
  const { acceleration } = event;
  if (!acceleration) return;

  ['x', 'y', 'z'].forEach(axis => {
    const value = acceleration[axis];
    if (value !== null) {
      document.getElementById(`acceleration_${axis}`).innerText = value.toFixed(3);
      const parentTR = document.getElementById(`tr_acceleration_${axis}`);
      toggleClasses(value, parentTR)
      if (axis === 'x') {
        const card = document.getElementById(`card_acceleration`);
        // card.classList.remove('pos', 'neg')
        const absoluteValue = Math.abs(Math.trunc(value));
        if(absoluteValue < 2) return
        toggleClasses(value, card);
      }
    }
  });
}

function updateAccelerationIncludingGravity(event) {
  const { accelerationIncludingGravity } = event;
  if (!accelerationIncludingGravity) return;

  ['x', 'y', 'z'].forEach(axis => {
    const value = accelerationIncludingGravity[axis];
    if (value !== null) {
      document.getElementById(`acceleration_gravity_${axis}`).innerText = value.toFixed(3);
    }
  });
}

function updateRotationRate(event) {
  const { rotationRate } = event;
  if (!rotationRate) return;

  ['alpha', 'beta', 'gamma'].forEach(axis => {
    const value = rotationRate[axis];
    if (value !== null) {
      document.getElementById(`gyro_${axis}`).innerText = value.toFixed(3);
    }
  });
}

function toggleClasses(value, elem) {
  elem.classList.remove('pos', 'neg')
  if (value > 0) {
    elem.classList.add('pos');
  } else if (value < 0) {
    elem.classList.add('neg')
  } else {
    elem.classList.remove('pos', 'neg')
  }
}