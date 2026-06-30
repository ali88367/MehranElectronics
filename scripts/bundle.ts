import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

const output = fs.createWriteStream(path.join(publicDir, 'source-code.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Append files from the current directory, excluding node_modules, .git, dist, and the zip file itself
archive.glob('**/*', {
  cwd: process.cwd(),
  ignore: ['node_modules/**', '.git/**', 'dist/**', 'public/source-code.zip', '.DS_Store']
});

archive.finalize();
