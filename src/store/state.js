// The initial state
export default {
  uploadPercent: 0,
  // The loaded files
  content: {
    video: [],
    audio: [],
  },
  contentUser: {
    user: {},
    settings: {},
  },
  // Files loaded limit
  isAuthenticated: false,
  autoplay: true,
  // Settings
  settings: {},
  theme: 'light',
  user: {},
  editMode: false,
  appDrawer: true,
  following: [],
  // The currently selected items
  selectedItems: [],
  // View
  view: 'grid',
  // The currently selected items
  uploadItemsMenu: [],
  // The state of confirm delete model
  modal: {
    state: false,
    type: null,
  },
  // The state of  settings
  showSettings: false,
  // The state of file menu
  showMenu: {
    state: false,
    x: 0,
    y: 0,
  },
  // The snackbar
  showsnackbar: {
    state: false,
    data: '',
    color: 'default',
    time: 6000,
  },
  // The loading state
  isLoading: false,
  // The loading state
  isUploading: false,
  // Is mobile
  isMobile: false,
  // Token
  token: '',
  // The Search Query
  search: '',
  player: {
    audio: {
      data: {},
      volume: 5,
      isPlaying: false,
    },
    video: {
      data: {},
      volume: 5,
      isPlaying: false,
    },
  },
};
