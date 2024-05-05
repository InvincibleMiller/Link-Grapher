"use client";

import { useRef, useEffect } from "react";

type Props = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void;
};

const Canvas = (props: Props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;

    if (!canvas) return;

    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

    if (!context) return;

    let frameCount = 0;
    let animationFrameId = 0;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};

export default Canvas;
