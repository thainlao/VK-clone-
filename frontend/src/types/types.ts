export interface AuthState {
    user: null | IUser;
    users: IUser[];
    token: string | null;
    isLoading: Boolean;
    status: string | null;
    avatar: string | null
    name: string | null,
    surname: string | null,
}

export interface IJoin {
    userId: string;
    groupId: string;
}

export interface PostState {
    posts: any[]
    popularPosts: any[],
    isLoading: boolean,
}

export interface IUser {
    _id: string;
    id: string;
    username: string;
    password: string;
    avatar: string;
    name: string | null,
    surname: string | null,
}

export interface RegisterUserParams {
    username: string;
    password: string;
    name: string;
    surname: string;
}

export interface RegisterUserResponse {
    user: IUser;
    token: string;
    message: string;
    name: string;
    surname: string
}

export type Post = {
    _id: string;
    username: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    author: any;
    comments: Array<Comment>;
    createdAt: string;
    updatedAt: string;
    likes: any | null;
};

export type Comment = {
    comment: string;
    _id: string;
    author: string;
    createdAt: string;
};

export interface IComments {
    comments: Comment[],
    loading: Boolean;
    user: IUser | null;
}

export interface CreateCommentParams {
    postId: string;
    comment: string;
    userId: string | null
}

export interface JoinGroupParams {
    groupId: string
    userId: string | null
}

export interface IGroup {
    _id: string;
    name: string;
    username: string;
    thema: string
    description: string;
    avatar: string;
    members: any[]
    author: string;
}