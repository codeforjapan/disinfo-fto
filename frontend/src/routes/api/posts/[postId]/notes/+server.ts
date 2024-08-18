import type { Note } from '$lib/types.js';
import { json } from '@sveltejs/kit';

const BASE_URL = 'https://birdxplorer.onrender.com';

export const GET = async ({ params }) => {
    const postId = params.postId;
    const res = await fetch(`${BASE_URL}/api/v1/data/notes?post_ids=${postId}&language=ja`).then(res => res.json())
    return json({
        notes: res.data as Note[]
    })
}