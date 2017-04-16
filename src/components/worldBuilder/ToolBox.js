import React from 'react';

const ToolBox = ({ tools, selectedTool, selectTool }) =>
  <div className="ToolBox">
    {
      tools.map((tool, index) =>
        <div
          className={`ToolBox-Tool ${selectedTool && selectedTool.id === tool.id ? 'is-selected' : '' }`}
          title={ tool.description }
          onClick={ () => selectTool(tool) }
        >
          { tool.id }
        </div>
      )
    }
  </div>;

export default ToolBox;