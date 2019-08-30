// The initial state
export default {
  // The loaded files
  content: {
    video: [],
    audio: []
  },
  // Files loaded limit
  isAuthenticated: false,
  autoplay: true,
  // Settings
  settings: {},
  theme: 'dark',
  user: {},
  editMode: false,
  appDrawer: {
    action: true,
    des: true,
    mobileState: false
  },
  // The currently selected items
  selectedItems: [],
  // The currently selected items
  uploadItems: [],
  // View
  view: 'grid',
  // The currently selected items
  uploadItemsMenu: [],
  // The currently selected items
  diskLoaded: [],
  // The currently selected dir
  selectedDirectory: 'my-drive',
  // The state of confirm delete model
  modal: {
    state: false,
    type: null
  },
  // The state of  settings
  showSettings: false,
  // The state of file menu
  showMenu: {
    state: false,
    x: 0,
    y: 0
  },
  // The state of the infobar
  showInfoBar: false,
  // The snackbar
  showsnackbar: {
    state: false,
    data: '',
    color: 'default',
    time: 6000
  },
  // The loading state
  isLoading: false,
  // The loading state
  isUploading: false,
  // Is mobile
  isMobile: false,
  // Token
  token: '',
  // Select all files
  selectAllFile: false,
  // Select all files
  selectAll: false,
  // Select all folders
  selectAllFolder: false,
  // The Search Query
  search: ''
};
