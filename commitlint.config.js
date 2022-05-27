/**
- feat:: 类型为 feat 的提交表示在代码库中新增了一个功能（这和语义化版本中的 MINOR 相对应）。
- fix:: 类型为 fix 的 提交表示在代码库中修复了一个 bug （这和语义化版本中的 PATCH 相对应）。
- docs:: 只是更改文档。
- style:: 不影响代码含义的变化（空白、格式化、缺少分号等）。
- refactor:: 代码重构，既不修复错误也不添加功能。
- perf:: 改进性能的代码更改。
- test:: 添加确实测试或更正现有的测试。
- build:: 影响构建系统或外部依赖关系的更改（示例范围：gulp、broccoli、NPM）。
- ci:: 更改持续集成文件和脚本（示例范围：Travis、Circle、BrowserStack、SauceLabs）。
- chore:: 其他不修改 src 或 test 文件。
- revert:: commit 回退。
 */

 module.exports = {
  extends: [
      '@commitlint/config-conventional'
  ],
  rules: {
      'type-enum': [
          2,           // 表示必须输入的
          'always', [
              'docs', 
              'feat', 
              'update', 
              'fix', 
              'refactor', 
              'optimize', 
              'style', 
              'docs', 
              'chore'
           ]
      ],
      'type-case': [0],
      'type-empty': [0],
      'scope-empty': [0],
      'scope-case': [0],
      'subject-full-stop': [0, 'never'],
      'subject-case': [0, 'never'],
      'header-max-length': [0, 'always', 72],
  }
};