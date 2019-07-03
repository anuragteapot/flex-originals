/**
 * Get the mobile or not ?
 * @param state
 * @returns {*}
 */
export const isMobile = state => {
  return state.isMobile;
};

/**
 * Get the is loading.
 * @param state
 * @returns {*}
 */
export const isLoading = state => {
  return state.isLoading;
};

/**
 * Get the is loading.
 * @param state
 * @returns {*}
 */
export const sideNav = state => {
  return state.sideNav;
};

/**
 * Get the sudirectories of the currently selected directory
 * @param state
 * @param getters
 * @returns {Array|directories|{/}|computed.directories|*|Object}
 */
// export const getSelectedDirectoryDirectories = (state) => {
//     return state.directories.filter(
//         directory => (directory.directory === state.selectedDirectory)
//     );
// }

/**
 * Get the files of the currently selected directory
 * @param state
 * @param getters
 * @returns {Array|files|{}|FileList|*}
 */
// export const getSelectedDirectoryFiles = (state) => {
// console.log(state)
// state.contents.files.forEach(function(element) {
//     console.log(element);
// });
// }

/**
 * Whether or not all items of the current directory are selected
 * @param state
 * @param getters
 * @returns Array
 */
// export const getSelectedDirectoryContents = (state, getters) => {

// return [
//     ...getters.getSelectedDirectoryDirectories,
//     ...getters.getSelectedDirectoryFiles,
// ];
// }
