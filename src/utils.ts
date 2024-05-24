import * as THREE from "three";

/**
 * This function move object to bottom using bounding box
 *
 * @param {THREE.Object3D} inObject Object which we want to snap to ground.
 * @param {Array:Object3D} inFloorMeshArr Array of object of floors or any other object on which we want our inObject to snap
 */
export function snapObjectToBottom(inObject, inFloorMeshArr) {
  if (!inObject) return 0;

  // Getting bounding box from scene object
  const box = new THREE.Box3();
  box.setFromObject(inObject);

  // Getting bounding box center
  const center = new THREE.Vector3();
  box.getCenter(center);

  const castPoint = center.clone();
  castPoint.y = box.min.y;

  // Cast ray from center in negative Y direction to check intersection
  const raycaster = new THREE.Raycaster(castPoint, new THREE.Vector3(0, -1, 0));
  const objectArr = [...inFloorMeshArr];
  const objectIndex = objectArr.indexOf(inObject);

  if (objectIndex != -1) {
    objectArr.splice(objectIndex, 1);
  }
  const intersectObjects = raycaster.intersectObjects(objectArr, true);
  if (!intersectObjects.length) return;

  //   inObject.position.y -= intersectObjects[0].distance;

  inObject.translateY(-intersectObjects[0].distance);
}

export function alignObjectButtomToXAxis(object) {
  const box = new THREE.Box3();
  box.setFromObject(object);

  // Getting bounding box center
  const center = new THREE.Vector3();
  box.getCenter(center);

  const castPoint = center.clone();
  castPoint.y = box.min.y;

  object.translateY(-castPoint.y);
}
