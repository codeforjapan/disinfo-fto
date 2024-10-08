import getDataFromTweetUrl from '$lib/server/getDataFromTweetUrl';
import { fail } from '@sveltejs/kit';

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
            data
        }
    }
}