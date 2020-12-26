class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  scale(scaler) {
    this.x *= scaler;
    this.y *= scaler;
    return this;
  }

  normalize() {
    let abs = this.abs();
    if (!Number.isNaN(abs) && abs != 0) {
      this.scale(1 / abs);
    }
    return this;
  }

  abs() {
    return (this.x ** 2 + this.y ** 2) ** 0.5;
  }
}

const canvas = document.createElement('canvas');

canvas.width = 1300;
canvas.height = 1200;

document.body.appendChild(canvas);

function waveStep(waveFront, dest, matrix, gen){
  let moves=[{x:1, y:0, price:1}, {x:0, y:1, price:1}, {x:-1, y:0, price:1},{x:0, y:-1, price:1}, 
    {x:1, y:1, price:1}, {x:-1, y:1, price:1}, {x:-1, y:-1, price:1},{x:1, y:-1, price:1}];
  let newFront =[];
  console.log(gen)
  for (i=0; i<waveFront.length; i++){
    ctx.fillStyle="#9f9";
    ctx.fillRect(waveFront[i].y*sz, waveFront[i].x*sz, sz-1, sz-1);
    for (j=0; j<moves.length; j++){
      let point = {x:waveFront[i].x+moves[j].x, y:waveFront[i].y+moves[j].y};
      if (point.x==dest.x && point.y==dest.y){
        return gen;
      }
      if (matrix[point.y]&& matrix[point.y][point.x] && matrix[point.y][point.x]>gen){
        matrix[point.y][point.x]=gen;
        newFront.push(point);
        ctx.fillStyle="#ff9";
        ctx.fillRect(point.y*sz, point.x*sz, sz-1, sz-1);
      }
    }
  };
  if (newFront.length){
    return waveStep(newFront, dest, matrix, gen+1);
  } else {
    return false;
  }
}


function getTrace(end, matrix){
  //let moves=[{x:1, y:0, price:1}, {x:0, y:1, price:1}, {x:-1, y:0, price:1},{x:0, y:-1, price:1}];
  let moves=[
    {x:1, y:0, price:1}, 
    {x:0, y:1, price:1}, 
    {x:-1, y:0, price:1},
    {x:0, y:-1, price:1}, 
    {x:1, y:1, price:1}, {x:-1, y:1, price:1}, {x:-1, y:-1, price:1},{x:1, y:-1, price:1}];
  let gen = matrix[end.y][end.x];
  let trace = [];
  let mingen = gen;
  let end_ = {x:end.x, y:end.y}
  for(i=0; i<gen; i++){
    for (j=0; j<moves.length; j++){
      let point = {x:end_.x+moves[j].x, y:end_.y+moves[j].y};
      if (mingen>matrix[point.y][point.x] && matrix[point.y][point.x]>0){
        ctx.fillStyle="#f0f";
        ctx.fillRect(point.y*sz, point.x*sz, sz-1, sz-1);
        mingen = matrix[point.y][point.x]
        trace.push(point);
        end_ = point;
        break;
      }
    }  
  }
  return trace;
}

let a = canvas.getContext("2d");

const arr = ['000000',
             '000000',
             '000000',
             '000000']