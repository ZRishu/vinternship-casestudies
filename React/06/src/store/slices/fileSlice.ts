import { starterFiles } from '../demoData'
import type { DesignHubSlice, FileSlice } from '../types'

export const createFileSlice: DesignHubSlice<FileSlice> = (set) => ({
  files: starterFiles,
  activeFileId: starterFiles[0]?.id ?? null,
  addFile: (file) =>
    set(
      (state) => ({
        files: [file, ...state.files],
        activeFileId: state.activeFileId ?? file.id,
      }),
      false,
      'files/addFile',
    ),
  updateFileContent: (id, content) =>
    set(
      (state) => ({
        files: state.files.map((file) =>
          file.id === id
            ? {
                ...file,
                content,
                updatedAt: new Date().toISOString(),
              }
            : file,
        ),
      }),
      false,
      'files/updateFileContent',
    ),
  selectFile: (id) => set({ activeFileId: id }, false, 'files/selectFile'),
})
