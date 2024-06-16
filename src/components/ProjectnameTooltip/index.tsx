import React, { useState, useRef, useEffect } from 'react';
import { Tooltip } from 'antd';

interface Props {
    text: any;
}

const ProjectNameTooltip = ({ text }: Props) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const { current } = textRef;
    if (current) {
      setIsOverflowed(current.scrollHeight > current.clientHeight);
    }
  }, [text]);

  return (
    <Tooltip overlayClassName="tooltip-white" title={isOverflowed ? text : ''}>
      <h2 className="title_project_modal" ref={textRef}>
        {text}
      </h2>
    </Tooltip>
  );
};

export default ProjectNameTooltip;
