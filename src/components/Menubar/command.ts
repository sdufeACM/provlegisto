const cmd = [
  {
    name: "File",
    type: "submenu",
    children: [
      {
        name: "New",
        type: "menuItem",
        command: "fileNew",
      },
      {
        name: "Open",
        type: "menuItem",
        command: "fileOpen",
      },
      {
        name: "Save",
        type: "menuItem",
        command: "fileSave",
      },
      {
        name: "SaveAs",
        type: "menuItem",
        command: "fileSaveAs",
      },
      {
        name: "Preference",
        type: "menuItem",
        command: "preference",
      },
    ],
  },
  {
    name: "Edit",
    type: "menu",
    children: [
      {
        name: "Language",
        type: "menuItem",
        command: "changeLanguage",
      },
    ],
  },
  {
    name: "Run",
    type: "menu",
    children: [
      {
        name: "Compile",
        type: "menuItem",
        command: "compile",
      },
      {
        name: "Run",
        type: "menuItem",
        command: "run",
      },
      {
        name: "Run detached",
        type: "menuItem",
        command: "runDetached",
      },
    ],
  },
]

export default cmd