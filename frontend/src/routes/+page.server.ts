import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const url = formData.get('url');
        if (!url || typeof url !== 'string') {
            return fail(400, {
                message: 'Invalid URL'
            })
        }
        return {
            url: url
        }
    }
}