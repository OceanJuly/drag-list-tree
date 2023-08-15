import {useDrag} from "react-dnd";

function ListItem({tag}: any) {

    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: {
            dragType: 'tag',
            tagType: 1
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    return (
        <div
            className="tag-item"
            ref={drag}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
            {tag.name}
        </div>
    )
}

export default ListItem