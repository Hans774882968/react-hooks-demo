module.exports = {
  types: [
    { value: 'feat', name: 'feat:     一个新特性（A new feature）' },
    { value: 'fix', name: 'fix:      修复一个bug（A bug fix）' },
    { value: 'docs', name: 'docs:     变更的只有文档（Documentation only changes）' },
    {
      value: 'style',
      name:
        'style:    不改变代码含义的代码样式变化 Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name:
        'refactor: 代码重构，注意和特性、bug修复区分开来 A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     提升性能（A code change that improves performance）',
    },
    { value: 'test', name: 'test:     添加测试（Adding missing tests）' },
    {
      value: 'chore',
      name:
        'chore:    构建、脚手架工具等开发工具变动（Changes to the build process or auxiliary tools\n            and libraries such as documentation generation）',
    },
    { value: 'revert', name: 'revert:   代码回滚（Revert to a commit）' },
    { value: 'WIP', name: 'WIP:      工作进行中（Work in progress）' },
  ],

  scopes: [{ name: 'Outbound' }, { name: 'Inbound' }, { name: 'Basic' }, { name: 'e2eTest' }, { name: 'unitTest' }],

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  scopeOverrides: {
    fix: [{ name: 'bug' }, { name: 'merge' }, { name: 'style' }],
  },
  // override the messages, defaults are as follows
  messages: {
    type: 'Select the type of change that you are committing:',
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body:
      'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body', 'footer'],
  appendBranchNameToCommitMessage: true,

  // limit subject length
  subjectLimit: 100,
  subjectSeparator: ': ',
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
};
