import fs from 'fs';
import path from 'path';

/**
 * Uploads a file to the specified directory within the public/uploads folder.
 *
 * The function generates a unique filename based on the current date and time,
 * and formats it by removing spaces and replacing them with underscores. The
 * file is then saved as a buffer in the designated directory.
 *
 * @param {File} file - The file object to be uploaded.
 * @param {string} DIR_NAME - The directory name within the uploads folder where the file will be saved.
 * @returns {promise<string>} - The relative path to the uploaded file.
 */
export async function uploadFile(file, DIR_NAME) {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:T.]/g, '')
    .slice(0, 14);

  const filename = `${formattedDate}-${file?.name?.replace(/\s+/g, '_')?.toLocaleLowerCase()}`;
  const bufferFile = Buffer.from(await file?.arrayBuffer());
  const uploadDir = path.resolve(
    process.cwd(),
    'storage',
    'uploads',
    DIR_NAME,
    filename
  );

  fs.writeFileSync(uploadDir, bufferFile);
  return `/uploads/${DIR_NAME}/${filename}`;
}
