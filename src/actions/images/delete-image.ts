import cloudinary from '@/lib/cloudinary';

export const deleteImage = async (public_id: string) => {
	try {
		await cloudinary.uploader.destroy(public_id);

		return { ok: true };
	} catch (error) {
		console.error('[DELETE_IMAGE]', error);
		return { ok: false, error: 'Error al eliminar' };
	}
};
