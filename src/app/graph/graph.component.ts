import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  canvas;
  ctx;
  cur = 0;

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.bottom = "50px";
    this.canvas.style.right = "50px";
    this.ctx = this.canvas.getContext('2d');
    document.getElementsByTagName("app-graph")[0].appendChild(this.canvas);

    this.canvas.width = 600;
    this.canvas.height = 300;

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(){
    this.draw([2, 1, 5]);

    requestAnimationFrame(this.animate.bind(this));
  }

  draw([a, b, c]){
    //처음, 중간, 끝점을 계산
    let points = [{x: 0, y: (6 - a) * 55}, {x: 300, y: (6 - b) * 55}, {x: 600, y: (6 - c) * 55}];

    //Path의 시작
    this.ctx.beginPath();

    //배경색을 칠함
    this.ctx.fillStyle = "#33333B";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    //커브를 그림
    this.ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++){
      const cx = (points[i - 1].x + points[i].x) / 2;
      const cy = (points[i - 1].y + points[i].y) / 2;
      this.ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cx, cy);
    }

    this.ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

    // if(this.ctx.lineDashOffset >= -600){
    //   this.ctx.setLineDash([20, 10]);
    //   this.ctx.lineDashOffset -= 3;
    // } else if(this.ctx.lineDashOffset >= -700){
    //   this.ctx.lineDashOffset -= 2;
    // } else if(this.ctx.lineDashOffset >= -800){
    //   this.ctx.lineDashOffset -= 1;
    // }

    //커브를 그음
    this.ctx.strokeStyle = "rgba(218, 180, 45, 1)";
    this.ctx.lineWidth = 5;
    this.ctx.stroke();

    //그래프 아래 색을 위한 선을 그림
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.lineTo(points[0].x, points[0].y);

    //그래프 아래 색을 위한 그라데이션을 설정
    const gra = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gra.addColorStop(0, "rgba(69, 95, 84, 0.5)");
    gra.addColorStop(0.5, "rgba(188, 101, 37, 0.5)");
    gra.addColorStop(1, "rgba(148, 30, 52, 0.5)");

    //그라데이션을 채움
    this.ctx.fillStyle = gra;
    this.ctx.fill();

    //그래프가 그려지는듯한 효과
    if(this.cur < this.canvas.width){
      this.ctx.fillStyle = "#33333B";
      this.ctx.fillRect(this.cur, 0, this.canvas.width, this.canvas.height);
      this.cur += 10;
    }

    //Path를 닫음
    this.ctx.closePath();
  }
}
