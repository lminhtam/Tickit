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

function wp (percentage) {
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
      dimen.height === 896 || dimen.width === 896 ||
      dimen.height === 828 || dimen.width === 828)
  );
}

export const ifIphoneX = () => {
  if (isIphoneX()) {
    return true;
  }
  return false;
};
