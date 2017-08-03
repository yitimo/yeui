export enum PlayOrder {
    LINE, // 顺序
    SINGLE, // 单曲
    RANDOM, // 随机
    AROUND // 循环
}

export interface Audio {
    Id?: number; // 标识
    Title?: string; // 标题
    Album?: string; // 专辑
    Artist?: string; // 艺术家
    Desc?: string; // 描述
    Duration?: number; // 时长
    Cover?: string; // 封面
    Src: string; // 播放源
}

export interface PlayData {
    Playing: boolean;
    Progress: number; // 当前时长
    Order: PlayOrder; // 播放顺序
    Index: number; // 当前播放的索引
    Data: number; // 加载的数据(时间)
}
