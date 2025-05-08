import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import { readFile } from 'fs/promises';

export async function GET(_req, { params }) {
  try {
    const rootDir = path.resolve(process.cwd(), 'storage/uploads');
    const filePath = path.join(rootDir, ...params.paths);

    if (!fs.existsSync(filePath)) throw new Error('File not found');

    const bytes = await readFile(filePath);
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    return new Response(bytes, {
      headers: {
        'Content-Type': mimeType,
      },
      status: 200,
    });
  } catch (error) {
    return new Response(
      error instanceof Error ? error?.message : 'Error retrieving the file',
      {
        status: 500,
      }
    );
  }
}
