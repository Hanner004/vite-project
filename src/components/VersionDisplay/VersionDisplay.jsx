import React, { useState, useEffect } from 'react';

const VersionDisplay = ({ version }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isVisible ? (
    <div style={styles.container}>
      <p className="p-0 m-0">&nbsp;v{version}&nbsp;</p>
    </div>
  ) : null;
};

const styles = {
  container: {
    position: 'fixed',
    bottom: 0,
    right: 0,
  },
};

export default VersionDisplay;
