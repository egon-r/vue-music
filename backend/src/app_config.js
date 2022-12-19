import * as path from "path";

const app_config_init = {
    dataDirPath: (new URL("../data", import.meta.url)).pathname,
}

export const app_config = {
    ...app_config_init,
    musicLibraryStreamingPath: path.join(app_config_init.dataDirPath, "music_library_streaming"),
}