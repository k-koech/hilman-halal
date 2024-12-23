import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ReadMore({ text }) {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const toggleFullText = () => {
    setIsFullTextVisible(!isFullTextVisible);
  };

  const words = text.split(' ');
  const displayText = isFullTextVisible ? text : words.slice(0, 40).join(' ');

  return (
    <div>
      <p>{displayText}...</p>
      {!isFullTextVisible && (
        <p onClick={toggleFullText} className='text-blue-800 hover:text-blue-600'>
          Read More
        </p>
      )}
    </div>
  );
}

export default ReadMore;
