import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
	try {
		const { public_id } = await req.json();

		if (!public_id) {
			return NextResponse.json(
				{ ok: false, error: 'ID faltante' },
				{ status: 400 },
			);
		}

		await cloudinary.uploader.destroy(public_id);

		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error('[DELETE_IMAGE]', error);
		return NextResponse.json(
			{ ok: false, error: 'Error al eliminar' },
			{ status: 500 },
		);
	}
}
