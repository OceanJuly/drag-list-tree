import {useDrag} from "react-dnd";
import {useEffect} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";

function ListItem({tag}: any) {

    const [{ isDragging }, drag, preview] = useDrag({
        type: 'item',
        item: {
            dragType: 'tag',
            tagType: 1,
            ...tag
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
                style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: tag.color ? tag.color : '#ccc' }}>
                <div className="tag-image">
                    <span className={`iconfont icon-${tag.icon}`} style={{fontSize: '14px'}}></span>
                </div>
                <div className="tag-name">{tag.name}</div>
            </div>
        </>
    )
}

export default ListItem