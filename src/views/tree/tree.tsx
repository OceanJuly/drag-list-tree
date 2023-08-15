import './tree.less'
import {Tree} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {treeData} from "./const.ts";
import TreeItem from "./tree-item.tsx";
import {useState} from "react";

function ZfTree(props: any) {
    const [expandedKeys, setExpandedKeys] = useState(['0-0-0'])

    function TitleRender(nodeData: any) {
        return (
            <TreeItem
                nodeData={nodeData}
                updateTreeData={updateTreeData}
                packUpChild={packUpChild}
            ></TreeItem>
        )
    }

    function updateTreeData(tar: any, source: any) {
        console.log(tar);
        console.log(source);
    }

    function packUpChild(key: string) {
        setExpandedKeys(expandedKeys.filter((keyStr: string) => keyStr !== key))
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
                fieldNames={{
                    key: 'id'
                }}
                titleRender={TitleRender}
            />
        </div>
    )
}

export default ZfTree