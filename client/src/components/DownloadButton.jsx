import React from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@nextui-org/react';

function downloadImage(dataUrl) {
    const a = document.createElement('a');
  
    a.setAttribute('download', 'evidence_graph.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }

export default function DownloadButton() {
    const onClick = () => {
      toPng(document.querySelector('.react-flow'), {
        filter: (node) => {
          if (
            node?.classList?.contains('react-flow__minimap') ||
            node?.classList?.contains('react-flow__controls')
          ) {
            return false;
          }
  
          return true;
        },
      }).then(downloadImage);
    };
  
    return (
    <div className='absolute top-8 right-8'>
      <Button size="sm" onClick={onClick}>
        Download Image
      </Button>
    </div>
    );
  }