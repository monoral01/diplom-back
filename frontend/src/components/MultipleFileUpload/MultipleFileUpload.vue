<template>
  <a-upload
    v-model:file-list="fileList"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    class="biba"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      Upload
    </a-button>
  </a-upload>
</template>
<script lang="ts">
import { UploadOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import type { UploadProps } from "ant-design-vue";
import { UploadChangeParam } from "ant-design-vue/lib/upload";

export default defineComponent({
  components: {
    UploadOutlined,
  },
  name: "MultipleFileUpload",
  setup() {
    const fileList = ref<UploadProps["fileList"]>([
      {
        uid: "1",
        name: "xxx.png",
        status: "done",
        response: "Server Error 500", // custom error message to show
        url: "http://www.baidu.com/xxx.png",
      },
      {
        uid: "2",
        name: "yyy.png",
        status: "done",
        url: "http://www.baidu.com/yyy.png",
      },
      {
        uid: "3",
        name: "zzz.png",
        status: "error",
        response: "Server Error 500", // custom error message to show
        url: "http://www.baidu.com/zzz.png",
      },
    ]);

    const handleChange = ({ file, fileList }: UploadChangeParam) => {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    };
    return {
      fileList,
      handleChange,
    };
  },
});
</script>
<style lang="scss">
.biba {
  height: 100px;
}
</style>
