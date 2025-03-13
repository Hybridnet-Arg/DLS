import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const HANDLE_STYLE = { visibility: 'visible' };

function CustomNode({ data: { label, connection = false } }) {
  return (
    <>
      {label}
      {connection && (
        <>
          <Handle
            type="source"
            position={Position.Top}
            id="a"
            style={HANDLE_STYLE}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="b"
            style={HANDLE_STYLE}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="c"
            style={HANDLE_STYLE}
          />
          <Handle
            type="source"
            position={Position.Left}
            id="d"
            style={HANDLE_STYLE}
          />
        </>
      )}
    </>
  );
}

CustomNode.displayName = 'CustomNode';

export default memo(CustomNode);
