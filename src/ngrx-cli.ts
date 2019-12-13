
import { IPath } from './models/path';
import { writeFiles } from './file-utils';
import * as path from 'path';
import { Config } from './config';

export class NgrxCli {

  private getLoc(loc: IPath) {
    loc.dirName = loc.fileName + '-' + Config.DIR_NAME;
    loc.dirPath = path.join(loc.dirPath, loc.dirName);
    return loc;
  }

  public generateFeatureStore = (loc: IPath) => {
    loc = this.getLoc(loc);
    writeFiles(loc);
  }
}
