import type { NextConfig } from 'next';
import { hostname } from 'os';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ['localhost', 'res.cloudinary.com'],
		remotePatterns: [
			{
				hostname: 'res.cloudinary.com',
				protocol: 'https',
			},
		],
	},
};

export default nextConfig;
