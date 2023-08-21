export interface tagProp {
    id: number,
    name: string,
    value: string,
    icon: string,
    color: string,
    type: string,
    defaultVal?: string | number | boolean
}

export const list: Array<tagProp> = [
    {
        id: 1,
        name: 'Text',
        value: 'text',
        icon: 'text',
        type: 'string',
        color: 'rgb(221, 221, 221)',
        defaultVal: ''
    },
    {
        id: 2,
        name: 'Password',
        value: 'password',
        icon: 'password',
        type: 'password',
        color: 'rgb(221, 221, 221)',
        defaultVal: ''
    },
    {
        id: 3,
        name: 'Number',
        value: 'int',
        icon: 'number',
        type: 'number',
        color: 'rgb(221, 221, 221)',
        defaultVal: 0
    },
    {
        id: 4,
        name: 'Bool',
        value: 'check',
        type: 'boolean',
        icon: 'itea-checkbox',
        color: 'rgb(166, 187, 207)',
        defaultVal: false
    },
    {
        id: 5,
        name: 'Array',
        value: 'array',
        type: 'array',
        icon: 'array',
        color: 'rgb(243, 181, 103)'
    },
    {
        id: 6,
        name: 'Object',
        value: 'obj',
        type: 'object',
        icon: 'object',
        color: 'rgb(243, 181, 103)'
    },
    {
        id: 7,
        name: 'Image',
        value: 'image',
        icon: 'Image',
        type: 'image',
        color: 'burlywood',
        defaultVal: ''
    },
    {
        id: 8,
        name: 'Audio',
        value: 'audio',
        icon: 'audio',
        type: 'audio',
        color: 'burlywood',
        defaultVal: ''
    },
    {
        id: 9,
        name: 'Video',
        value: 'video',
        type: 'video',
        icon: 'video',
        color: 'burlywood',
        defaultVal: ''
    }
]