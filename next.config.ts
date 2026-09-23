import type { NextConfig } from 'next';

const isPagesExport = process.env.PAGES_EXPORT === '1';
const basePath = isPagesExport ? process.env.PAGES_BASE_PATH || '' : '';

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPagesExport ? { output: 'export', basePath, images: { unoptimized: true } } : {}),
};

export default nextConfig;
