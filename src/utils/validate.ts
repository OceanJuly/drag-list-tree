// 链接是否是图片
export const isImage = (url: string): boolean => {
    return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url)
}

// 链接是否是音频
export const isAudio = (url: string): boolean => {
    return /\.(mp3|wav)$/i.test(url)
}

// 链接是否是视频
export const isVideo = (url: string): boolean => {
    return /\.(mp4|avi|mov|wmv)$/i.test(url)
}

// 判断链接是否合法
export const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp('^https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*$')
    return pattern.test(url)
}