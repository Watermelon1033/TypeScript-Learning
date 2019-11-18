# TypeScript-Learning

1. **安装 TypeScript**
    + 安装 ts: `npm install -g typescript`

1. **WebStorm 中 编译 TypeScript 为 JavaScript**
    - 在 ts 文件所在的文件夹中打开 cmd/git bash 运行: tsc xxx.ts 就可以编译了。  
      (或者: 直接在 WebStorm 中打开 terminal, 把文件拖拽到 terminal 中, 会自动
      识别路径.)
    - WebStorm 中不能直接运行 ts 文件，需要先 'tsc xx.ts' 这样编译之后，生成
      xx.js (在 WebStorm当前文件右键: Open in Terminal 就可以在 WebStorm 中快速
      打开当前所在的文件夹了，最方便快速)
    - VSCode 可以直接运行 xx.ts 文件，不需要编译。

