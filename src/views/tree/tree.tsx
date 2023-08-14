import './tree.less'
import {Tree} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {treeData} from "./const.ts";
import TreeItem from "./tree-item.tsx";
import {useState} from "react";

function ZfTree() {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0'])
    function TitleRender(nodeData: any) {
        return (
            <TreeItem nodeData={nodeData} updateTreeData={updateTreeData}></TreeItem>
        )
    }

    function updateTreeData(tarInfo: any) {
        console.log(tarInfo);
    }

    function handleTreeExpand(keys: Array<string>) {
        setExpandedKeys(keys)
    }

    return (
        <div className="zf-tree-wrap">
            <Tree
                showLine
                blockNode={true}
                switcherIcon={<DownOutlined />}
                expandedKeys={expandedKeys}
                onExpand={handleTreeExpand}
                treeData={treeData}
                titleRender={TitleRender}
            />
        </div>
    )
}

export default ZfTree