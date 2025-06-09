// app/api/test-cloudinary/route.ts
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const result = await cloudinary.api.ping();
		return NextResponse.json({ ok: true, result });
	} catch (error) {
		return NextResponse.json({ ok: false, error });
	}
}
