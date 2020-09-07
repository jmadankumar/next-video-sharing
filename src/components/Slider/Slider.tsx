import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import hexToRgba from 'hex-to-rgba';

const sliderHeight = 6;
const sliderThumbWidth = 14;
const SliderWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 ${sliderThumbWidth / 2}px;
  overflow: hidden;
  cursor: pointer;
  height: ${sliderThumbWidth}px;
  .slider-container {
    width: calc(100% - ${sliderThumbWidth}px);
    position: relative;
    height: ${sliderThumbWidth}px;
  }
  .slider-rail {
    width: 100%;
    background-color: rgb(238, 238, 238, 0.3);
    height: ${sliderHeight}px;
    position: absolute;
    top: ${sliderThumbWidth / 2 - sliderHeight / 2}px;
    left: 0;
    right: 0;
  }
  .slider-track {
    width: 0%;
    background-color: blue;
    height: ${sliderHeight}px;
    position: absolute;
    top: ${sliderThumbWidth / 2 - sliderHeight / 2}px;
    left: 0;
    right: 0;
  }
  .slider-thumb {
    position: absolute;
    background-color: blue;
    top: 0;
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
  const progressValue = value / max;
  const progressInPercentage = progressValue * 100;
  const sliderRailRef = useRef<HTMLDivElement>(null);

  const getSliderCoordinates = () => {
    const sliderRail = sliderRailRef.current;
    let x = 0;
    let width = 0;
    if (sliderRail) {
      const box = sliderRail.getBoundingClientRect();
      const { left } = box;
      x = left;
      width = sliderRail.clientWidth;
    }
    return {
      x,
      width,
    };
  };

  const getSliderThumbXpos = (thumbXPos: number) => {
    const { x, width } = getSliderCoordinates();
    let newThumbXPos = thumbXPos - x;
    if (newThumbXPos <= 0) {
      newThumbXPos = 0;
    } else if (newThumbXPos >= width) {
      newThumbXPos = width;
    }
    return newThumbXPos;
  };

  const valueToPercent = (sliderThumbXPos: number) => {
    const { width } = getSliderCoordinates();
    return (sliderThumbXPos / width) * 100;
  };

  const getSliderTrackStyle = () => {
    return { width: `${progressInPercentage}%`, backgroundColor: hexToRgba(color) };
  };

  const getSliderThumbStyle = () => {
    const { width } = getSliderCoordinates();
    let left = progressValue * width;
    return {
      left: `${left}px`,
      backgroundColor: hexToRgba(color),
      transform: `translateX(-${sliderThumbWidth / 2}px)`,
    };
  };
  const handleMouseMove = (event: MouseEvent) => {
    const index = sliderRailRef.current?.getAttribute('data-index') === 'true';
    if (index) {
      const sliderThumbXPos = getSliderThumbXpos(event.clientX);
      const percent = valueToPercent(sliderThumbXPos);
      onChange(percent);
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
    const sliderThumbXPos = getSliderThumbXpos(event.clientX);
    const percent = valueToPercent(sliderThumbXPos);
    onChange(percent);
  };

  return (
    <SliderWrapper className="slider-root">
      <div className="slider-container" onClick={handleSliderClick}>
        <div className="slider-rail" ref={sliderRailRef} />
        <div className="slider-track" style={getSliderTrackStyle()} />
        <div
          style={getSliderThumbStyle()}
          className={cx('slider-thumb')}
          onMouseDown={handleMouseDown}
        />
      </div>
    </SliderWrapper>
  );
};

export default Slider;
