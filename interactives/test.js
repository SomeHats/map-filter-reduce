import * as PIXI from 'pixi.js';

export default (app, events) => {
  let vw, vh, vmin;

  let color = 0xff00ff;

  class Rect extends PIXI.Graphics {
    interactive = true;
    buttonMode = true;

    draw() {
      this.clear();
      this.beginFill(color);
      this.drawRect(0, 0, 20 * vmin, 20 * vmin);
      this.endFill();

      this.hitArea = new PIXI.Rectangle(0, 0, 20 * vmin, 20 * vmin);
      this.pivot.set(10 * vmin, 10 * vmin);
    }

    click() {
      events.emit('close');
    }

    touchstart() {
      events.emit('close');
    }
  }

  const r1 = new Rect();
  const r2 = new Rect();
  const r3 = new Rect();

  const layout = () => {
    vw = app.screen.width / 100;
    vh = app.screen.height / 100;
    vmin = Math.min(vw, vh);

    r1.draw();
    r2.draw();
    r3.draw();

    r1.x = r2.x = r3.x = 50 * vw;
    r1.y = 25 * vh;
    r2.y = 50 * vh;
    r3.y = 75 * vh;
  };

  const tick = dt => {
    r1.rotation += dt / 30;
    r2.rotation += dt / 300;
    r3.rotation += dt / 3000;
  };

  layout();

  events.on('resize', layout);
  events.on('activate', () => {
    color = 0x00ff00;
    layout();
  });
  events.on('deactivate', () => {
    color = 0xff00ff;
    layout();
  });

  app.ticker.add(tick);
  app.stage.addChild(r1);
  app.stage.addChild(r2);
  app.stage.addChild(r3);
};
