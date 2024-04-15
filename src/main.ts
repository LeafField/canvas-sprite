import "./style.css";
import docImage from "./shadow_dog.png";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
const dropDown = document.querySelector<HTMLSelectElement>("#animations")!;

let playerState = "idle";
dropDown.addEventListener("change", (e) => {
  if (e.target instanceof HTMLSelectElement) {
    playerState = e.target.value;
  }
});

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
const staggerFrame = 5;

type SpriteAnimation = {
  [K in string]: Frames;
};
let spriteAnimations: SpriteAnimation = {};

type AnimationState = {
  name: string;
  frames: number;
};

const animationState: AnimationState[] = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "gethit",
    frames: 4,
  },
];

type Frames = {
  loc: {
    x: number;
    y: number;
  }[];
};

animationState.forEach((state, index) => {
  let frames: Frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({
      x: positionX,
      y: positionY,
    });
  }
  spriteAnimations[state.name] = frames;
});

const playerImage = new Image();
playerImage.src = docImage;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    (spriteAnimations[playerState].loc.length - 1);
  const frameX = spriteWidth * position;
  const frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  gameFrame++;

  requestAnimationFrame(animate);
}

animate();
