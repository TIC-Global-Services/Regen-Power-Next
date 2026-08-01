

async function getValidMediaSrc(src: string, fallback: string ) {
    if (!src) return fallback;
    try {
        const res = await fetch(src, { method: 'HEAD' });
        return res.ok ? src : fallback;
    } catch {
        return fallback;
    }
}
export default getValidMediaSrc;