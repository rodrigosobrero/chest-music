import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import song from 'assets/songs/song.mp3'
import TimelinePlugin from 'https://unpkg.com/wavesurfer.js@7/dist/plugins/timeline.esm.js'

function Waveform({ url }) {
  const waveformRef = useRef();

  useEffect(() => {
    // const wavesurfer = WaveSurfer.create({
    //   container: waveformRef.current,
    //   waveColor: '#646A73',
    //   progressColor: '#646A73',
    //   autoplay: true,
    //   // Set a bar width
    //   barWidth: 2,
    //   // Optionally, specify the spacing between bars
    //   barGap: 1,
    //   // And the bar radius
    //   barRadius: 2,
    // });
    // console.log(wavesurfer)

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#646A73',
      progressColor: '#FFB447',
      url: song,
      minPxPerSec: 10,
      barWidth: 3.4,
      barRadius: 2,
      barGap: 2,
      barHeight: 0.3,
      cursorWidth: 3,
    })
    
    // Initialize the Timeline plugin
    
    // Play on click
    ws.on('interaction', () => {
      ws.play()
    })
    
    // Rewind to the beginning on finished playing
    ws.on('finish', () => {
      ws.setTime(0)
    })
    
    return () => {
      ws.destroy();
    };
  }, [url]);

  return <div id='waveform' ref={waveformRef} style={{ height:'80px',  width: '70%' }}/>;
}

export default Waveform;