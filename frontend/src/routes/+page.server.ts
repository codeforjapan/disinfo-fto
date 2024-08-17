import getDataFromTweetUrl from '$lib/server/getDataFromTweetUrl';
import { fail } from '@sveltejs/kit';

// sample data
const sampleNote = { "noteId": "1814294699265651101", "postId": "1813861500261679581", "language": "ja", "topics": [{ "topicId": 28, "label": { "ja": "人権", "en": "Humanrights" }, "referenceCount": 4835 }, { "topicId": 53, "label": { "ja": "交通", "en": "mobility" }, "referenceCount": 320 }, { "topicId": 54, "label": { "ja": "観光", "en": "travel" }, "referenceCount": 426 }], "summary": "このアカウントは青春18きっぷ廃止説をデッチ上げた人物です。鉄道以外の交通機関、駐車場、宿泊パックなどの背景を伏せたまま意見を誘導するあくどい輩なので、通報が推奨です。https://www.hinatazaka46.com/s/official/page/hinata_fes2024", "createdAt": 1721396538928 }
const samplePosts = [{ "postId": "1578923456789012345", "xUserId": "2345678901234567890", "xUser": { "userId": "2345678901234567890", "name": "山田花子", "profileImage": "https://pbs.twimg.com/profile_images/2345678901234567890/hanako_yamada_normal.jpg", "followersCount": 3456, "followingCount": 1234 }, "text": "今日の夕焼けが綺麗すぎて思わず撮影してしまいました。皆さんも空を見上げてみてください。#夕焼け#癒し", "mediaDetails": ["https://pbs.twimg.com/media/BeautifulSunset1.jpg", "https://pbs.twimg.com/media/BeautifulSunset2.jpg"], "createdAt": 1691234567000, "likeCount": 789, "repostCount": 123, "impressionCount": 5678 }, { "postId": "1687654321098765432", "xUserId": "3456789012345678901", "xUser": { "userId": "3456789012345678901", "name": "陳美麗", "profileImage": "https://pbs.twimg.com/profile_images/3456789012345678901/meili_chen_normal.jpg", "followersCount": 8901, "followingCount": 2345 }, "text": "今天去了九份老街，真是太有趣了！古色古香的街道和美食讓人流連忘返。大家有機會一定要來看看喔！#九份#台灣旅遊", "mediaDetails": ["https://pbs.twimg.com/media/JiufenStreet1.jpg", "https://pbs.twimg.com/media/JiufenFood1.jpg"], "createdAt": 1698765432000, "likeCount": 1234, "repostCount": 456, "impressionCount": 9012 }]

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const url = formData.get('url');
        if (!url || typeof url !== 'string') {
            return fail(400, {
                success: false,
                data: null,
                notes: [],
                posts: []
            })
        }
        const data = await getDataFromTweetUrl(url);
        return {
            success: true,
            data,
            notes: Array.from({ length: 2 }, (_, i) => (sampleNote)),
            posts: samplePosts
        }
    }
}