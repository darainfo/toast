(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Toast: () => (/* binding */ Toast)
/* harmony export */ });
let toastIdx = 0;
const defaultToastItem = {
  title: '' // 제목
  ,
  text: '' // 내용
  ,
  enableCloseButton: true // 닫기 버튼 활성화여부
  ,
  style: 'success' //  백그라운드 색깔.  | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger'
  ,
  textColor: '#000000' // 글자 색
  ,
  enableProgress: true //  프로그래스 바 사용여부.
};

let defaultOptions = {
  duration: 3 // 유지 시간  초
  ,
  width: '' // toast width
  ,
  position: {
    // toast 위치
    vertical: 'top' // top, middle, bottom
    ,
    horizontal: 'right' // left, center, right
  },

  enableCloseButton: true //  닫기 버튼 활성화 여부
  ,
  style: 'success' //  백그라운드 색깔.  | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'danger';
  ,
  textColor: '#000000' // 글자 색
  ,
  enableProgress: true //  프로그래스 바 사용여부.
  ,
  items: '',
  keepInstance: false // show 가 끝나도 toast 객체를 유지. toast 객체 하나 생성해서 계속 사용할 경우 사용  
};

function toastHiddenElement() {
  if (document.getElementById('daraToastHidden') == null) {
    document.querySelector('body')?.insertAdjacentHTML('beforeend', `<div id="daraToastHidden" class="dara-toast-hidden"></div>`);
  }
  return document.getElementById('daraToastHidden');
}

/**
 * Toast message 모듈
 */
class Toast {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
    toastIdx += 1;
    this.viewItemCount = 0;
    const position = this.options.position;
    const toastWrapperElement = document.createElement("div");
    toastWrapperElement.className = `dara-toast-wrapper ${position.vertical} ${position.horizontal} dt-${toastIdx}`;
    toastWrapperElement.style = `width:${this.options.width};`;
    toastHiddenElement().appendChild(toastWrapperElement);
    this.toastWrapperElement = toastWrapperElement;
    this.show(this.options.items);
  }
  /**
   * add toast item
   * @param {*} item 
   */
  addItem(item) {
    const enableHeader = item.title ? true : false;
    const toast = document.createElement("div");
    toast.className = `dara-toast ${this.options.style} ${enableHeader ? `header-mode` : ''}`;
    this.viewItemCount += 1;
    let toastHtml = `
            ${enableHeader ? `<div class="toast-header" style="color:${item.textColor};" >${item.title}</div>` : ''}
            <div class="toast-body">
                <div class="toast-content" style="color:${item.textColor};" >${item.text}</div>
            </div>
            ${item.enableCloseButton ? '<span class="toast-close">×</span>' : ''}
            ${item.enableProgress ? `<div class="progress-bar" style="animation: progressAnimation ${item.duration}s;"></div>` : ''}
        `;
    toast.innerHTML = toastHtml;
    if (this.options.position.vertical === 'top') {
      this.toastWrapperElement.insertAdjacentElement('afterbegin', toast); //prepend toast element 
    } else {
      this.toastWrapperElement.appendChild(toast); // Append the toast element
    }

    toast.timer = setTimeout(() => this.hide(toast), item.duration * 1000);
    toast.querySelector('.toast-close').addEventListener('click', () => {
      if (toast.timer) clearTimeout(toast.timer);
      this.hide(toast);
    });
  }

  /**
   * show toast message
   * @param {*} viewItems 
   * @returns 
   */
  show = viewItems => {
    if (typeof viewItems === 'undefined') {
      return;
    }
    let items = [];
    if (typeof viewItems === 'string') {
      items.push(viewItems);
    } else if (Array.isArray(viewItems)) {
      items = viewItems;
    } else {
      items.push(viewItems);
    }
    const enableCloseButton = this.options.enableCloseButton;
    const enableProgress = this.options.enableProgress;
    const duration = this.options.duration;
    const textColor = this.options.textColor;
    items.forEach(item => {
      let viewItem;
      if (typeof item === 'string') {
        viewItem = {
          text: item
        };
      } else {
        viewItem = item;
      }
      viewItem.enableCloseButton = typeof viewItem.enableCloseButton === 'undefined' ? enableCloseButton : viewItem.enableCloseButton;
      viewItem.enableProgress = typeof viewItem.enableProgress === 'undefined' ? enableProgress : viewItem.enableProgress;
      viewItem.duration = typeof viewItem.duration === 'undefined' ? duration : viewItem.duration;
      viewItem.textColor = typeof viewItem.textColor === 'undefined' ? textColor : viewItem.textColor;
      this.addItem(Object.assign({}, defaultToastItem, viewItem));
    });
    return this;
  };

  /**
   * toast hide
   * @param {*} toast 
   */
  hide(toast) {
    this.viewItemCount -= 1;
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
    if (this.options.keepInstance === false && this.viewItemCount < 1) {
      this.destroy();
    }
  }

  /**
   * toast destroy
   */
  destroy = () => {
    this.toastWrapperElement.remove();
  };
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dara.toast.js.map