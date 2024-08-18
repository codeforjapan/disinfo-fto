import getDataFromTweetUrl from '$lib/server/getDataFromTweetUrl';
import { fail } from '@sveltejs/kit';

// sample data
const samplePosts = [{ "postId": "1812272491978797094", "xUserId": "4890497530", "xUser": { "userId": "4890497530", "name": "Rupendartarar", "profileImage": "https://pbs.twimg.com/profile_images/1785887295977189376/sq8lJCWP_normal.jpg", "followersCount": 3839, "followingCount": 3339 }, "text": "発砲事件安倍さんの時\n複数の発砲音耳のあたり\n大谷翔平が安倍さんのことホモよ\nシンゾークソモラシタネゲリジル\n耳の付近トランプ大統領候補演説会場\nバイデン支持者シークレットサービスまた\n拳突き上げ東部ペンシルベニア州あと数センチんぽ\n耳のあたりけがの可能性自作自演trumpvqp", "mediaDetails": null, "createdAt": 1720914407000, "likeCount": 0, "repostCount": 0, "impressionCount": 2577 }, { "postId": "1812251983363096729", "xUserId": "1153082774166761472", "xUser": { "userId": "1153082774166761472", "name": "MoeFukada", "profileImage": "https://pbs.twimg.com/profile_images/1771433393273843712/m4e8n1Ts_normal.jpg", "followersCount": 108614, "followingCount": 2 }, "text": "トランプ前大統領\n銃声のあと、首を押されて倒れる。ＳＰが心臓マッサージを始める様子が見える。\nそれ以上は分からない。https://t.co/ggRQSe052J", "mediaDetails": null, "createdAt": 1720909517000, "likeCount": 3062, "repostCount": 961, "impressionCount": 7777157 }]

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
            posts: samplePosts
        }
    }
}