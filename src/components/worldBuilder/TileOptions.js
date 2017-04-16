import React from 'react';
import { get } from '../../utils/objUtil';
import tileImages, { tileImageElements } from '../../images/tiles';

const TileOptions = ({ tileOptions, setTileOptions }) =>
  <div className="TileOptions">
    <label>
      is wall?
      <input
        type="checkbox"
        onChange={(e) => {
          tileOptions.wall = e.target.checked;
          setTileOptions(tileOptions);
        }}
        checked={ tileOptions.wall || false }
      />
    </label>
    <label>
      <img src={ get(`${tileOptions.icon}.src`, tileImageElements) }/>
      <select
        onChange={(e) => {
          tileOptions.icon = e.target.value;
          setTileOptions(tileOptions);
        }}
      >
        <option value="">Select a tile image</option>
        {
          Object.keys(tileImages).map(imageName => <option value={ imageName } selected={imageName === tileOptions.icon}>{ imageName }</option> )
        }
      </select>
    </label>
    <textarea
      onChange={(e) => {
        try {
          tileOptions.action = JSON.parse(e.target.value);
          setTileOptions(tileOptions);
        } catch(err){
          console.log(err.message);
        }
      }}
    />
  </div>;
  
  export default TileOptions;