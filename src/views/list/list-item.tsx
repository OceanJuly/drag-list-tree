import {useDrag} from "react-dnd";
import {useEffect} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";

function ListItem({tag}: any) {

    const [{ isDragging }, drag, preview] = useDrag({
        type: 'item',
        item: {
            dragType: 'tag',
            tagType: 1,
            name: tag.name
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true }); // 隐藏拖拽dom
    }, []);

    return (
        <>
            <div
                className="tag-item"
                ref={drag}
                style={{ opacity: isDragging ? 0.5 : 1 }}>
                {tag.name}
            </div>
        </>
    )
}

export default ListItem