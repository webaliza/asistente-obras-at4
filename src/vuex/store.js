import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import {
    SET_USER_NAME,
    SET_USER_ID,
    SET_USER_PASS,
    SET_PROJECTS,
    SET_CURRENT_PROJECT_CODE,
    SET_CURRENT_CHAPTER_COODE,
    SET_CURRENT_ENTRY_CODE,
    SET_DATE_OF_WORK,
    SET_WORKERS_LIST,
    SET_WORKERS_LIST_BIG,
    SET_HOURS_TYPE,
    SET_HOURS,
    SET_COMMENTS,
    SET_HISTORY,
    SET_CAUSES_LIST,
} from './mutations';

Vue.use(Vuex)

const state = {
    usuario: null,
    codigo_usuario: null,
    contrasenya: null,
    obras: null,
    current_project_code: null,
    current_chapter_code: null,
    current_entry_code: null,
    date_of_work: null,
    workers_list: null,
    workers_list_big: null,
    hours_type: 'H',
    hours: 8,
    comments: '',
    history: null,
    causes_list: null,
}

const mutations = {
    [SET_USER_NAME](state, userName) {
        state.usuario = userName;
    },
    [SET_USER_ID](state, userID) {
        state.codigo_usuario = userID;
    },
    [SET_USER_PASS](state, userPass) {
        state.contrasenya = userPass;
    },
    [SET_PROJECTS](state, object) {
        state.obras = object;
    },
    [SET_CURRENT_PROJECT_CODE](state, projectCode) {
        state.current_project_code = projectCode;
    },
    [SET_CURRENT_CHAPTER_COODE](state, chapterCode) {
        state.current_chapter_code = chapterCode;
    },
    [SET_CURRENT_ENTRY_CODE](state, entryCode) {
        state.current_entry_code = entryCode;
    },
    [SET_DATE_OF_WORK](state, date) {
        state.date_of_work = date;
    },
    [SET_WORKERS_LIST](state, workers_list) {
        state.workers_list = workers_list;
    },
    [SET_WORKERS_LIST_BIG](state, workers_list_big) {
        state.workers_list_big = workers_list_big;
    },
    [SET_HOURS_TYPE](state, hours_type) {
        state.hours_type = hours_type;
    },
    [SET_HOURS](state, hours) {
        state.hours = hours;
    },
    [SET_COMMENTS](state, comments) {
        state.comments = comments;
    },
    [SET_HISTORY](state, history) {
        state.history = history;
    },
    [SET_CAUSES_LIST](state, causes_list) {
        state.causes_list = causes_list;
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});
