import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';

const sliderHeight = 6;
const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  .slider-rail {
    width: 100%;
    background-color: rgb(238 238 238, 0.7);
    height: ${sliderHeight}px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .slider-track {
    width: 0%;
    background-color: blue;
    height: ${sliderHeight}px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .slider-thumb {
    position: absolute;
    background-color: blue;
    top: -4px;
    width: 14px;
    height: 14px;
    cursor: pointer;
    border-radius: 50%;
    user-select: none;
  }
  .slider-thumb.active {
    border: 6px solid green;
  }
`;
interface SliderProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ max, value, onChange }) => {
  const trackWidthInPercentage = (value / max) * 100;
  const sliderRailRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    const index = sliderRailRef.current?.getAttribute('data-index') === 'true';
    const posX = event.clientX;
    const sliderRail = sliderRailRef.current;

    if (sliderRail && index) {
      const box = sliderRail.getBoundingClientRect();
      const { clientWidth } = sliderRail as HTMLElement;

      if (box) {
        const { left } = box;
        let thumbLeft = 0;
        if (posX <= left) {
          thumbLeft = 0;
        } else if (posX >= clientWidth + left) {
          thumbLeft = clientWidth + left;
        } else {
          thumbLeft = posX;
        }
        const value = Math.round((thumbLeft / (clientWidth + left)) * 100);

        onChange(value);
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    sliderRailRef.current?.setAttribute('data-active', 'true');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (event: MouseEvent) => {
    sliderRailRef.current?.setAttribute('data-active', 'false');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <SliderWrapper className="slider-root">
      <div className="slider-rail" ref={sliderRailRef}></div>
      <div className="slider-track" style={{ width: `${trackWidthInPercentage}%` }}></div>
      <div
        // draggable
        // onDrag={handleDrag}
        style={{ left: `${trackWidthInPercentage}%` }}
        className={cx('slider-thumb')}
        onMouseDown={handleMouseDown}
      ></div>
    </SliderWrapper>
  );
};

export default Slider;
