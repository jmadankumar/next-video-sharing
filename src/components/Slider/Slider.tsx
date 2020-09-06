import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import hexToRgba from 'hex-to-rgba';

const sliderHeight = 6;
const sliderThumbWidth = 14;
const SliderWrapper = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
  .slider-rail {
    width: 100%;
    background-color: rgb(238, 238, 238, 0.3);
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
    width: ${sliderThumbWidth}px;
    height: ${sliderThumbWidth}px;
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
  color?: string;
}

const Slider: React.FC<SliderProps> = ({ max, value, onChange, color = '#000000' }) => {
  const trackWidthInPercentage = (value / max) * 100;
  const sliderRailRef = useRef<HTMLDivElement>(null);

  const getSliderTrackStyle = () => {
    return { width: `${trackWidthInPercentage}%`, backgroundColor: hexToRgba(color) };
  };

  const getSliderThumbStyle = () => {
    return { left: `${trackWidthInPercentage}%`, backgroundColor: hexToRgba(color) };
  };
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
          thumbLeft = clientWidth + left - sliderThumbWidth;
        } else {
          thumbLeft = posX - sliderThumbWidth / 2;
        }
        const value = (thumbLeft / (clientWidth + left)) * 100;
        console.log(value);
        onChange(value);
      }
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    sliderRailRef.current?.setAttribute('data-index', 'true');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (event: MouseEvent) => {
    sliderRailRef.current?.setAttribute('data-index', 'false');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleSliderClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const box = (event.target as HTMLElement).getBoundingClientRect();
    const { left } = box;
    const sliderRail = sliderRailRef.current;
    const { clientWidth } = sliderRail as HTMLElement;
    const value = Math.round(((event.clientX - sliderThumbWidth) / (clientWidth + left)) * 100);
    onChange(value);
  };

  return (
    <SliderWrapper className="slider-root" onClick={handleSliderClick}>
      <div className="slider-rail" ref={sliderRailRef}></div>
      <div className="slider-track" style={getSliderTrackStyle()}></div>
      <div
        style={getSliderThumbStyle()}
        className={cx('slider-thumb')}
        onMouseDown={handleMouseDown}
      ></div>
    </SliderWrapper>
  );
};

export default Slider;
