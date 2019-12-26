import {Dimensions, Platform} from 'react-native';

/*
 * Constants - Screen size
 */
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const IS_IPHONE_X_OR_ABOVE =
  SCREEN_HEIGHT >= 812 && Platform.OS === 'ios';
export const STATUS_BAR_HEIGHT = IS_IPHONE_X_OR_ABOVE ? 44 : 20;
export const NAVIGATION_BAR_HEIGHT = 44;
export const HEADER_HEIGHT = NAVIGATION_BAR_HEIGHT + STATUS_BAR_HEIGHT;
export const SIZE_MARGIN = 16;
export const DESIGN_WIDTH = 375;
export const DESIGN_HEIGHT = 667;
export const ratioW = SCREEN_WIDTH / DESIGN_WIDTH;
export const ratioH = SCREEN_HEIGHT / DESIGN_HEIGHT;
export const {width: viewportWidth, height: viewportHeight} = Dimensions.get(
  'window',
);

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export const isIOSDevices = () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  return false;
};

export function isIphoneX() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    (dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 828 ||
      dimen.width === 828)
  );
}

export const ifIphoneX = () => {
  if (isIphoneX()) {
    return true;
  }
  return false;
};

export const checkCategory = (value, filter) => {
  if (filter === 'Tất cả') {
    return true;
  } else if (filter === 'Giải trí') {
    return (
      value.category === 'Văn hóa nghệ thuật' ||
      value.category === 'Nhạc sống' ||
      value.category === 'Vui chơi giải trí'
    );
  } else if (filter === 'Khóa học') {
    return (
      value.category === 'Hội họp' ||
      value.category === 'Hội thảo' ||
      value.category === 'Khóa học'
    );
  } else
    return (
      value.category === 'Thể thao' ||
      value.category === 'Nightlife' ||
      value.category === 'Hội chợ'
    );
};

export function formatCurrency(n, separate = '.') {
  var s = n.toString();
  var regex = /\B(?=(\d{3})+(?!\d))/g;
  var ret = s.replace(regex, separate);
  ret += ' VND';
  return ret;
}

export function generateUID() {
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}
