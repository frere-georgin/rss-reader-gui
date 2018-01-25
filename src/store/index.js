/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';

import boardsProvider from '../api/boardsProvider.js';
import configProvider from '../api/configProvider.js';

Vue.use(Vuex);

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

var emptyBoard = {
  title: '',
  feeds: new Array,
  isActive: true
};

export default new Vuex.Store({
    state: {
      boards: [],
      config: {},
      newBoard: {
        title: '',
        feeds: [],
        isActive: true
      },
      newFeed: {
          title: '',
          url: '',
          type: '',
          board: '',
          refreshRate: '20',
          filter: null,
          isImage: false,
          articles: null
      }
    },
    mutations: {

        // BOARDS MUTATIONS

        GET_BOARDS(state, boards) {
          console.log("get_boards");
          state.boards = boards;
        },
        SET_BOARDS(state, boards) {
          console.log("set_boards");
          state.boards = boards;
          boardsProvider.postBoards(boards, function(data){});
        },
        GET_BOARD(state, board) {
          console.log("get_board");
          state.newBoard = board;
        },
        CLEAR_BOARD(state) {
          console.log("clear_board");
          state.newBoard = clone(emptyBoard);
        },
        ADD_BOARD(state, newBoard) {
          console.log("add_board");
          state.boards.push(newBoard);
          boardsProvider.postBoards(state.boards, function(data){});
          state.config.activeBoard = newBoard.title;
          configProvider.postConfig(state.config, function(data){});
        },
        EDIT_BOARD(state, newBoard) {
          console.log("edit_board");
            let boards = state.boards;
            boards.map(function(board, i) {
              if(newBoard.title == board.title) {
                boards[i] = newBoard;
                state.boards = boards;
                boardsProvider.postBoards(state.boards, function(data){});
              }
            });
        },
        REMOVE_BOARD(state, newBoard) {
            console.log("remove_board");
            let boards = state.boards;
            state.boards.map(function(board, i) {
              if (i == state.boards.indexOf(newBoard) - 1) {
                state.config.activeBoard = board.title;
              }
            });
            state.boards.splice(state.boards.indexOf(newBoard), 1);
            configProvider.postConfig(state.config, function(data){});
            boardsProvider.postBoards(state.boards, function(data){});
        },

        // FEED MUTATIONS

        GET_FEEDS(state) {
          state.boards.map((board) => {
            if (state.activeBoard == board.title)
              state.feeds = board.feeds;
          });
        },
        SET_FEEDS(state, newFeeds) {
          state.boards.map((board) => {
            if (state.activeBoard == board.title) {
              board.feeds = newFeeds;
              boardsProvider.postBoards(state.boards, function(data){});
            }
          });
        },
        CLEAR_FEED(state) {
          state.newFeed = {
            title: '',
            url: '',
            type: '',
            board: '',
            refreshRate: '20',
            filter: null,
            isImage: false,
            articles: null
          };
        },
        ADD_FEED(state, newFeed) {
          console.log("add_feed");
          console.log(state.config.activeBoard, newFeed);
          state.boards.map((board) => {
            if (state.config.activeBoard == board.title) {
              board.feeds.push(newFeed);
              boardsProvider.postBoards(state.boards, function(data){});
            }
          });
        },
        REMOVE_FEED(state, newFeed) {
          state.boards.map((board) => {
            if (state.config.activeBoard == board.title) {
              board.feeds.map(function(feed, index) {
                if (feed.title == newFeed.title) {
                  board.feeds.splice(index, 1);
                  boardsProvider.postBoards(state.boards, function(data){});
                }
              });
            }
          });
        },
        EDIT_FEED(state, newFeed) {
          state.boards.map((board) => {
            if (state.config.activeBoard == board.title) {
              board.feeds.map(function(feed, index) {
                if (feed.uid == newFeed.uid) {
                  console.log("feed uid", feed.uid, "newfeed uid", newFeed.uid);
                  newFeed.uid = Date.now();
                  let newFeeds = clone(board.feeds);
                  newFeeds[index] = clone(newFeed);
                  board.feeds = newFeeds;
                  boardsProvider.postBoards(state.boards, function(data){});
                }
              });
            }
          });
        },

        // CONFIG MUTATIONS

        GET_CONFIG(state, config) {
          console.log("get_config");
          state.config = config;
        },

        SET_CONFIG(state, config) {
          console.log("set_config");
          state.config = config;
          configProvider.postConfig(config, function(data){});
        },
    },
    actions: {

        // BOARD ACTIONS

        getBoards({commit}, boards) {
          return new Promise((resolve, reject) => {
            fetch("http://localhost:5001/boards").then(function(response) {
              return response.json();
            }).then(function(boards) {
              commit('GET_BOARDS', boards);
              resolve(boards);
            }).catch(function(err) {
              reject(err);
            });
          });
        },
        setBoards({commit}, boards) {
          commit('SET_BOARDS', boards);
        },
        getBoard({commit}) {
          commit('GET_BOARD');
        },
        clearBoard({commit}) {
          commit('CLEAR_BOARD');
        },
        addBoard({commit}, board) {
          commit('ADD_BOARD', board);
        },
        editBoard({commit}, board) {
          commit('EDIT_BOARD', board);
        },
        removeBoard({commit}, board) {
          commit('REMOVE_BOARD', board);
        },

        // FEED ACTIONS

        setFeeds({commit}, feeds) {
          commit('SET_FEEDS', feeds);
        },
        getFeeds({commit}) {
          commit('GET_FEEDS');
        },
        clearFeed({commit}) {
          commit('CLEAR_FEED');
        },
        addFeed({commit}, feed) {
          commit('ADD_FEED', feed);
        },
        editFeed({commit}, feed) {
          commit('EDIT_FEED', feed);
        },
        removeFeed({commit}, feed) {
          commit('REMOVE_FEED', feed);
        },

        // CONFIG ACTIONS

        getConfig({commit}, config) {
          return new Promise((resolve, reject) => {
            fetch("http://localhost:5001/config").then(function(response) {
              return response.json();
            }).then(function(config) {
              commit('GET_CONFIG', config);
              resolve(config);
            }).catch(function(err) {
              reject(err);
            });
          });
        },
        setConfig({commit}, config) {
          commit('SET_CONFIG', config);
        }
    },
    getters: {
        newFeed: state => state.newFeed,
        newBoard: state => state.newBoard,
        boards: state => state.boards,
        config: state => state.config,
        activeBoard: state => state.boards.filter((board) => { if(state.config.activeBoard == board.title) return board })[0],
        boardNames: state => state.boards.map(function(board) { return board.title }),
        feedNames: state => state.boards.filter(function(board) { if(state.config.activeBoard == board.title) return board })[0].feeds.map(function(feed) { return feed.title })
    }

});
