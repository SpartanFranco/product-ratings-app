// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToCloudinary } from '@/actions/images/upload-image';

export async function POST(req: NextRequest) {
	const data = await req.formData();
	const file = data.get('file') as File;

	if (!file || typeof file === 'string') {
		return NextResponse.json(
			{ ok: false, error: 'Archivo no válido' },
			{ status: 400 },
		);
	}

	const result = await uploadImageToCloudinary(file);
	if (!result.ok) {
		return NextResponse.json(
			{ ok: false, error: result.error },
			{ status: 500 },
		);
	}

	return NextResponse.json({
		ok: true,
		url: result.url,
		public_id: result.public_id!,
	});
}
