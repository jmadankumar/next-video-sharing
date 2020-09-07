import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import hexToRgba from 'hex-to-rgba';

interface SliderProps {
  max: number;
  value: number;
  onChange: (value: number) => void;
  color?: string;
  thumbSize?: number;
  trackHeight?: number;
}

const Slider: React.FC<SliderProps> = ({
  max,
  value,
  onChange,
  color = '#000000',
  thumbSize = 14,
  trackHeight = 6,
}) => {
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
      transform: `translateX(-${thumbSize / 2}px)`,
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
    <div
      className="slider-root"
      style={{
        width: '100%',
        padding: `0 ${thumbSize / 2}px`,
        overflow: 'hidden',
        cursor: 'pointer',
        height: `${thumbSize}px`,
      }}
    >
      <div
        className="slider-container"
        onClick={handleSliderClick}
        style={{
          width: `calc(100% - ${thumbSize}px)`,
          position: 'relative',
          height: ` ${thumbSize}px`,
        }}
      >
        <div
          className="slider-rail"
          ref={sliderRailRef}
          style={{
            width: '100%',
            backgroundColor: 'rgb(238, 238, 238, 0.3)',
            height: `${trackHeight}px`,
            position: 'absolute',
            top: `${thumbSize / 2 - trackHeight / 2}px`,
            left: '0',
            right: '0',
          }}
        />
        <div
          className="slider-track"
          style={{
            height: `${trackHeight}px`,
            position: 'absolute',
            top: `${thumbSize / 2 - trackHeight / 2}px`,
            left: '0',
            right: '0',
            ...getSliderTrackStyle(),
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: `${thumbSize}px`,
            height: ` ${thumbSize}px`,
            cursor: 'pointer',
            borderRadius: '50%',
            ...getSliderThumbStyle(),
          }}
          className={cx('slider-thumb')}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default Slider;
