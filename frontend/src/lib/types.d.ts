type Note = {
    noteId: string;
    postId: string;
    language: string;
    topics: {
        topicId: number;
        label: {
            [language: string]: string;
        };
        referenceCount: number;
    }[];
    summary: string;
    createdAt: number;
};

type Post = {
    postId: string;
    xUserId: string;
    xUser: {
        userId: string;
        name: string;
        profileImage: string;
        followersCount: number;
        followingCount: number;
    };
    text: string;
    mediaDetails: string[];
    createdAt: number;
    likeCount: number;
    repostCount: number;
    impressionCount: number;
};