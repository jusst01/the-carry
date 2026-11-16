/**
 * The Carry - LAUNCH.json propagator
 * Copies LAUNCH.json from source bot directory to output directory.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

function propagateConfig(): void {
    const sourceRoot = process.env.MAKEFUN_BOT_DIR ?? '.';
    const destinationRoot = process.env.MAKEFUN_OUTPUT_DIR ?? 'out';

    const sourcePath = path.resolve(sourceRoot, 'LAUNCH.json');
    const resolvedDestDir = path.resolve(destinationRoot);
    const destinationPath = path.join(resolvedDestDir, 'LAUNCH.json');

    if (!fs.existsSync(resolvedDestDir)) {
        fs.mkdirSync(resolvedDestDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, destinationPath);
}

try {
    propagateConfig();
} catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    process.stderr.write(errorMessage + '\n');
    process.exit(1);
}
