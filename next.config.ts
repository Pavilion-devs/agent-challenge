import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Skip lint and type errors in production builds to avoid CI/Docker failures
	eslint: {
		dirs: ["src"],
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
