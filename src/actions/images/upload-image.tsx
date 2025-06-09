'use server';

import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import cloudinary from '@/lib/cloudinary';

type UploadResult =
	| { ok: true; url: string; public_id: string }
	| { ok: false; error: string };

export async function uploadImageToCloudinary(
	file: File,
): Promise<UploadResult> {
	try {
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Guardar el archivo temporalmente (opcional)
		const tmpPath = path.join('/tmp', `${randomUUID()}-${file.name}`);
		await writeFile(tmpPath, buffer);

		const uploadResult = await new Promise<{ url: string; public_id: string }>(
			(resolve, reject) => {
				cloudinary.uploader
					.upload_stream({ folder: 'products' }, (error, result) => {
						if (error || !result) return reject(error);
						resolve({ url: result.secure_url, public_id: result.public_id });
					})
					.end(buffer);
			},
		);

		return {
			ok: true,
			...uploadResult,
		};
	} catch (error) {
		console.error('[UPLOAD_IMAGE]', error);
		return {
			ok: false,
			error: 'Error al subir la imagen',
		};
	}
}
