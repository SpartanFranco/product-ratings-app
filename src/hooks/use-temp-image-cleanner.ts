import { useEffect } from 'react';

export const useTempImageCleaner = (shouldCleanup: boolean) => {
	useEffect(() => {
		const handleBeforeUnload = async () => {
			if (!shouldCleanup) return;

			const public_id = localStorage.getItem('temp_uploaded_public_id');
			if (public_id) {
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
			}
		};

		// Limpieza si el usuario sale o desmonta el componente
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			handleBeforeUnload();
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [shouldCleanup]);
};
