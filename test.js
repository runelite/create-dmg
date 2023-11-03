import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectory} from 'tempy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('main', async t => {
	const cwd = temporaryDirectory();

	try {
		await execa(path.join(__dirname, 'cli.js'), [path.join(__dirname, 'fixtures/Fixture.app')], {cwd});
	} catch (error) {
		// Silence code signing failure
		if (!error.message.includes('Code signing failed')) {
			throw error;
		}
	}

	t.true(fs.existsSync(path.join(cwd, 'Fixture 0.0.1.dmg')));
});

test('binary plist', async t => {
	const cwd = temporaryDirectory();

	try {
		await execa(path.join(__dirname, 'cli.js'), [path.join(__dirname, 'fixtures/Fixture-with-binary-plist.app')], {cwd});
	} catch (error) {
		// Silence code signing failure
		if (!error.message.includes('Code signing failed')) {
			throw error;
		}
	}

	t.true(fs.existsSync(path.join(cwd, 'Fixture 0.0.1.dmg')));
});

test('app without icon', async t => {
	const cwd = temporaryDirectory();

	try {
		await execa(path.join(__dirname, 'cli.js'), [path.join(__dirname, 'fixtures/Fixture-no-icon.app')], {cwd});
	} catch (error) {
		// Silence code signing failure
		if (!error.message.includes('Code signing failed')) {
			throw error;
		}
	}

	t.true(fs.existsSync(path.join(cwd, 'Fixture 0.0.1.dmg')));
});
