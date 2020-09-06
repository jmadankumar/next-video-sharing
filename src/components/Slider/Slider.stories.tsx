import React, { useState } from 'react';
import Slider from './Slider';

export default {
  title: 'Slider',
};

export const slider = () => {
  const [value, setValue] = useState(10);

  return <Slider value={value} max={100} onChange={(val) => setValue(val)} />;
};
