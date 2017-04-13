export default {
  brush: {
    onMouseDown(tile, dim, y, x, addTile) {
      console.log(dim);
      addTile( tile, dim, y, x );
    },
    onMouseMove(tile, dim, y, x, isMouseDown, addTile) {
      if(isMouseDown){
        addTile( tile, dim, y, x );
      }
    }
  },
  rectangle: {
    onMouseUp({ tile, dim, y, x, startX, startY, addTile }) {
      let minX = Math.min(x, startX);
      let maxX = Math.max(x, startX);
      let minY = Math.min(y, startY);
      let maxY = Math.max(y, startY);
      let width = maxX - minX;
      let height = maxY - minY;
      
      addTile( tile, dim, minY, minX, width, height);
    }
  },
  eraser: {
    onMouseDown(tile, dim, y, x, removeTile) {
      removeTile( dim, y, x );
    },
    onMouseMove(tile, dim, y, x, isMouseDown, removeTile) {
      if(isMouseDown){
        removeTile( dim, y, x );
      }
    }
  },
  copy: {
    onMouseUp({dim, y, x, setTileOptions}) {
      setTileOptions({dim, y, x});
    }
  }
};
