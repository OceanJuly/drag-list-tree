import {useDragLayer} from "react-dnd";
import type { XYCoord } from 'react-dnd';
import './custom-drag-layout.less'
import {CSSProperties} from "react";

function CustomDragLayer() {
    const { itemType, isDragging, item, initialOffset, currentOffset  } =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }));

    const layerStyles: CSSProperties = {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0
    };

    function snapToGrid(x: number, y: number): [number, number] {
        const snappedX = Math.round(x / 32) * 32;
        const snappedY = Math.round(y / 32) * 32;
        return [snappedX, snappedY];
    }

    function getItemStyles(
        initialOffset: XYCoord | null,
        currentOffset: XYCoord | null,
        isSnapToGrid: boolean
    ) {
        if (!initialOffset || !currentOffset) {
            return {
                display: 'none',
            };
        }

        let { x, y } = currentOffset;

        if (isSnapToGrid) {
            x -= initialOffset.x;
            y -= initialOffset.y;
            [x, y] = snapToGrid(x, y);
            x += initialOffset.x;
            y += initialOffset.y;
        }

        const transform = `translate(${x}px, ${y}px)`;
        return {
            transform,
            WebkitTransform: transform,
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        };
    }

    function renderItem() {
        if (!itemType) return null
        switch (item.dragType) {
            case 'node': {
                const text = item.value ? `${item.name}: ${item.value}` : item.name
                return <div className="card_drag">{text}</div>
            }
            case 'tag':
                return <div className="card_drag">{item.name}</div>
            default:
                return null;
        }
    }

    if (!isDragging) {
        return null;
    }

    return (
        <div style={{...layerStyles}}>
            <div  className="custom-drag-layout-wrap" style={getItemStyles(initialOffset, currentOffset, true)}>
                {renderItem()}
            </div>
        </div>
    )
}

export default CustomDragLayer