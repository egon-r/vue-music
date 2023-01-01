import * as path from "path";
import url from "url";

const app_config_init = {
  dataDirPath: path.join(path.dirname(url.fileURLToPath(import.meta.url)), "../data"),
};

export const app_config = {
  ...app_config_init,
  musicLibraryDir: path.join(app_config_init.dataDirPath, "music_library", "stream"),
  transcodingDir: path.join(app_config_init.dataDirPath, "music_library", "_transcoding"),
};
