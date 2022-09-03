const GLOBAL_CFG = {
  loop: true };


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let swetCollection = document.querySelectorAll('.swet');

swetCollection.forEach((el, index) => {
  anime({
    ...GLOBAL_CFG,
    targets: el,
    opacity: [0, 1, 0],
    delay: index * 100,
    duration: index * 1500,
    translateY: index * 2,
    easing: 'easeInOutSine' });

});

let spitCollection = document.querySelectorAll('.spit');

spitCollection.forEach((el, index) => {
  anime({
    ...GLOBAL_CFG,
    targets: el,
    opacity: [0, 1, 0],
    delay: 500,
    duration: index * 1000,
    translateY: getRndInteger(-30, 30),
    translateX: getRndInteger(-30, 30),
    easing: 'easeInOutSine' });

});
let debreCollection = document.querySelectorAll('.debre');

debreCollection.forEach((el, index) => {
  anime({
    ...GLOBAL_CFG,
    targets: el,
    opacity: [0, 1, 0],
    delay: index * 100,
    duration: index * 100,
    scaleX: 1.3,
    scaleY: 1.3,
    translateY: getRndInteger(-10, -40),
    translateX: getRndInteger(-30, 30),
    easing: 'linear' });

});

const GEAR1 = anime({
  ...GLOBAL_CFG,
  targets: '#gear1 path',
  rotate: 360,
  easing: 'linear' });

const GEAR2 = anime({
  ...GLOBAL_CFG,
  targets: '#gear2 path',
  rotate: -360,
  easing: 'linear' });

const SHORT_ARROW = anime({
  ...GLOBAL_CFG,
  targets: '#shortArrow',
  rotate: 360,
  duration: 10000,
  easing: 'linear',
  transformOrigin: ['4px 25px 0', '6px 27px 0'] });

const LONG_ARROW = anime({
  ...GLOBAL_CFG,
  targets: '#longArrow',
  rotate: 360,
  duration: 800,
  easing: 'linear',
  transformOrigin: ['2px 32px 0', '10px 39px 0'] });

const LEFT_HAND = anime({
  ...GLOBAL_CFG,
  targets: '#leftHand',
  rotate: 6,
  duration: 1000,
  direction: 'alternate',
  easing: 'easeInOutQuart',
  transformOrigin: ['2px 32px 0', '10px 39px 0'] });

const LEFT_PALM = anime({
  ...GLOBAL_CFG,
  targets: '#leftPalm',
  translateX: -10,
  duration: 1000,
  direction: 'alternate',
  easing: 'easeInOutQuart',
  transformOrigin: ['2px 32px 0', '10px 39px 0'] });

const RIGHT_HAND = anime({
  ...GLOBAL_CFG,
  targets: '#rightHand',
  rotate: 6,
  duration: 500,
  direction: 'alternate',
  easing: 'easeInOutBack',
  transformOrigin: ['280px 120px 0', '280px 120px 0'] });


const RIGHT_PALM = anime({
  ...GLOBAL_CFG,
  targets: '#rightPalm',
  rotate: 6,
  translateX: '-15px',
  translateY: '-5px',
  duration: 500,
  direction: 'alternate',
  easing: 'easeInOutBack',
  transformOrigin: ['30px 30px 0', '30px 30px 0'] });

const PEN = anime({
  ...GLOBAL_CFG,
  targets: '#pen',
  rotate: 8,
  translateX: '-15px',
  translateY: '-5px',
  duration: 500,
  direction: 'alternate',
  easing: 'easeInOutBack',
  transformOrigin: ['30px 30px 0', '30px 30px 0'] });

const MOUTH = anime({
  ...GLOBAL_CFG,
  targets: '#mounth',
  rotate: 2,
  scaleX: 1.1,
  scaleY: [1.2, .9],
  duration: 1500,
  direction: 'alternate',
  easing: 'easeInOutElastic',
  transformOrigin: ['30px 30px 0', '30px 30px 0'] });

const TONGUE = anime({
  ...GLOBAL_CFG,
  targets: '#tongue',
  rotate: -5,
  scaleX: 1.2,
  scaleY: [1.1, .6],
  duration: 1500,
  direction: 'alternate',
  easing: 'easeInOutElastic',
  transformOrigin: ['30px 10px 0', '30px 10px 0'] });

const HEAD = anime({
  ...GLOBAL_CFG,
  targets: '#head',
  rotate: -5,
  duration: 1500,
  direction: 'alternate',
  easing: 'easeInOutSine',
  transformOrigin: ['200px 200px 0', '200px 200px 0'] });

const HAIR1 = anime({
  ...GLOBAL_CFG,
  targets: '#hair1',
  rotate: -3,
  duration: 1500,
  direction: 'alternate',
  easing: 'easeInOutSine',
  transformOrigin: ['200px 200px 0', '200px 200px 0'] });

const HAIR2 = anime({
  ...GLOBAL_CFG,
  targets: '#hair2',
  rotate: -4,
  duration: 1500,
  direction: 'alternate',
  easing: 'easeInOutSine',
  transformOrigin: ['100px 180px 0', '100px 180px 0'] });

const BRAW = anime({
  ...GLOBAL_CFG,
  targets: '#brows',
  rotate: -10,
  duration: 500,
  direction: 'alternate',
  easing: 'easeInOutSine' });

const EYE1 = anime({
  ...GLOBAL_CFG,
  targets: '#leftEye',
  duration: 2000,
  scaleY: [.4],
  direction: 'alternate',
  easing: 'easeInOutSine' });

const EYE2 = anime({
  ...GLOBAL_CFG,
  targets: '#rghtEye',
  duration: 2000,
  scaleY: [.6],
  direction: 'alternate',
  easing: 'easeInOutSine' });

const FLASH1 = anime({
  ...GLOBAL_CFG,
  targets: '#flash1',
  duration: getRndInteger(400, 500),
  scaleY: [.6],
  scaleX: [.6],
  rotate: getRndInteger(-4, 4),
  opacity: [0, .7, 0],
  easing: 'easeInOutSine' });

const FLASH2 = anime({
  ...GLOBAL_CFG,
  targets: '#flash2',
  delay: 500,
  duration: getRndInteger(400, 500),
  scaleY: [.6],
  scaleX: [.6],
  rotate: getRndInteger(-4, 4),
  opacity: [0, .7, 0],
  easing: 'easeInOutSine' });

const FLASH3 = anime({
  ...GLOBAL_CFG,
  targets: '#whiteFlash1',
  duration: 1000,
  opacity: [0, 0, .9, .7, .7, 0],
  easing: 'easeOutQuint' });

const FLASH4 = anime({
  ...GLOBAL_CFG,
  targets: '#whiteFlash2',
  duration: 900,
  delay: 200,
  opacity: [0, .6, 0],
  easing: 'linear' });

const PAPER = anime({
  ...GLOBAL_CFG,
  targets: '#paper1',
  delay: 500,
  duration: 3500,
  scaleY: [0, .6],
  scaleX: [0, .6],
  translateX: [-200, -100],
  translateY: [-200, -100],
  rotate: getRndInteger(-400, -100),
  opacity: [0.3, .7, 0],
  easing: 'easeInOutSine' });