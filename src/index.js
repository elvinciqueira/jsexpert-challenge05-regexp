import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { TextProcessorFacade } from './textProcessorFacade.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const csvDir = join(__dirname, '../docs/projeto-de-lei.csv');
const dataBuffer = await readFile(csvDir);
const data = dataBuffer.toString();
const projects = new TextProcessorFacade(data).getProjectsFromCSV();

console.log(projects);
