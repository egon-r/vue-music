<script>
import axios from "axios";
import emitter, { MusicLibraryEvents } from "@/services/emitter";
import { backend_base_url } from "@/main";

export default {
  data: () => {
    return {
      uploadProgress: 0.0,
    };
  },
  methods: {
    upload(e) {
      this.$refs["uploadButton"].disabled = true;
      e.preventDefault();
      const formData = new FormData(this.$refs["uploadForm"]);
      axios
        .post(backend_base_url + "/v1/library/add", formData, {
          onUploadProgress: (event) => {
            this.uploadProgress = event.progress * 100;
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          emitter.emit(MusicLibraryEvents.modified);
          this.$refs["uploadButton"].disabled = false;
        })
        .catch((err) => {
          console.error(err);
          this.$refs["uploadButton"].disabled = false;
        });
    },
  },
};
</script>

<template>
  <form ref="uploadForm">
    <input type="file" name="file[]" multiple />
    <button class="disabled:bg-gray-500" ref="uploadButton" @click="upload">
      Upload
    </button>
    <br/>
    <progress :value="uploadProgress" max="100"/>
  </form>
</template>
