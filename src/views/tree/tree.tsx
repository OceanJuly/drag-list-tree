import './tree.less'
import {useDrag, useDrop} from "react-dnd";
import {Tree} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {treeData} from "./const.ts";
import TreeItem from "./tree-item.tsx";

function ZfTree() {

    const [{ isOver }, drag] = useDrop({
        accept: 'item',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    function titleRender(nodeData: any) {
        console.log(nodeData);
        return (
            <div ref={drag}>nodeData.title</div>
        )
    }

    return (
        <div className="zf-tree-wrap" ref={drag}>
            <Tree
                showLine
                blockNode={true}
                switcherIcon={<DownOutlined />}
                defaultExpandedKeys={['0-0-0']}
                treeData={treeData}
                titleRender={titleRender}
                style={{ background: isOver ? '#FFAA00' : '#FFFFFF' }}
            />
        </div>
    )
}

export default ZfTree