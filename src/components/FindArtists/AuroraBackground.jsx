import React, { useEffect, useRef, useState } from 'react';

let layerId = 0;

const buildGradient = ([c1, c2, c3, c4]) => ({
  backgroundImage: `
    radial-gradient(38% 38% at 12% 18%, ${c1}b3 0%, transparent 70%),
    radial-gradient(42% 42% at 88% 12%, ${c2}a6 0%, transparent 72%),
    radial-gradient(48% 46% at 80% 88%, ${c3}99 0%, transparent 72%),
    radial-gradient(40% 40% at 15% 85%, ${c4}8f 0%, transparent 70%)
  `,
});

// Renders a softly animated, blurred gradient ("aurora") built from the
// supplied palette. When the palette changes, the new gradient fades in on
// top of the previous one so color changes feel alive instead of jarring.
const AuroraBackground = ({ colors }) => {
  const [layers, setLayers] = useState(() => [
    { id: layerId++, style: buildGradient(colors), visible: true },
  ]);
  const timersRef = useRef([]);
  const paletteKey = colors.join('|');

  useEffect(() => {
    const newLayer = { id: layerId++, style: buildGradient(colors), visible: false };
    setLayers((prev) => [...prev, newLayer]);

    const showTimer = setTimeout(() => {
      setLayers((prev) =>
        prev.map((layer) => (layer.id === newLayer.id ? { ...layer, visible: true } : layer))
      );
    }, 30);

    const cleanupTimer = setTimeout(() => {
      setLayers((prev) => prev.filter((layer) => layer.id === newLayer.id));
    }, 2000);

    timersRef.current.push(showTimer, cleanupTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paletteKey]);

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  return (
    <div className="aurora-bg" aria-hidden="true">
      {layers.map((layer, index) => (
        <div
          key={layer.id}
          className={`aurora-layer aurora-layer-${index % 3} ${layer.visible ? 'is-visible' : ''}`}
          style={layer.style}
        />
      ))}
      <div className="aurora-grain" />
      <div className="aurora-vignette" />
    </div>
  );
};

export default AuroraBackground;
