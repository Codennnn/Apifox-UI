import { type GlobalToken, theme } from 'antd'

import type { ThemeMode, ThemeSetting } from './ThemeEditor.type'

const globalToken = theme.getDesignToken()

export const defaultThemeSetting: ThemeSetting = {
  themeMode: 'lightDefault',
  colorPrimary: globalToken.colorPrimary,
  borderRadius: globalToken.borderRadius,
  spaceType: 'default',
}

const defaultThemeToken: Partial<GlobalToken> = {
  colorPrimary: defaultThemeSetting.colorPrimary,
  borderRadius: defaultThemeSetting.borderRadius,
}

const previewDefault = (
  <svg version="1.1" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <polygon id="path-1" points="0 0 120 0 120 80 0 80" />
      <path
        d="M25.1277704,20 L134.87223,20 C136.655267,20 137.30184,20.1856512 137.953691,20.5342654 C138.605543,20.8828796 139.11712,21.3944567 139.465735,22.0463086 C139.814349,22.6981604 140,23.3447329 140,25.1277704 L140,94.8722296 C140,96.6552671 139.814349,97.3018396 139.465735,97.9536914 C139.11712,98.6055433 138.605543,99.1171204 137.953691,99.4657346 C137.30184,99.8143488 136.655267,100 134.87223,100 L25.1277704,100 C23.3447329,100 22.6981604,99.8143488 22.0463086,99.4657346 C21.3944567,99.1171204 20.8828796,98.6055433 20.5342654,97.9536914 C20.1856512,97.3018396 20,96.6552671 20,94.8722296 L20,25.1277704 C20,23.3447329 20.1856512,22.6981604 20.5342654,22.0463086 C20.8828796,21.3944567 21.3944567,20.8828796 22.0463086,20.5342654 C22.6981604,20.1856512 23.3447329,20 25.1277704,20 Z"
        id="path-3"
      />
      <filter
        filterUnits="objectBoundingBox"
        height="122.5%"
        id="filter-4"
        width="115.0%"
        x="-7.5%"
        y="-10.0%"
      >
        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
        <feColorMatrix
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.02 0"
        />
        <feMorphology in="SourceAlpha" operator="erode" radius="0.5" result="shadowSpreadOuter2" />
        <feOffset dx="0" dy="1" in="shadowSpreadOuter2" result="shadowOffsetOuter2" />
        <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="3" />
        <feColorMatrix
          in="shadowBlurOuter2"
          result="shadowMatrixOuter2"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.02 0"
        />
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter3" />
        <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="1" />
        <feColorMatrix
          in="shadowBlurOuter3"
          result="shadowMatrixOuter3"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.03 0"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="shadowMatrixOuter2" />
          <feMergeNode in="shadowMatrixOuter3" />
        </feMerge>
      </filter>
      <path
        d="M61.1277704,40 L170.87223,40 C172.655267,40 173.30184,40.1856512 173.953691,40.5342654 C174.605543,40.8828796 175.11712,41.3944567 175.465735,42.0463086 C175.814349,42.6981604 176,43.3447329 176,45.1277704 L176,114.87223 C176,116.655267 175.814349,117.30184 175.465735,117.953691 C175.11712,118.605543 174.605543,119.11712 173.953691,119.465735 C173.30184,119.814349 172.655267,120 170.87223,120 L61.1277704,120 C59.3447329,120 58.6981604,119.814349 58.0463086,119.465735 C57.3944567,119.11712 56.8828796,118.605543 56.5342654,117.953691 C56.1856512,117.30184 56,116.655267 56,114.87223 L56,45.1277704 C56,43.3447329 56.1856512,42.6981604 56.5342654,42.0463086 C56.8828796,41.3944567 57.3944567,40.8828796 58.0463086,40.5342654 C58.6981604,40.1856512 59.3447329,40 61.1277704,40 Z"
        id="path-5"
      />
      <filter
        filterUnits="objectBoundingBox"
        height="112.5%"
        id="filter-6"
        width="108.3%"
        x="-4.2%"
        y="-5.0%"
      >
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.5" />
        <feColorMatrix
          in="shadowBlurOuter1"
          type="matrix"
          values="0 0 0 0 0.0898254103   0 0 0 0 0.115558755   0 0 0 0 0.227270154  0 0 0 0.210473121 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd" id="正式版" stroke="none" strokeWidth="1">
      <g id="Ant-Design-5.0-官网-PC" transform="translate(-578.000000, -1542.000000)">
        <g id="编组-28" transform="translate(506.000000, 1542.000000)">
          <g id="矩形-+-矩形备份蒙版" transform="translate(72.000000, 0.000000)">
            <mask fill="white" id="mask-2">
              <use xlinkHref="#path-1" />
            </mask>
            <use fill="#EDF1F7" id="蒙版" xlinkHref="#path-1" />
            <g id="矩形" mask="url(#mask-2)">
              <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-3" />
              <use fill="#F1F5FA" fillRule="evenodd" xlinkHref="#path-3" />
            </g>
            <g id="矩形备份" mask="url(#mask-2)">
              <use fill="black" fillOpacity="1" filter="url(#filter-6)" xlinkHref="#path-5" />
              <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-5" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const previewDark = (
  <svg version="1.1" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <polygon id="path-1" points="0 0 120 0 120 80 0 80" />
      <path
        d="M22.5638852,20 L137.436115,20 C138.327634,20 138.65092,20.0928256 138.976846,20.2671327 C139.302772,20.4414398 139.55856,20.6972284 139.732867,21.0231543 C139.907174,21.3490802 140,21.6723665 140,22.5638852 L140,97.4361148 C140,98.3276335 139.907174,98.6509198 139.732867,98.9768457 C139.55856,99.3027716 139.302772,99.5585602 138.976846,99.7328673 C138.65092,99.9071744 138.327634,100 137.436115,100 L22.5638852,100 C21.6723665,100 21.3490802,99.9071744 21.0231543,99.7328673 C20.6972284,99.5585602 20.4414398,99.3027716 20.2671327,98.9768457 C20.0928256,98.6509198 20,98.3276335 20,97.4361148 L20,22.5638852 C20,21.6723665 20.0928256,21.3490802 20.2671327,21.0231543 C20.4414398,20.6972284 20.6972284,20.4414398 21.0231543,20.2671327 C21.3490802,20.0928256 21.6723665,20 22.5638852,20 Z"
        id="path-3"
      />
      <filter
        filterUnits="objectBoundingBox"
        height="140.0%"
        id="filter-4"
        width="126.7%"
        x="-13.3%"
        y="-17.5%"
      >
        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="5" />
        <feColorMatrix
          in="shadowBlurOuter1"
          type="matrix"
          values="0 0 0 0 0.0898254103   0 0 0 0 0.115558755   0 0 0 0 0.227270154  0 0 0 0.210473121 0"
        />
      </filter>
      <path
        d="M58.5638852,40 L173.436115,40 C174.327634,40 174.65092,40.0928256 174.976846,40.2671327 C175.302772,40.4414398 175.55856,40.6972284 175.732867,41.0231543 C175.907174,41.3490802 176,41.6723665 176,42.5638852 L176,117.436115 C176,118.327634 175.907174,118.65092 175.732867,118.976846 C175.55856,119.302772 175.302772,119.55856 174.976846,119.732867 C174.65092,119.907174 174.327634,120 173.436115,120 L58.5638852,120 C57.6723665,120 57.3490802,119.907174 57.0231543,119.732867 C56.6972284,119.55856 56.4414398,119.302772 56.2671327,118.976846 C56.0928256,118.65092 56,118.327634 56,117.436115 L56,42.5638852 C56,41.6723665 56.0928256,41.3490802 56.2671327,41.0231543 C56.4414398,40.6972284 56.6972284,40.4414398 57.0231543,40.2671327 C57.3490802,40.0928256 57.6723665,40 58.5638852,40 Z"
        id="path-5"
      />
      <filter
        filterUnits="objectBoundingBox"
        height="112.5%"
        id="filter-6"
        width="108.3%"
        x="-4.2%"
        y="-5.0%"
      >
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.5" />
        <feColorMatrix
          in="shadowBlurOuter1"
          type="matrix"
          values="0 0 0 0 0.0898254103   0 0 0 0 0.115558755   0 0 0 0 0.227270154  0 0 0 0.210473121 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd" id="正式版" stroke="none" strokeWidth="1">
      <g id="Ant-Design-5.0-官网-PC" transform="translate(-726.000000, -1542.000000)">
        <g id="编组-28" transform="translate(506.000000, 1542.000000)">
          <g id="矩形-+-矩形备份蒙版备份" transform="translate(220.000000, 0.000000)">
            <mask fill="white" id="mask-2">
              <use xlinkHref="#path-1" />
            </mask>
            <use fill="#4F5155" id="蒙版" xlinkHref="#path-1" />
            <g id="矩形" mask="url(#mask-2)">
              <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-3" />
              <use fill="#292929" fillRule="evenodd" xlinkHref="#path-3" />
            </g>
            <g id="矩形备份" mask="url(#mask-2)">
              <use fill="black" fillOpacity="1" filter="url(#filter-6)" xlinkHref="#path-5" />
              <use fill="#4F5155" fillRule="evenodd" xlinkHref="#path-5" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const previewGreen = (
  <svg version="1.1" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <polygon id="path-1" points="0 0 120 0 120 80 0 80" />
      <path
        d="M25.1277704,20 L134.87223,20 C136.655267,20 137.30184,20.1856512 137.953691,20.5342654 C138.605543,20.8828796 139.11712,21.3944567 139.465735,22.0463086 C139.814349,22.6981604 140,23.3447329 140,25.1277704 L140,94.8722296 C140,96.6552671 139.814349,97.3018396 139.465735,97.9536914 C139.11712,98.6055433 138.605543,99.1171204 137.953691,99.4657346 C137.30184,99.8143488 136.655267,100 134.87223,100 L25.1277704,100 C23.3447329,100 22.6981604,99.8143488 22.0463086,99.4657346 C21.3944567,99.1171204 20.8828796,98.6055433 20.5342654,97.9536914 C20.1856512,97.3018396 20,96.6552671 20,94.8722296 L20,25.1277704 C20,23.3447329 20.1856512,22.6981604 20.5342654,22.0463086 C20.8828796,21.3944567 21.3944567,20.8828796 22.0463086,20.5342654 C22.6981604,20.1856512 23.3447329,20 25.1277704,20 Z"
        id="path-3"
      />
      <filter
        filterUnits="objectBoundingBox"
        height="122.5%"
        id="filter-4"
        width="115.0%"
        x="-7.5%"
        y="-10.0%"
      >
        <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2" />
        <feColorMatrix
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.02 0"
        />
        <feMorphology in="SourceAlpha" operator="erode" radius="0.5" result="shadowSpreadOuter2" />
        <feOffset dx="0" dy="1" in="shadowSpreadOuter2" result="shadowOffsetOuter2" />
        <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="3" />
        <feColorMatrix
          in="shadowBlurOuter2"
          result="shadowMatrixOuter2"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.02 0"
        />
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter3" />
        <feGaussianBlur in="shadowOffsetOuter3" result="shadowBlurOuter3" stdDeviation="1" />
        <feColorMatrix
          in="shadowBlurOuter3"
          result="shadowMatrixOuter3"
          type="matrix"
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.03 0"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="shadowMatrixOuter2" />
          <feMergeNode in="shadowMatrixOuter3" />
        </feMerge>
      </filter>
      <path
        d="M61.1277704,40 L170.87223,40 C172.655267,40 173.30184,40.1856512 173.953691,40.5342654 C174.605543,40.8828796 175.11712,41.3944567 175.465735,42.0463086 C175.814349,42.6981604 176,43.3447329 176,45.1277704 L176,114.87223 C176,116.655267 175.814349,117.30184 175.465735,117.953691 C175.11712,118.605543 174.605543,119.11712 173.953691,119.465735 C173.30184,119.814349 172.655267,120 170.87223,120 L61.1277704,120 C59.3447329,120 58.6981604,119.814349 58.0463086,119.465735 C57.3944567,119.11712 56.8828796,118.605543 56.5342654,117.953691 C56.1856512,117.30184 56,116.655267 56,114.87223 L56,45.1277704 C56,43.3447329 56.1856512,42.6981604 56.5342654,42.0463086 C56.8828796,41.3944567 57.3944567,40.8828796 58.0463086,40.5342654 C58.6981604,40.1856512 59.3447329,40 61.1277704,40 Z"
        id="path-5"
      />
      <filter
        filterUnits="objectBoundingBox"
        height="112.5%"
        id="filter-6"
        width="108.3%"
        x="-4.2%"
        y="-5.0%"
      >
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1.5" />
        <feColorMatrix
          in="shadowBlurOuter1"
          type="matrix"
          values="0 0 0 0 0.0898254103   0 0 0 0 0.115558755   0 0 0 0 0.227270154  0 0 0 0.210473121 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd" id="正式版" stroke="none" strokeWidth="1">
      <g id="Ant-Design-5.0-官网-PC" transform="translate(-874.000000, -1542.000000)">
        <g id="编组-28" transform="translate(506.000000, 1542.000000)">
          <g id="矩形-+-矩形备份蒙版备份-2" transform="translate(368.000000, 0.000000)">
            <mask fill="white" id="mask-2">
              <use xlinkHref="#path-1" />
            </mask>
            <use fill="#E1EDE5" id="蒙版" xlinkHref="#path-1" />
            <g id="矩形" mask="url(#mask-2)">
              <use fill="black" fillOpacity="1" filter="url(#filter-4)" xlinkHref="#path-3" />
              <use fill="#66C08D" fillRule="evenodd" xlinkHref="#path-3" />
            </g>
            <g id="矩形备份" mask="url(#mask-2)">
              <use fill="black" fillOpacity="1" filter="url(#filter-6)" xlinkHref="#path-5" />
              <use fill="#FFFFFF" fillRule="evenodd" xlinkHref="#path-5" />
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export const presetThemes = {
  lightDefault: {
    preview: previewDefault,
    name: '默认',
    token: defaultThemeToken,
  },
  darkDefault: {
    preview: previewDark,
    name: '暗黑',
    token: defaultThemeToken,
  },
  lark: {
    preview: previewGreen,
    name: '知识协作',
    token: {
      colorPrimary: '#00b96b',
      colorLink: '#00b96b',
    },
  },
} as const satisfies Record<
  ThemeMode,
  {
    preview: React.ReactElement
    name: string
    token: Partial<GlobalToken>
  }
>

export const presetRadius: ThemeSetting['borderRadius'][] = [2, 4, 6]

export const presetColors: ThemeSetting['colorPrimary'][] = [
  '#1677ff',
  '#9373ee',
  '#5f80e9',
  '#587df1',
  '#9a7d56',
  '#039e74',
  '#e86ca4',
  '#fd6874',
  '#8e8374',
]
