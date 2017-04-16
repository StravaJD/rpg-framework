export default {
  brush: {
    onMouseDown({tileOptions, selectedDim, tileY, tileX, addTile}) {
      addTile( tileOptions, selectedDim, tileY, tileX );
    },
    onMouseMove({ tileOptions, selectedDim, tileY, tileX, currentY, currentX, addTile, isMouseDown, canvasOptions, setCanvasOptions }) {
      if(isMouseDown && (tileX !== currentX || tileY !== currentY)) {
        addTile(tileOptions, selectedDim, tileY, tileX);
        setCanvasOptions({ ...canvasOptions, currentX: tileX, currentY: tileY});
      }
    }
  },
  rectangle: {
    onMouseUp({ tileOptions, selectedDim, tileY, tileX, startX, startY, addTile }) {
      let minX = Math.min(tileX, startX);
      let maxX = Math.max(tileX, startX);
      let minY = Math.min(tileY, startY);
      let maxY = Math.max(tileY, startY);
      let width = maxX - minX;
      let height = maxY - minY;
      
      addTile( tileOptions, selectedDim, minY, minX, width, height);
    }
  },
  eraser: {
    onMouseDown({selectedDim, tileY, tileX, removeTile}) {
      removeTile( selectedDim, tileY, tileX );
    },
    onMouseMove({ selectedDim, tileY, tileX, currentY, currentX, removeTile, isMouseDown, canvasOptions, setCanvasOptions }) {
      if(isMouseDown && (tileX !== currentX || tileY !== currentY)) {
        removeTile(selectedDim, tileY, tileX);
        setCanvasOptions({ ...canvasOptions, currentX: tileX, currentY: tileY});
      }
    }
  },
  copy: {
    onMouseUp({selectedDim, tileY, tileX, setTileOptions}) {
      console.log(selectedDim, tileX, tileY);
      setTileOptions({dim:selectedDim, y:tileY, x:tileX});
    }
  },
  pan: {
    onMouseMove({setCanvasOptions, canvasOptions, currentX, currentY, x, y, isMouseDown}) {
      if(isMouseDown) {
        canvasOptions.panX = (canvasOptions.panX || 0) + (canvasOptions.currentRealX || x) - x;
        canvasOptions.panY = (canvasOptions.panY || 0) + (canvasOptions.currentRealY || y) - y;
        canvasOptions.currentRealX = x;
        canvasOptions.currentRealY = y;
        setCanvasOptions(canvasOptions);
      }
    },
    onMouseUp({ setCanvasOptions, canvasOptions }) {
      canvasOptions.currentRealX = undefined;
      canvasOptions.currentRealY = undefined;
      setCanvasOptions(canvasOptions);
    }
  }
};
