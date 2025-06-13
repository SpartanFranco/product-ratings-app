export const deleteTempImageIfNeeded = async (productPublicId?: string) => {
	const public_id = localStorage.getItem('temp_uploaded_public_id');

	// Si no hay imagen temporal o coincide con la actual del producto, no la borres
	if (!public_id || public_id === productPublicId) return;

	try {
		await fetch('/api/delete-image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ public_id }),
		});
	} catch (err) {
		console.error('Error al eliminar imagen temporal:', err);
	} finally {
		localStorage.removeItem('temp_uploaded_public_id');
	}
};
