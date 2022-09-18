import { defineStore } from 'pinia';

export interface IHistoryPage {
  id: string;
  to: string;
  name: string;
  isActive: boolean;
}

interface ILayoutState {
  isCollapse: boolean;
  historyPages: IHistoryPage[];
}

export const useLayout = defineStore('layout', {
  state: (): ILayoutState => {
    return {
      isCollapse: true,
      historyPages: [],
    };
  },
  getters: {
    getIsOpen(state) {
      return state.isCollapse;
    },

    getHistoryPage(state) {
      return state.historyPages;
    },
  },
  actions: {
    changeIsOpen(payload: boolean) {
      this.isCollapse = payload;
    },

    addHistory(payload: IHistoryPage): void {
      this.historyPages.forEach((item, index) => {
        item.isActive = false;
      });
      this.historyPages.push(payload);
    },
    removeHistoryItem(payload: string): void {
      this.historyPages.forEach((item, index) => {
        if (item.id === payload) {
          // 删除指定历史页面
          this.historyPages.splice(index, 1);
        }
      });
    },
    hasHistoryPage(payload: string): boolean {
      let isHas = false;
      this.historyPages.forEach((item, index) => {
        if (item.id === payload) {
          isHas = true;
        }
      });

      return isHas;
    },
  },
});
