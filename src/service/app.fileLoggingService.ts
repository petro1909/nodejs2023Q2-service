import fs from 'fs/promises';
import path from 'path';
export class FileLoggingService {
  private currentLogDirectory: string;
  private currentLogFileName: string;
  private maxLogFileSizekb: number;
  constructor(directoryPath: string, fileName: string, maxSize: number) {
    this.currentLogDirectory = path.resolve(process.cwd(), directoryPath);
    this.currentLogFileName = fileName;
    this.maxLogFileSizekb = maxSize;
  }

  public async write(data: string): Promise<void> {
    const currentLogFilePath = path.resolve(this.currentLogDirectory, this.currentLogFileName);
    let fileSizekB = 0;
    try {
      const fileStats = await fs.stat(currentLogFilePath);
      fileSizekB = fileStats.size / 1024;
    } catch (err) {
      await fs.mkdir(this.currentLogDirectory, { recursive: true });
    }
    if (fileSizekB >= this.maxLogFileSizekb) {
      try {
        const dirItems = await fs.readdir(this.currentLogDirectory, { withFileTypes: true });
        const fileNumbers = [];
        fileNumbers.push(0);
        dirItems.forEach((ditItem) => {
          const underscopeIndex = ditItem.name.indexOf('_') + 1;
          if (underscopeIndex !== 0 && ditItem.isFile()) {
            const fileNameWithoutExtension = path.parse(ditItem.name).name;
            const fileNameNumber = fileNameWithoutExtension.slice(underscopeIndex);
            fileNumbers.push(+fileNameNumber);
          }
        });
        const maxFileNumber = Math.max(...fileNumbers);
        const oldLogFileName = `${this.currentLogFileName}_${maxFileNumber + 1}.log`;
        await fs.rename(currentLogFilePath, path.resolve(this.currentLogDirectory, oldLogFileName));
      } catch (err) {
        console.error(err);
      }
    }
    try {
      await fs.appendFile(currentLogFilePath, `${data}\n`, 'utf-8');
    } catch (err) {
      console.error();
    }
  }
}
