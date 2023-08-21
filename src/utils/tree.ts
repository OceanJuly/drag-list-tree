import { cloneDeep } from "lodash"
import {isValidUrl} from "@/utils/validate";
import {isAudio, isImage, isVideo} from "../utils/validate";

export interface TreeNode {
    name: string;
    key: string,
    id: string,
    parentId: string | null,
    type: string | any,
    children?: TreeNode[],
    value?: string
}

// 字符串路径数据转化为 tree 结构
export function path2tree(strArr: Array<string>) {
    const res: any = []
    strArr.forEach((str: string) => {
        const nodeArray = str.startsWith('$$')
            ? str.split('$$').slice(1, str.length)
            : str.split('$$')
        let children = res
        // 循环构建子节点
        for (const i of nodeArray) {
            const node = {
                title: i
            }
            if (children.length === 0) children.push(node)
            let isExist = false
            for (const j in children) {
            if (children[j].title === node.title) {
                if (!children[j].children) {
                    children[j].children = []
                }
                children = children[j].children
                isExist = true
                break
            }
            }
            if (!isExist) {
            children.push(node)
            if (!children[children.length - 1].children) {
                children[children.length - 1].children = []
            }
            children = children[children.length - 1].children
            }
        }
    })
    return formatTreeData(res)
}

// 给树结构添加 key 属性
export function formatTreeData(treeData: any) {
    const find = (arr: any, parentId = '') => {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i].children) && arr[i].children.length > 0) {
          arr[i].key = `${parentId}${i + 1}`
          find(arr[i].children, `${parentId}${i + 1}`)
        } else {
          arr[i].key = `${parentId}${i + 1}`
        }
      }
    }
    const authDataCopy = cloneDeep(treeData)
    find(authDataCopy)
    return authDataCopy
}

// 树结构转JSON
export function convertTreeToJson(nodes: TreeNode[]): string {
    const obj: any = {}
    for (const node of nodes) {
        const { name, value, children } = node
        const childNodes = children ? convertTreeToJson(children) : undefined
        obj[name] = childNodes ? { ...childNodes } : value
    }
    return obj
}

function checkType(str: any) {
    let type = Object.prototype.toString.apply(str).slice(8, -1).toLowerCase()
    /**
     * 如果链接有后缀，需要判断链接的数据类型
     * */
    const isUrl = type === 'string' && isValidUrl(str)
    if (isUrl) {
        const extension = str.split('.').pop()?.toLowerCase()
        // 是否为 image 类型
        if (isImage(extension)) type = 'image'
        // 是否为 audio 类型
        if (isAudio(extension)) type = 'audio'
        // 是否为 video 类型
        if (isVideo(extension)) type = 'video'
    }
    return type
}

// object 数据转化为 tree 数据
type ObjectNode = Record<string, unknown>;
export function buildTree(obj: ObjectNode, parentId?: string) {
    const nodes: TreeNode[] = []
    for (const [key, value]: [string, any] of Object.entries(obj)) {
        const id = Math.random().toString(36).slice(2, 9)
        const type = checkType(value)
        const node: TreeNode = {
            key: id,
            id: id,
            name: key,
            parentId: parentId ? parentId : null,
            type
        }
        if (typeof value === 'object' && value !== null) {
            node.children = buildTree(value as ObjectNode, node.key)
        } else node.value = value
        nodes.push(node)
    }
    return nodes
}

// 格式化 tree 数据
export function FormatTreeData(treeData: any, parentId = null) {
    return treeData.map(node => {
        if (node.children) {
            node.children = FormatTreeData(node.children, node.id)
        }
        let { type } = node
        type = type.toLowerCase()
        if (type === 'integer') type = 'number'
        return {
            ...node,
            type,
            key: node.id,
            parentId: parentId
        }
    })
}

// 通过属性值找到tree相关节点
export function findNodeByKey(tree: TreeNode[], key: string): TreeNode | null {
    for (const node of tree) {
        if (node.key === key) {
            return node;
        }
        if (node.children) {
            const foundNode = findNodeByKey(node.children, key);
            if (foundNode) {
                return foundNode;
            }
        }
    }
    return null;
}

// 通过某个属性名的值删除tree节点
export function deleteNode(tree: TreeNode[], keyName: string, keyVal: any): TreeNode[] {
    return tree.filter(node => {
        if (node[keyName] === keyVal) {
            // 要删除的节点
            return false;
        }
        if (node.children) {
            node.children = deleteNode(node.children, keyName, keyVal);
        }
        return true;
    });
}

// 给tree添加节点
export function addNode(tree: TreeNode[], sourceId: string, newNode: TreeNode): TreeNode[] {
    const {parentId} = newNode
    if (!parentId) {
        const index = tree.findIndex((a) => a.id === sourceId)
        tree.splice(index + 1, 0, newNode)
        return tree
    } else {
        tree.forEach(node => {
            if (node.id === parentId) {
                if (!node.children) {
                    node.children = [];
                    node.children.unshift(newNode);
                } else {
                    const index = node.children.findIndex((a) => a.id === sourceId)
                    node.children.splice(index + 1, 0, newNode)
                }
            } else if (node.children) {
                addNode(node.children, sourceId, newNode);
            }
        });
        return tree
    }
}