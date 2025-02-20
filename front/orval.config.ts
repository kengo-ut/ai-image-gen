const fs = require("fs");
const path = require("path");

module.exports = {
  backend: {
    output: {
      mode: "tags-split",
      target: "src/gen/backend.ts",
      schemas: "src/gen/schema",
      clean: true,
    },
    hooks: {
      // orval の生成後に実行されるフック
      afterAllFilesWrite: () => {
        const defaultTsPath = path.resolve(__dirname, "src/gen/default/default.ts");

        if (fs.existsSync(defaultTsPath)) {
          fs.appendFileSync(
            defaultTsPath,
            `axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;\n`
          );
          console.log("✅ axios.defaults.baseURL を default.ts に追加しました！");
        }
      },
    },
    input: {
      target: "../back/openapi.json",
    },
  },
};
