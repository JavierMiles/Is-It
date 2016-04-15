export const centerGameObjects = (objects) => {
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export const getRandomInt = (min, max) => {
  if (max == null) {
    max = min
    min = 0
  }
  return min + Math.floor(Math.random() * (max - min + 1))
}

export const setResponsiveWidth = (sprite, percent, parent) => {
    let w = percent * parent.width / 100;   
    
    let p = w  / sprite.width;    
    sprite.scale.setTo(p);
    
}