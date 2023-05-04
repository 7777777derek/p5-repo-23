//code: myself+chatGPT
//inspiration: Dan Shiffman: https://www.youtube.com/watch?v=H81Tdrmz2LA

/*let video;
let seriously;
let blurEffect;
let source;
let target;
let canvas;
let objectDetector;

function setup() {
  canvas = createCanvas(640, 480,WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  objectDetector = ml5.objectDetector('cocossd', modelReady);

  seriously = new Seriously();
  source = seriously.source(video.elt);
  target = seriously.target(canvas.elt);
  blurEffect = seriously.effect('blur');
  blurEffect.source = source;
  target.source = blurEffect;
  seriously.go();
}

function modelReady() {
  console.log('Model is ready!');
  objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    let detectionLength = results.length;
    blurEffect.amount = map(detectionLength, 0, 5, 1, 0);
    objectDetector.detect(video, gotResults);
  }
}*/
let video;
let seriously;
let effects = ['blur','kaleidoscope' ,'polar', 'ditch','panorama' ,'colorcube','layer','nightvision','hue-saturation'];
let currentEffect;
let source;
let target;
let canvas;
let objectDetector;

function setup() {
  canvas = createCanvas(1280, 1280, WEBGL);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  objectDetector = ml5.objectDetector('cocossd', modelReady);

  seriously = new Seriously();
  source = seriously.source(video.elt);
  target = seriously.target(canvas.elt);
  seriously.go();
}

function modelReady() {
  console.log('Model is ready!');
  objectDetector.detect(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    let detectionLength = results.length;
    updateEffect(detectionLength);
    objectDetector.detect(video, gotResults);
  }
}

function updateEffect(detectionLength) {
  let effectIndex = detectionLength % effects.length;
  let effectName = effects[effectIndex];

  if (currentEffect) {
    currentEffect.destroy();
  }

  currentEffect = seriously.effect(effectName);
  currentEffect.source = source;
  target.source = currentEffect;
}
