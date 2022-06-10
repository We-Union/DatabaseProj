// 请求体类型
export interface Login {
    req : {
        username : string,
        password : string,
    },
    res : {
        id : number,
        username : string,
        name : string,
        email : string,
        status : number,        // （1表示学生，2表示管理员）
        created_at : string,
        last_login : string,
    }
}

export interface SignUp {
    req : {
        username : string,
        password : string,
        email : string,
        name : string,
    },
    res : {}
};

export interface QueryMyInfo {
    req : {},
    res : {
        id : number,
        username : string,
        name : string,
        email : string,
        status : number,        // （1表示学生，2表示管理员）
        created_at : string,
        last_login : string,
    }
};

export interface UpdateMyInfo {
    req : {
        name : string,
        email : string,
    },
    res : {}
};

export interface ResetPassword {
    req : {
        username : string,
        validation : string,
        password : string,
    },
    res : {}
};

export interface Logout {
    req : {},
    res : {}
};

export interface Item {
    id : number,
    name : string,
    created_at : string,
};

export interface CreateReward {
    req : {
        name : string,
        rank : string,
        host : string,
        date : string,
    },  
    res : {}
};

export interface DeleteReward {
    req : {
        id : number
    },
    res : {}
};

export interface QueryReward {
    req : {
        id : number
    },
    res : {
        name : string,
        rank : string,
        host : string,
        date : string,
        file : string
    }
};

export interface UpdateReward {
    req : {
        id : number,
        name : string,
        rank : string,
        host : string,
        date : string,
    },
    res : {}
};

export interface UploadReward {
    req : {
        id : number,
        file : FormData,
    },
    res : {}
};

export interface DownloadReward {
    req : {
        id : number
    },
    res : {}
};

export interface QueryRewardList {
    req : {
        start : number,
        end : number
    },
    res : {
        totalNum : number,
        items : Array<Item>,
    }
};

export interface CreateResume {
    req : {
        name : string,
        target : string,
    },
    res : {}
};

export interface DeleteResume {
    req : {
        id : number
    },
    res : {}
};

export interface QueryResume {
    req : {
        id : number
    },
    res : {
        name : string,
        target : string,
        file : string
    }
};

export interface UpdateResume {
    req : {
        id : number,
        name : string,
        target : string,
    },
    res : {}
};

export interface QueryMyResume {
    req : {
        start : number,
        end : number
    },
    res : {
        totalNum : number,
        items : Array<Item>,
    }
};

export interface DownloadResume {
    req : {
        id : number,
    },
    res : {}
};

export interface UploadResume {
    req : {
        id : number,
        file : FormData,
    },
    res : {}
};

export interface Logout {
    req : {},
    res : {}
};

export enum Operator {
    CREATE = 0,
    QUERY,
    UPDATE,
    DELETE,
};

// 在store中使用
export interface State {
    ok : boolean,
    LoginStatus : boolean,
    ShowCreateReward : boolean,
    ShowCreateResume : boolean,
    CurRewardID : number,
    CurResumeID : number,
    CurMode : number,
    loginInfo : Login['res'],
    query_reward : QueryReward['res'],
    query_reward_list : QueryRewardList['res'],
    query_resume : QueryResume['res'],
    query_myresume : QueryMyResume['res'],
};